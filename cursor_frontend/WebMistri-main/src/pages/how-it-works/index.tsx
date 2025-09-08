import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useCallback } from "react";

export default function HowItWorksPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-10">
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
              WebsiteMistri
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
                      href="/tech-stack"
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

        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            How WebsiteMistri Works
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl">
            From your idea to a fully functional website in just a few simple
            steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30">
            <CardHeader className="pb-2">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                1
              </div>
              <CardTitle className="text-xl font-bold text-white">
                Describe Your Website
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Start by describing what you want your website to look like and
                what functionality it should have. Be as specific as you want -
                from color schemes to layout preferences, the more details you
                provide, the better the result.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30">
            <CardHeader className="pb-2">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                2
              </div>
              <CardTitle className="text-xl font-bold text-white">
                AI Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our advanced AI, powered by the Gemini API, processes your
                description and generates custom HTML, CSS, and JavaScript code
                tailored to your requirements. This happens in seconds,
                drastically reducing development time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30">
            <CardHeader className="pb-2">
              <div className="bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                3
              </div>
              <CardTitle className="text-xl font-bold text-white">
                Preview & Edit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Instantly preview your new website in real-time. If you want to
                make changes, you can either edit the code directly or provide
                additional instructions to refine the design until it's exactly
                what you want.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
            The Technology Behind WebsiteMistri
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI-Powered Code Generation
                </h3>
                <p className="text-gray-300">
                  Our system uses advanced natural language processing to
                  understand your requirements and translate them into
                  functional code. The AI has been trained on millions of
                  websites and design patterns to ensure high-quality output
                  that follows best practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Responsive Design By Default
                </h3>
                <p className="text-gray-300">
                  All websites generated by WebsiteMistri are fully responsive
                  and work seamlessly across desktop, tablet, and mobile
                  devices. We ensure your site looks great no matter how it's
                  viewed.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Modern Web Standards
                </h3>
                <p className="text-gray-300">
                  The code produced follows current web standards and best
                  practices for performance, accessibility, and SEO, giving you
                  a solid foundation for your online presence.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://png.pngtree.com/png-clipart/20231006/original/pngtree-ai-code-generator-with-chatbot-checked-for-errors-vector-png-image_12967306.png"
                alt="AI Code Generation"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30 mb-20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">
                How long does it take to generate a website?
              </h3>
              <p className="text-gray-300">
                Most websites are generated in under 30 seconds, depending on
                complexity. From start to finish, you can have a complete
                website ready in just a few minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">
                Can I customize the generated code?
              </h3>
              <p className="text-gray-300">
                Absolutely! Once generated, you have full access to the HTML,
                CSS, and JavaScript code. You can edit it directly in our
                interface or download it for further customization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">
                What types of websites can I create?
              </h3>
              <p className="text-gray-300">
                WebsiteMistri can generate a wide variety of websites, including
                portfolios, landing pages, business sites, blogs, e-commerce
                storefronts, and more. If you can describe it, we can build it!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ready to create your website?
          </h2>
          <Button
            className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-medium shadow-lg"
            onClick={() => (window.location.href = "/")}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}
