"use client";

import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function StudentLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-200">
      {/* Global Student Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-2 group"
            >
              <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Zap size={24} className="text-white fill-white" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                VSPARK
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className={`text-sm font-bold px-4 py-2.5 rounded-xl transition-colors ${pathname === "/login" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
              >
                Student Login
              </Link>
              <Link
                href="/register"
                className={`text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm ${pathname === "/register" ? "bg-blue-600 text-white shadow-blue-500/30" : "bg-slate-900 text-white hover:bg-slate-800"}`}
              >
                Register Now
              </Link>
            </nav>

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
          <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 shadow-lg flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-slate-700 font-bold py-3 bg-slate-100 rounded-xl"
            >
              Student Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md"
            >
              Register Now
            </Link>
          </div>
        )}
      </header>

      {/* Main Page Content (Login/Register/Dashboard injected here) */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Global Student Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start mb-4 md:mb-0">
              <span className="text-sm text-slate-500 font-medium">
                &copy; {new Date().getFullYear()} VSpark Event • COMSATS
                University Vehari. All rights reserved.
              </span>
            </div>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Terms of Service
              </a>
              <a
                href="mailto:admin@comsats.edu.pk"
                className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
