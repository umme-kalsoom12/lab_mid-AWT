"use client";

import {
  CheckCircle2,
  Clock,
  FileText,
  GitBranch,
  Lock,
  LogOut,
  UploadCloud,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function StudentDashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [githubUrl, setGithubUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAuthAndSettings();
  }, []);

  const checkAuthAndSettings = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setSession(session);

    const { data: settingsData } = await supabase
      .from("competition_settings")
      .select("*")
      .eq("id", 1)
      .single();

    setSettings(settingsData);
    setLoading(false);
  };

  const handleFolderSelect = (e) => {
    const files = Array.from(e.target.files);
    const filteredFiles = files.filter((file) => {
      const path = file.webkitRelativePath;
      return (
        !path.includes("node_modules/") &&
        !path.includes(".next/") &&
        !path.includes(".env")
      );
    });
    setSelectedFiles(filteredFiles);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setMessage("Please select a folder to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file, file.webkitRelativePath);
      });
      formData.append("githubUrl", githubUrl);
      formData.append("userId", session.user.id);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setMessage(
        "Submission successful! Your project has been securely uploaded.",
      );
    } catch (error) {
      setMessage(error.message || "An error occurred during submission.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-sans font-bold text-slate-400">
        Loading your workspace...
      </div>
    );
  }

  // Bulletproof Time Logic
  const now = new Date();
  const startTime = settings?.start_time ? new Date(settings.start_time) : now;
  const endTime = settings?.end_time ? new Date(settings.end_time) : now;
  const isForcedOpen = settings?.is_submission_open === true;

  // If forced open by admin, skip time checks completely.
  const isActive = isForcedOpen || (now >= startTime && now <= endTime);
  const isPreEvent = !isActive && now < startTime;
  const isClosed = !isActive && now > endTime;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Dashboard Welcome Header */}
      <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex justify-center items-center text-white shadow-lg shadow-blue-500/30">
            <Zap size={28} className="fill-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {settings?.title || "Competition Portal"}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {session?.user.email}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            supabase.auth.signOut().then(() => router.push("/login"))
          }
          className="relative z-10 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 px-5 py-2.5 rounded-xl transition-colors"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>

      {/* Conditional Workspace States */}
      <div className="space-y-8">
        {isPreEvent && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-12 text-center text-white shadow-2xl shadow-blue-900/20 border border-blue-500">
            <Clock size={56} className="mx-auto mb-6 text-blue-200" />
            <h2 className="text-4xl font-black mb-3 tracking-tight">
              Event Starts Soon
            </h2>
            <p className="text-blue-100 text-lg font-medium max-w-lg mx-auto">
              The competition brief and submission portal will unlock securely
              at {startTime.toLocaleString()}.
            </p>
          </div>
        )}

        {isClosed && (
          <div className="bg-slate-900 rounded-[2rem] p-12 text-center text-white shadow-2xl shadow-slate-900/20 border border-slate-800">
            <Lock size={56} className="mx-auto mb-6 text-slate-400" />
            <h2 className="text-4xl font-black mb-3 tracking-tight">
              Submissions Closed
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              The deadline for this competition has officially passed.
            </p>
          </div>
        )}

        {isActive && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Task Details Card */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 h-fit">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100/50">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Task Details
                </h2>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap text-[15px]">
                  {settings?.task_description}
                </p>
              </div>

              {settings?.task_pdf_url && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <a
                    href={settings.task_pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-5 py-3 rounded-xl transition-colors border border-blue-100"
                  >
                    <UploadCloud size={18} /> Download Official PDF Guidelines
                  </a>
                </div>
              )}
            </div>

            {/* Upload Form Card */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 h-fit">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100/50">
                  <UploadCloud size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Submit Project
                </h2>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-xl text-sm mb-8 font-bold border ${message.includes("successful") ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmission} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                    GitHub Repository URL *
                  </label>
                  <div className="relative group">
                    <GitBranch
                      className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      size={20}
                    />
                    <input
                      type="url"
                      required
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all text-slate-900 font-medium bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                    Project Directory *
                  </label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 rounded-2xl p-8 text-center transition-all group">
                    <input
                      type="file"
                      required
                      webkitdirectory="true"
                      directory="true"
                      multiple
                      onChange={handleFolderSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="relative z-0">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud className="text-blue-500" size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-700">
                        Click to browse folder
                      </p>
                      <p className="text-xs font-medium text-slate-400 mt-1">
                        node_modules and .env are auto-ignored
                      </p>
                    </div>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl">
                      <CheckCircle2 size={16} className="text-emerald-500" />{" "}
                      {selectedFiles.length} files securely staged for upload
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-slate-900/20 mt-2 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {uploading
                    ? "Encrypting & Uploading..."
                    : "Confirm Submission"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
