"use client";

import { ExternalLink, MessageCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setStudents(data);
    }
    setLoading(false);
  };

  const formatWhatsApp = (phone) => {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "92" + cleaned.substring(1);
    }
    return `https://wa.me/${cleaned}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Student Roster
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage all registered participants and their data.
          </p>
        </div>
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 shadow-sm flex items-center gap-2">
          <Users size={16} className="text-blue-600" />
          Total Count: {students.length}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/30 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-8 py-5">Participant Details</th>
                <th className="px-8 py-5">University</th>
                <th className="px-8 py-5">Payment Verification</th>
                <th className="px-8 py-5 text-right">Direct Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-12 text-center text-slate-400 font-bold"
                  >
                    Loading records...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-12 text-center text-slate-400 font-bold"
                  >
                    No students registered yet.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900 text-base">
                        {student.full_name}
                      </div>
                      <div className="text-slate-500 font-medium text-xs mt-0.5">
                        {student.email}
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-600">
                      {student.university_name}
                    </td>
                    <td className="px-8 py-5">
                      {student.payment_receipt_url ? (
                        <a
                          href={student.payment_receipt_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
                        >
                          <ExternalLink size={14} /> View Receipt
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-slate-400 text-xs font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          Pending Upload
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <a
                        href={formatWhatsApp(student.phone_no)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-xs bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-100 transition-colors shadow-sm"
                      >
                        <MessageCircle size={16} /> Message
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
