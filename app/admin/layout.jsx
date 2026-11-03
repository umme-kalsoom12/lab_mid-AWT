"use client";

import {
  ClipboardList,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const NavLinks = () => (
    <>
      <Link
        href="/admin/settings"
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${pathname === "/admin/settings" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-slate-800/50 hover:text-white text-slate-400"}`}
      >
        <Settings size={20} /> Event Settings
      </Link>
      <Link
        href="/admin/students"
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${pathname === "/admin/students" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-slate-800/50 hover:text-white text-slate-400"}`}
      >
        <Users size={20} /> Manage Students
      </Link>
      <Link
        href="/admin/evaluations"
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${pathname === "/admin/evaluations" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-slate-800/50 hover:text-white text-slate-400"}`}
      >
        <ClipboardList size={20} /> Evaluations
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-blue-200">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 flex items-center justify-between p-4 sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg text-white">
            <ShieldCheck size={20} />
          </div>
          <span className="text-white font-black text-lg tracking-tight">
            Admin
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-300 hover:text-white p-2"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Premium Admin Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 text-slate-300 flex flex-col shrink-0 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} overflow-hidden shadow-2xl md:shadow-none`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        <div className="p-6 border-b border-slate-800/60 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-white font-black text-xl tracking-tight">
                Admin Portal
              </h2>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                System Control
              </p>
            </div>
          </div>
          {/* Mobile close button inside sidebar */}
          <button
            className="md:hidden text-slate-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 relative z-10 overflow-y-auto">
          <NavLinks />
        </nav>

        <div className="p-4 border-t border-slate-800/60 relative z-10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-800/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl font-bold transition-colors text-sm"
          >
            <LogOut size={16} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50 w-full overflow-x-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
