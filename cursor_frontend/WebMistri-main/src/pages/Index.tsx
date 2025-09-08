import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import WebsiteForm from "@/components/WebsiteForm";
import CodeDisplay from "@/components/CodeDisplay";
import WebsitePreview from "@/components/WebsitePreview";
import LoadingDisplay from "@/components/LoadingDisplay";
import HistoryModal from "@/components/HistoryModal";
import { Clock } from "lucide-react";
import { saveToHistory, WebsiteHistoryItem } from "@/utils/history-utils";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [websiteIdea, setWebsiteIdea] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [generatedCode, setGeneratedCode] = useState({
    html: "",
    css: "",
    js: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (idea: string) => {
    if (!idea.trim()) {
      toast({
        title: "Error",
        description: "Please describe your website idea first!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setWebsiteIdea(idea);

    try {
      // Connect to the backend API
      const response = await fetch("https://gemini-backend-5boq.onrender.com/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: idea }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate website");
      }

      const data = await response.json();

      // Assume the backend returns HTML, CSS, and JS code
      const newCode = {
        html: data.html || "",
        css: data.css || "",
        js: data.js || "",
      };
      
      setGeneratedCode(newCode);
      
      // Save to history in localStorage
      saveToHistory(idea, newCode.html, newCode.css, newCode.js);

      toast({
        title: "Success!",
        description: "Your website has been created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate website. Please try again.",
        variant: "destructive",
      });

      // For demo purposes, generate sample code if API fails
      const fallbackCode = {
        html: '<div class="container">\n  <h1>Hello World</h1>\n  <p>This is a sample website</p>\n  <button id="btn">Click me</button>\n</div>',
        css: "body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}",
        js: 'document.getElementById("btn").addEventListener("click", function() {\n  alert("Button clicked!");\n});',
      };
      
      setGeneratedCode(fallbackCode);
      
      // Save even the fallback code to history
      saveToHistory(idea, fallbackCode.html, fallbackCode.css, fallbackCode.js);
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers for updating the code when user edits it
  const handleHtmlChange = useCallback((newHtml: string) => {
    setGeneratedCode((prev) => ({ ...prev, html: newHtml }));
  }, []);

  const handleCssChange = useCallback((newCss: string) => {
    setGeneratedCode((prev) => ({ ...prev, css: newCss }));
  }, []);

  const handleJsChange = useCallback((newJs: string) => {
    setGeneratedCode((prev) => ({ ...prev, js: newJs }));
  }, []);
  
  const handleHistoryItemSelect = (item: WebsiteHistoryItem) => {
    setWebsiteIdea(item.prompt);
    setGeneratedCode({
      html: item.code.html,
      css: item.code.css,
      js: item.code.js
    });
    
    toast({
      title: "Loaded from history",
      description: "You can now edit and update this website",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-zinc-900 via-gray-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                WebMistri
                <span>
                  {" "}
                  <img
                    className="size-8 inline"
                    src="https://brandlogos.net/wp-content/uploads/2025/03/gemini_icon-logo_brandlogos.net_bqzeu-300x300.png"
                    alt=""
                  />{" "}
                </span>
              </h1>
            </div>
            {/* Responsive Navbar */}
            <nav className="relative">
              {/* Desktop Nav */}
              <ul className="hidden md:flex space-x-6">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/working"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="/tech-stack"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Tech Stack
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="text-white focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Mobile Dropdown */}
                {showMobileMenu && (
                  <ul className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 p-2 space-y-2">
                    <li>
                      <a
                        href="/"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        className="block text-gray-300 hover:text-white"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="/working"
                        className="block text-gray-300 hover:text-white"
                      >
                        How it Works
                      </a>
                    </li>
                    <li>
                      <a
                        href="tech-stack"
                        className="block text-gray-300 hover:text-white"
                      >
                        Tech Stack
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="block text-gray-300 hover:text-white"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </div>
          <div className="py-16 md:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              {/* LEFT: Text */}
              <div className="text-left space-y-6 px-4 md:px-0">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Build Your Websites with Gemini AI
                </h2>
                <p className="text-base text-gray-300 max-w-xl leading-relaxed font-light">
                  Say hello to{" "}
                  <span className="font-semibold text-white">
                    WebsiteMistri
                  </span>{" "}
                  — your AI-powered digital craftsman! ✨<base />
                  Just share your vision, and we’ll instantly shape it into
                  fully functional{" "}
                  <span className="text-blue-400 font-medium">HTML</span>,{" "}
                  <span className="text-purple-400 font-medium">CSS &</span>{" "}
                  <span className="text-pink-400 font-medium">JS</span>. <br />
                  Watch your website come alive in real-time — no coding stress,
                  just creative magic.
                  <br />
                  <span className="text-blue-400 font-medium text-xl">
                    Ye Sab tumhara bhai{" "}
                  </span>
                  <span className="text-purple-400 font-medium text-xl">
                    {" "}
                    dekh lega tum
                  </span>
                  <span className="text-pink-400 font-medium text-xl">
                    {" "}
                    Dream11 pe team bano🤙
                  </span>
                </p>
                <button
                  onClick={() => {
                    const section = document.getElementById("website-form");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md transition duration-300"
                >
                  Try it Now
                </button>
              </div>

              {/* RIGHT: Image */}
              <div className="flex justify-center md:justify-end">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/030/577/589/non_2x/web-development-with-ai-generated-free-png.png"
                  alt="AI Website Preview"
                  className="w-full max-w-md md:max-w-lg"
                />
              </div>
            </div>
            <hr className="mt-12 border border-blue-800 shadow-blue-400 mx-12" />
          </div>
        </header>

        {isLoading ? (
          <LoadingDisplay />
        ) : (
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-12 mb-4 text-center">
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-900/30 to-violet-900/30 rounded-full border border-blue-800/30 text-sm text-blue-300 mb-8">
                Start creating your custom website below
              </div>
            </div>
            <div
              id="website-form"
              className="md:col-span-4 md:sticky md:top-6 self-start h-fit"
            >
              <WebsiteForm 
                onSubmit={handleSubmit} 
                defaultValue={websiteIdea} 
                onHistoryClick={() => setShowHistoryModal(true)} 
              />
            </div>

            <div className="md:col-span-8">
              {generatedCode.html ? (
                <Card className="overflow-hidden border-0 shadow-xl shadow-blue-900/10">
                  <Tabs defaultValue="preview" className="w-full">
                    <CardHeader className="pb-0 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            Your Generated Website
                          </CardTitle>
                          <CardDescription className="text-gray-500 mt-1">
                            Edit the code and see live updates in the preview
                          </CardDescription>
                        </div>
                        <TabsList className="bg-gray-100">
                          <TabsTrigger
                            value="preview"
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            Preview
                          </TabsTrigger>
                          <TabsTrigger
                            value="html"
                            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                          >
                            HTML
                          </TabsTrigger>
                          <TabsTrigger
                            value="css"
                            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                          >
                            CSS
                          </TabsTrigger>
                          <TabsTrigger
                            value="js"
                            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                          >
                            JavaScript
                          </TabsTrigger>
                        </TabsList>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <TabsContent value="preview" className="m-0">
                        <WebsitePreview
                          html={generatedCode.html}
                          css={generatedCode.css}
                          js={generatedCode.js}
                        />
                      </TabsContent>
                      <TabsContent value="html" className="m-0">
                        <CodeDisplay
                          code={generatedCode.html}
                          language="html"
                          onCodeChange={handleHtmlChange}
                        />
                      </TabsContent>
                      <TabsContent value="css" className="m-0">
                        <CodeDisplay
                          code={generatedCode.css}
                          language="css"
                          onCodeChange={handleCssChange}
                        />
                      </TabsContent>
                      <TabsContent value="js" className="m-0">
                        <CodeDisplay
                          code={generatedCode.js}
                          language="js"
                          onCodeChange={handleJsChange}
                        />
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>
              ) : (
                <Card className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center p-6">
                    <div className="mb-4">
                      <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto flex items-center justify-center">
                        <svg
                          className="h-12 w-12 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      Your Website Awaits
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Describe your website on the left and let AI do the rest!
                    </p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.querySelector("textarea")?.focus()
                      }
                      className="animate-pulse"
                    >
                      Get Started
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        <hr className="mx-12 border-violet-700 mt-20" />

        <section className="mt-24 mb-12 px-6 md:px-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Features You’ll Love
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-900 rounded-xl shadow-lg p-6 hover:-translate-y-1 transition duration-300 border border-slate-700">
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                Previous History
              </h3>
              <p className="text-gray-300 text-sm">
                  You can view the previously genrated websites using the History option.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl shadow-lg p-6 hover:-translate-y-1 transition duration-300 border border-slate-700">
              <h3 className="text-lg font-bold text-purple-400 mb-2">
                Live Preview
              </h3>
              <p className="text-gray-300 text-sm">
                See your website update in real time as you modify the code or
                prompt.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl shadow-lg p-6 hover:-translate-y-1 transition duration-300 border border-slate-700">
              <h3 className="text-lg font-bold text-pink-400 mb-2">
                Editable Code
              </h3>
              <p className="text-gray-300 text-sm">
                Easily edit the generated HTML, CSS, and JavaScript inside the
                editor.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl shadow-lg p-6 hover:-translate-y-1 transition duration-300 border border-slate-700">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">
                Downloadable Code
              </h3>
              <p className="text-gray-300 text-sm">
                Export your entire project as a zip file with a single click —
                ready to deploy.
              </p>
            </div>
          </div>
        </section>

        {/* History Modal */}
        <HistoryModal
          open={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          onSelectItem={handleHistoryItemSelect}
        />

        <footer className="mt-16 border-t border-gray-800 pt-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-1.5 rounded-md mr-2">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  WebMistri<span className="text-blue-500">.Gemni</span>
                </h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                The most advanced AI website generator that helps developers and
                designers build websites faster.
              </p>
              <div className="flex space-x-3">
                <a
                  target="_blank"
                  href="https://github.com/harshitmasiwal/"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/harshit-masiwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 0h-14C2.24 0 1 1.24 1 2.75v18.5C1 22.76 2.24 24 4 24h16c1.76 0 3-1.24 3-2.75V2.75C23 1.24 21.76 0 20 0zM8.12 20H5.16V9h2.97v11zm-1.48-12.3c-.95 0-1.71-.78-1.71-1.75s.76-1.75 1.71-1.75c.95 0 1.71.78 1.71 1.75s-.77 1.75-1.71 1.75zm13.36 12.3h-2.97v-5.5c0-1.32-.47-2.22-1.64-2.22-.9 0-1.43.61-1.67 1.2-.08.2-.1.48-.1.76v5.76h-2.97s.04-9.35 0-10.31h2.97v1.46c.4-.62 1.1-1.5 2.67-1.5 1.95 0 3.41 1.27 3.41 4v6.35z" />
                  </svg>
                </a>

                <a
                  target="_blank"
                  href="https://x.com/harshit_masiwal/"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.035 10.035 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tech Stack
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              © 2025 WebCraftAI. All rights reserved. Powered by Google Gemini
              API
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-400">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-400">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-400">
                Cookie Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
