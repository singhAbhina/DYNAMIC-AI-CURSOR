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

interface TechItemProps {
  name: string;
  description: string;
  icon: string;
  color: string;
}

const TechItem: React.FC<TechItemProps> = ({
  name,
  description,
  icon,
  color,
}) => {
  return (
    <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div
          className={`w-12 h-12 rounded-md ${color} flex items-center justify-center mb-3 text-2xl`}
        >
          <img src={icon} alt={name} className="w-8 h-8" />
        </div>
        <CardTitle className="text-xl font-bold text-white">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function TechStackPage() {
  const frontendTech = [
    {
      name: "React",
      description:
        "A JavaScript library for building user interfaces with reusable components for an interactive and efficient UX.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      color: "bg-blue-900/40",
    },
    {
      name: "TypeScript",
      description:
        "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
      color: "bg-blue-800/40",
    },
    {
      name: "Tailwind CSS",
      description:
        "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
      color: "bg-teal-900/40",
    },
    {
      name: "Shadcn UI",
      description:
        "A collection of beautifully designed components that you can copy and paste into your apps.",
      icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4",
      color: "bg-slate-800",
    },
  ];

  const aiTech = [
    {
      name: "Gemini API",
      description:
        "Google's powerful large language model API that powers our website generation through advanced natural language understanding.",
      icon: "https://brandlogos.net/wp-content/uploads/2025/03/gemini_icon-logo_brandlogos.net_bqzeu-300x300.png",
      color: "bg-purple-900/40",
    },
    {
      name: "AI Code Generation",
      description:
        "Custom-built models fine-tuned specifically for generating high-quality, semantic HTML, CSS, and JavaScript.",
      icon: "https://cdn-icons-png.flaticon.com/512/8637/8637114.png",
      color: "bg-indigo-900/40",
    },
  ];

  const devTools = [
    {
      name: "Next.js",
      description:
        "A React framework that enables functionality such as server-side rendering and static site generation for better performance.",
      icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      color: "bg-gray-900",
    },
    {
      name: "Vite",
      description:
        "A build tool that aims to provide a faster and leaner development experience for modern web projects.",
      icon: "https://vitejs.dev/logo.svg",
      color: "bg-purple-900/40",
    },
    {
      name: "ESLint",
      description:
        "A static code analysis tool for identifying problematic patterns found in JavaScript code.",
      icon: "https://eslint.org/icon.svg",
      color: "bg-indigo-900/40",
    },
    {
      name: "Git & GitHub",
      description:
        "Version control system and platform for code collaboration and deployment automation.",
      icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
      color: "bg-slate-800",
    },
  ];
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
            Our Tech Stack
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl">
            WebsiteMistri leverages cutting-edge technologies to deliver
            high-performance, beautiful, and functional websites
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">
            Frontend Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frontendTech.map((tech, index) => (
              <TechItem
                key={index}
                name={tech.name}
                description={tech.description}
                icon={tech.icon}
                color={tech.color}
              />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            AI & Machine Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiTech.map((tech, index) => (
              <TechItem
                key={index}
                name={tech.name}
                description={tech.description}
                icon={tech.icon}
                color={tech.color}
              />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-pink-400 mb-6">
            Development & Deployment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devTools.map((tech, index) => (
              <TechItem
                key={index}
                name={tech.name}
                description={tech.description}
                icon={tech.icon}
                color={tech.color}
              />
            ))}
          </div>
        </div>

        <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30 mb-16">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Why We Chose This Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Our technology choices are deliberate, focused on delivering the
              best possible experience for both developers and end-users. We've
              selected tools and frameworks that prioritize performance,
              developer experience, and maintainability.
            </p>
            <p className="text-gray-300">
              The combination of React's component-based architecture,
              TypeScript's type safety, and Tailwind's utility-first approach
              allows us to build robust, scalable interfaces efficiently.
              Meanwhile, our AI integration with the Gemini API enables the core
              functionality of transforming natural language descriptions into
              functioning websites.
            </p>
            <p className="text-gray-300">
              This stack represents the current best practices in web
              development while leaving room for future innovation and
              adaptation as the technology landscape evolves.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Experience the power of our technology
          </h2>
          <Button
            className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-medium shadow-lg"
            onClick={() => (window.location.href = "/")}
          >
            Try WebsiteMistri Now
          </Button>
        </div>
      </div>
    </div>
  );
}
