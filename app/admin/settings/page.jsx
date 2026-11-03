"use client";

import {
  Calendar,
  FileText,
  Save,
  ToggleLeft,
  ToggleRight,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState({
    title: "",
    task_description: "",
    task_pdf_url: "",
    start_time: "",
    end_time: "",
    is_submission_open: false,
    results_published: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("competition_settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (data) {
      setSettings({
        ...data,
        start_time: new Date(data.start_time).toISOString().slice(0, 16),
        end_time: new Date(data.end_time).toISOString().slice(0, 16),
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("competition_settings")
      .update({
        title: settings.title,
        task_description: settings.task_description,
        task_pdf_url: settings.task_pdf_url,
        start_time: new Date(settings.start_time).toISOString(),
        end_time: new Date(settings.end_time).toISOString(),
        is_submission_open: settings.is_submission_open,
        results_published: settings.results_published,
      })
      .eq("id", 1);

    setLoading(false);
    if (error) {
      setMessage({
        text: "Failed to update settings database.",
        type: "error",
      });
    } else {
      setMessage({
        text: "System configuration updated and live.",
        type: "success",
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Event Settings
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Configure competition parameters and access controls.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-bold border flex items-center gap-3 ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}
        >
          <Zap
            size={18}
            className={
              message.type === "success" ? "text-emerald-500" : "text-red-500"
            }
          />
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* General Details Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/30 border border-slate-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <FileText size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Competition Brief
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                Event Title
              </label>
              <input
                type="text"
                value={settings.title}
                onChange={(e) =>
                  setSettings({ ...settings, title: e.target.value })
                }
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                Task Description
              </label>
              <textarea
                value={settings.task_description}
                onChange={(e) =>
                  setSettings({ ...settings, task_description: e.target.value })
                }
                rows="5"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium resize-none leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                Task PDF URL (Google Drive)
              </label>
              <input
                type="url"
                value={settings.task_pdf_url}
                onChange={(e) =>
                  setSettings({ ...settings, task_pdf_url: e.target.value })
                }
                placeholder="https://drive.google.com/..."
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Timing & Controls Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/30 border border-slate-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <Calendar size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Timing & Access Controls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={settings.start_time}
                onChange={(e) =>
                  setSettings({ ...settings, start_time: e.target.value })
                }
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                End Time
              </label>
              <input
                type="datetime-local"
                value={settings.end_time}
                onChange={(e) =>
                  setSettings({ ...settings, end_time: e.target.value })
                }
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                required
              />
            </div>
          </div>

          {/* Premium Custom Toggles */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  is_submission_open: !settings.is_submission_open,
                })
              }
              className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="text-left">
                <p className="font-bold text-slate-900">
                  Force Submission Open
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Overrides strict datetime locks and immediately opens portal.
                </p>
              </div>
              {settings.is_submission_open ? (
                <ToggleRight size={36} className="text-blue-600" />
              ) : (
                <ToggleLeft
                  size={36}
                  className="text-slate-300 group-hover:text-slate-400 transition-colors"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  results_published: !settings.results_published,
                })
              }
              className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="text-left">
                <p className="font-bold text-slate-900">
                  Publish Leaderboard Results
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Makes evaluations visible to the public on the results page.
                </p>
              </div>
              {settings.results_published ? (
                <ToggleRight size={36} className="text-emerald-500" />
              ) : (
                <ToggleLeft
                  size={36}
                  className="text-slate-300 group-hover:text-slate-400 transition-colors"
                />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 hover:bg-black text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 flex items-center gap-2"
          >
            <Save size={20} />{" "}
            {loading ? "Saving Data..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}
