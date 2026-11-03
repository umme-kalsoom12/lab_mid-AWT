"use client";

import { AlertCircle, Award, Home, Medal, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LeaderboardPage() {
  const [submissions, setSubmissions] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    // 1. Check if results are published
    const { data: settings } = await supabase
      .from("competition_settings")
      .select("results_published")
      .eq("id", 1)
      .single();

    if (settings?.results_published) {
      setIsPublished(true);

      // 2. Fetch submissions ordered by total_marks descending
      const { data: results } = await supabase
        .from("submissions")
        .select(
          `
          total_marks,
          profiles (
            full_name,
            university_name
          )
        `,
        )
        .order("total_marks", { ascending: false });

      if (results) {
        setSubmissions(results);
      }
    }
    setLoading(false);
  };

  const getRankStyling = (index) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-sm transform scale-[1.02] z-10 relative";
      case 1:
        return "bg-gradient-to-r from-slate-50 to-gray-100 border-slate-300 shadow-sm";
      case 2:
        return "bg-gradient-to-r from-orange-50 to-amber-50/50 border-orange-200 shadow-sm";
      default:
        return "bg-white border-slate-100 hover:bg-slate-50";
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy size={28} className="text-yellow-500 fill-yellow-500" />;
      case 1:
        return <Medal size={24} className="text-slate-400 fill-slate-300" />;
      case 2:
        return <Award size={24} className="text-orange-500 fill-orange-400" />;
      default:
        return (
          <span className="text-slate-400 font-bold w-6 text-center">
            {index + 1}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans text-slate-500">
        Loading results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-10 text-center relative">
          <Link
            href="/login"
            className="absolute left-0 top-2 p-2 bg-white rounded-full text-slate-500 hover:text-slate-900 shadow-sm transition-colors"
          >
            <Home size={20} />
          </Link>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-500/30">
            <Zap size={32} className="fill-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Official <span className="text-blue-600">Leaderboard</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Final rankings and scores for the VSpark web development
            competition.
          </p>
        </div>

        {!isPublished ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center max-w-2xl mx-auto">
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Results Pending
            </h2>
            <p className="text-slate-500">
              The competition evaluations are still in progress. The leaderboard
              will be revealed once the administration publishes the final
              scores.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub, index) => (
              <div
                key={index}
                className={`flex items-center p-4 md:p-6 rounded-2xl border transition-all ${getRankStyling(index)}`}
              >
                {/* Rank Icon/Number */}
                <div className="w-16 flex justify-center items-center shrink-0">
                  {getRankIcon(index)}
                </div>

                {/* Participant Details */}
                <div className="flex-1 ml-4 border-l border-slate-200/50 pl-6">
                  <h3
                    className={`text-lg md:text-xl font-extrabold ${index === 0 ? "text-slate-900" : "text-slate-800"}`}
                  >
                    {sub.profiles?.full_name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {sub.profiles?.university_name}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Score
                  </div>
                  <div
                    className={`text-2xl md:text-3xl font-black ${
                      index === 0
                        ? "text-yellow-600"
                        : index === 1
                          ? "text-slate-700"
                          : index === 2
                            ? "text-orange-600"
                            : "text-blue-600"
                    }`}
                  >
                    {sub.total_marks}
                    <span className="text-sm font-bold text-slate-400 ml-1">
                      /100
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {submissions.length === 0 && (
              <div className="text-center p-12 text-slate-500 bg-white rounded-2xl border border-slate-100">
                No submissions have been graded yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
