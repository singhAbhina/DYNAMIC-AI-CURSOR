import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Use your actual API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ System prompt to guide Gemini
const systemPrompt = `
You are an expert AI web developer. Generate a complete website based on user input.

1. Return the entire HTML, CSS (inside <style>), and JS (inside <script>) in one valid HTML file.
2. HTML should start with <!DOCTYPE html>.
3. No markdown, no explanation, only code.
4. Wrap CSS inside <style> in <head>, and JS inside <script> at the bottom of <body>.
`;

// ✅ Extract HTML/CSS/JS from full HTML content
function extractFromHTML(htmlString) {
  const cleanHtml = htmlString
    .replace(/<script[\s\S]*?<\/script>/g, "") // remove <script>
    .replace(/<style[\s\S]*?<\/style>/g, "") // remove <style>
    .trim();

  const cssMatch = (htmlString.match(/<style[^>]*>([\s\S]*?)<\/style>/) || [])[1] || "";
  const jsMatch = (htmlString.match(/<script[^>]*>([\s\S]*?)<\/script>/) || [])[1] || "";

  return {
    html: cleanHtml,
    css: cssMatch.trim(),
    js: jsMatch.trim(),
  };
}

// ✅ Generate website content using Gemini
async function runAgent(userPrompt) {
  const history = [
    {
      role: "user",
      parts: [{ text: userPrompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction: systemPrompt,
    },
  });

  let output = response.text?.trim() || "";

  // Fix escaped characters
  output = output.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

  // Add <html> wrapper if not returned properly
  if (!output.startsWith("<!DOCTYPE html>")) {
    output = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Generated Website</title>
        <style>body { font-family: sans-serif; padding: 2rem; }</style>
      </head>
      <body>
        ${output}
      </body>
      </html>
    `;
  }

  // ✅ Extract clean HTML, CSS, and JS separately
  return extractFromHTML(output);
}

// ✅ POST endpoint
app.post("/api/generate", async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const result = await runAgent(description);
    res.json(result);
  } catch (error) {
    console.error("❌ Gemini error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🟢 Backend running at http://localhost:${PORT}`);
});
