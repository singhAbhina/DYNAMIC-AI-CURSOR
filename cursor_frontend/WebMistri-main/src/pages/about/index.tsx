import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
              WebsiteMistri
              <span>
                <img
                  className="size-8 inline"
                  src="https://brandlogos.net/wp-content/uploads/2025/03/gemini_icon-logo_brandlogos.net_bqzeu-300x300.png"
                  alt=""
                />
              </span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="relative">
            <ul className="hidden md:flex space-x-6">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="/working" className="text-gray-300 hover:text-white">How it Works</a></li>
              <li><a href="/tech-stack" className="text-gray-300 hover:text-white">Tech Stack</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>

            {/* Mobile Nav */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {showMobileMenu && (
                <ul className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 p-2 space-y-2">
                  <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                  <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
                  <li><a href="/working" className="text-gray-300 hover:text-white">How it Works</a></li>
                  <li><a href="/tech-stack" className="text-gray-300 hover:text-white">Tech Stack</a></li>
                  <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              )}
            </div>
          </nav>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About WebsiteMistri
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl">
            Your AI-powered solution for rapid website development and prototyping
          </p>
        </div>

        {/* Mission + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At WebsiteMistri, we're on a mission to democratize web development through AI.
              Creating a website should be as easy as describing your vision — no code required.
            </p>
            <p className="text-gray-300">
              Our AI transforms your ideas into fully functional websites, helping devs,
              designers, and creators build faster.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/036/105/045/small_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-web-site-social-media-png.png"
              alt="AI Web Development"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>

        {/* Our Story */}
        <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30 mb-20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Our Story</CardTitle>
            <CardDescription className="text-gray-400">The journey behind WebsiteMistri</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              WebsiteMistri started as a passion project by Harshit Masiwal — a full-stack developer and AI enthusiast from ABES Engineering College. Tired of long dev cycles, he wanted to automate and accelerate website building.
            </p>
            <p className="text-gray-300 mb-4">
              Using cutting-edge AI like Gemini and LLMs, WebsiteMistri helps convert prompts into responsive websites instantly.
            </p>
            <p className="text-gray-300">
              Our goal? Make website development accessible and blazing fast for everyone.
            </p>
          </CardContent>
        </Card>

        {/* Founder Card */}
        <div className="mb-20 flex justify-center">
          <Card className="w-full md:w-2/3 lg:w-1/2 border-0 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg">
            <CardHeader className="flex items-center space-x-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2oJKvVrjfr6og49KIzMq4msvOFv-dgPd9EQ&s"
                alt="Harshit Masiwal"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-white text-xl font-bold">Harshit Masiwal</CardTitle>
                <CardDescription className="text-blue-400">Love Coder Army 💗 </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Hi! I'm Harshit, a passionate developer from ABES Engineering College. WebsiteMistri is my brainchild —
                blending AI with intuitive design to help everyone launch beautiful websites faster.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { title: "Innovation", color: "text-blue-400", text: "Pushing boundaries of AI-powered web building." },
            { title: "Accessibility", color: "text-purple-400", text: "Made for all — devs and non-devs alike." },
            { title: "Quality", color: "text-pink-400", text: "Clean, responsive, production-ready code." },
          ].map((value, idx) => (
            <Card key={idx} className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className={`text-lg font-bold ${value.color}`}>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{value.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mb-20">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to try WebsiteMistri?</h2>
          <p className="text-gray-400 mb-6">Build your next project with AI in seconds.</p>
          <Button
            className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-medium shadow-lg"
            onClick={() => (window.location.href = "/")}
          >
            Start Building Now
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 text-white mb-10">
          <a href="mailto:hmasiwal15@gmail.com" className="hover:text-blue-400">📧</a>
          <a href="https://linkedin.com/in/harshit-masiwal" target="_blank" className="hover:text-blue-500">🔗</a>
          <a href="https://github.com/harshitmasiwal" target="_blank" className="hover:text-gray-300">🐙</a>
          <a href="https://x.com/harshit_masiwal" target="_blank" className="hover:text-blue-300">🐦</a>
        </div>
      </div>
    </div>
  );
}
