import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
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

        {/* Hero Text */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl">
            Have questions about WebsiteMistri? We're here to help!
          </p>
        </div>

        {/* Contact & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600/30 p-3 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-300">hmasiwal15@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-600/30 p-3 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-300">+91 7827902652</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-pink-600/30 p-3 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-300">Ghaziabad, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Connect With Me</h2>
            <div className="flex space-x-4">
              <a href="mailto:hmasiwal15@gmail.com" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full">
                📧
              </a>
              <a href="https://www.linkedin.com/in/abhinav-singh-18b84a291/" target="_blank" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full">
                🔗
              </a>
              <a href="https://github.com/singhAbhina" target="_blank" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full">
                🐙
              </a>
              <a href="https://github.com/singhAbhina" target="_blank" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full">
                🐦
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Send Me a Message</CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form and I’ll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-300">Name</label>
                    <Input id="name" placeholder="Your name" className="bg-slate-900/70 border-slate-700 text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-300">Email</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" className="bg-slate-900/70 border-slate-700 text-gray-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm text-gray-300">Subject</label>
                  <Input id="subject" placeholder="How can I help you?" className="bg-slate-900/70 border-slate-700 text-gray-300" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-300">Message</label>
                  <Textarea id="message" placeholder="Your message..." rows={6} className="bg-slate-900/70 border-slate-700 text-gray-300 resize-none" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        
      </div>
    </div>
  );
}
