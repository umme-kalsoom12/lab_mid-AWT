"use client";

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  Globe,
  Layers,
  MapPin,
  Menu,
  Terminal,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech" },
    { name: "Prizes", href: "#prizes" },
    { name: "Schedule", href: "#schedule" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center gap-2 group cursor-pointer"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md shadow-blue-500/20">
                <Code2 size={24} className="text-white" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
                VSPARK<span className="text-blue-600">.</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors px-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-slate-900 hover:bg-black text-white text-sm font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2 group"
              >
                Register Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none bg-slate-100 p-2 rounded-lg"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 shadow-xl absolute w-full">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-slate-600 hover:text-blue-600 block py-3 px-4 rounded-xl hover:bg-slate-50"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100 px-2">
                <Link
                  href="/login"
                  className="w-full text-center text-slate-700 font-bold py-3.5 bg-slate-100 rounded-xl"
                >
                  Participant Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-md"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glowing Background Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 text-xs font-bold tracking-widest uppercase mb-8 border border-slate-200 shadow-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Registrations Open
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Build the web. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Prove your skills.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            The premier Web Development Competition at COMSATS University.
            Compete in front-end design, full-stack architecture, and API
            integration to win exclusive prizes.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl shadow-blue-500/30 text-lg flex items-center justify-center gap-2 group"
            >
              Register for VSpark
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <a
              href="#about"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 px-10 rounded-2xl transition-all border border-slate-200 shadow-sm text-lg flex items-center justify-center gap-2"
            >
              <Terminal size={20} className="text-slate-400" />
              View Brief
            </a>
          </div>

          {/* Event Meta Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16 bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex items-center justify-center gap-3 p-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Calendar size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Date
                </p>
                <p className="font-bold text-slate-900">18 November, 2026</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <MapPin size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Location
                </p>
                <p className="font-bold text-slate-900">CS Dept, COMSATS</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Cpu size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Format
                </p>
                <p className="font-bold text-slate-900">On-Site Hackathon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech"
        className="py-24 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Allowed Technologies
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              Bring your best tools. Participants are evaluated on code quality,
              UI/UX, and architectural scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers size={32} />,
                title: "Frontend Frameworks",
                desc: "React.js, Next.js, Vue, or plain HTML/JS. Tailwind CSS and Bootstrap are highly encouraged.",
              },
              {
                icon: <Terminal size={32} />,
                title: "Backend & APIs",
                desc: "Node.js, Express, Laravel, Python, or Serverless functions. Build robust API endpoints.",
              },
              {
                icon: <Globe size={32} />,
                title: "Database & Auth",
                desc: "MongoDB, Supabase, Firebase, or MySQL. Implement secure authentication flows.",
              },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-800 transition-colors"
              >
                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section
        id="prizes"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-widest uppercase mb-4 border border-amber-200">
            <Trophy size={14} /> The Rewards
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Compete for Glory
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Top developers don't just walk away with certificates—they walk away
            with career-launching opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* 2nd Place */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 text-center relative md:translate-y-4">
            <div className="w-20 h-20 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md">
              <span className="text-2xl font-black">2nd</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Runner Up
            </h3>
            <p className="text-slate-500 font-medium mb-6">
              Excellent Execution
            </p>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> Shield
                of Honor
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> Merit
                Certificate
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> Tech
                Swag Pack
              </li>
            </ul>
          </div>

          {/* 1st Place (Highlighted) */}
          <div className="bg-gradient-to-b from-blue-600 to-indigo-700 p-10 rounded-[2rem] shadow-2xl shadow-blue-900/30 border border-blue-500 text-center relative z-10 transform md:-translate-y-4">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <Trophy size={64} className="text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-amber-400 text-amber-900 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-blue-600 shadow-xl">
                <span className="text-3xl font-black">1st</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-2">Champion</h3>
              <p className="text-blue-200 font-medium mb-8">
                Ultimate Developer
              </p>
              <ul className="space-y-4 text-left">
                <li className="flex items-center gap-3 text-white font-bold">
                  <CheckCircle2 size={20} className="text-amber-400" /> Winner's
                  Trophy
                </li>
                <li className="flex items-center gap-3 text-white font-bold">
                  <CheckCircle2 size={20} className="text-amber-400" /> Software
                  House Internship
                </li>
                <li className="flex items-center gap-3 text-white font-bold">
                  <CheckCircle2 size={20} className="text-amber-400" /> Premium
                  Certificate
                </li>
                <li className="flex items-center gap-3 text-white font-bold">
                  <CheckCircle2 size={20} className="text-amber-400" /> Feature
                  on Dept Portal
                </li>
              </ul>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 text-center relative md:translate-y-4">
            <div className="w-20 h-20 bg-amber-700/10 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md">
              <span className="text-2xl font-black">3rd</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Second Runner Up
            </h3>
            <p className="text-slate-500 font-medium mb-6">
              Strong Performance
            </p>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> Bronze
                Shield
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> Merit
                Certificate
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> Digital
                Badges
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-slate-900/30">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to start coding?
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              Join the portal today, get your dashboard ready, and wait for the
              brief to drop on November 18.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-lg shadow-blue-600/30 text-lg group"
            >
              <Zap size={20} className="fill-white" />
              Secure Your Seat
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Code2 size={20} className="text-blue-600" />
          <span className="font-black text-xl text-slate-900 tracking-tight">
            VSPARK.
          </span>
        </div>
        <p className="text-slate-500 font-medium text-sm">
          &copy; 2026 COMSATS University Vehari Campus. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
