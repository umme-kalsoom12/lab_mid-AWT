"use client";

import { Folder, GitBranch, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminEvaluations() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("submissions")
      .select(
        `
        *,
        profiles (
          full_name,
          university_name
        )
      `,
      )
      .order("submitted_at", { ascending: false });

    if (!error && data) {
      setSubmissions(data);
    }
    setLoading(false);
  };

  const handleUpdateMarks = async (submissionId, newMarks) => {
    setUpdatingId(submissionId);

    // Ensure marks stay within 0-100 bounds as per SQL constraint
    let validMarks = parseInt(newMarks) || 0;
    if (validMarks < 0) validMarks = 0;
    if (validMarks > 100) validMarks = 100;

    await supabase
      .from("submissions")
      .update({ total_marks: validMarks })
      .eq("id", submissionId);

    // Update local state without refetching everything
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, total_marks: validMarks } : sub,
      ),
    );

    setUpdatingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar Navigation */}

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Project Evaluations
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review student submissions and assign marks.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Submitted At</th>
                    <th className="px-6 py-4">Project Links</th>
                    <th className="px-6 py-4 w-48 text-right">
                      Total Marks (0-100)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-slate-400"
                      >
                        Loading submissions...
                      </td>
                    </tr>
                  ) : submissions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-slate-400"
                      >
                        No submissions yet.
                      </td>
                    </tr>
                  ) : (
                    submissions.map((sub) => (
                      <tr
                        key={sub.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">
                            {sub.profiles?.full_name}
                          </div>
                          <div className="text-slate-500 text-xs">
                            {sub.profiles?.university_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(sub.submitted_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <a
                              href={sub.github_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium text-xs bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <GitBranch size={14} /> GitHub
                            </a>
                            <a
                              href={sub.drive_folder_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Folder size={14} /> Drive Folder
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              defaultValue={sub.total_marks}
                              onBlur={(e) =>
                                handleUpdateMarks(sub.id, e.target.value)
                              }
                              className="w-20 px-3 py-2 text-center rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-bold bg-slate-50"
                            />
                            {updatingId === sub.id && (
                              <Save
                                size={16}
                                className="text-blue-500 animate-pulse"
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
