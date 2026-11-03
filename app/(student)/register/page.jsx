"use client";

import {
  ArrowRight,
  Building2,
  Hash,
  Link as LinkIcon,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    password: "",
    transactionId: "",
    receiptUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        if (authError.message.includes("rate limit")) {
          throw new Error(
            'Email rate limit exceeded. Please disable "Confirm email" in Supabase Dashboard.',
          );
        }
        throw authError;
      }

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            full_name: formData.fullName,
            email: formData.email,
            phone_no: formData.phone,
            university_name: formData.university,
            payment_receipt_url: formData.receiptUrl || null,
            status: "approved",
          },
        ]);

        if (profileError) throw profileError;
      }

      if (authData.session) {
        router.push("/dashboard");
      } else {
        setError(
          "Account created, but email confirmation is still required by Supabase settings.",
        );
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-100 shadow-sm">
          <Zap size={14} className="fill-blue-600" />
          National Innovation Event
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Secure Your Spot at{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            VSpark
          </span>
        </h1>
        <p className="text-slate-500 text-lg font-medium">
          Join 500+ participants from across the country. Fill out your details
          below to finalize your registration.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center max-w-3xl mx-auto">
          {error}
        </div>
      )}

      <form
        onSubmit={handleRegister}
        className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12"
      >
        {/* Left Column: Profile Details */}
        <div className="xl:col-span-8">
          <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100/50">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Profile Details
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Your official certificate will use these details.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                  Full Name *
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ali Khan"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                    WhatsApp / Phone *
                  </label>
                  <div className="relative group">
                    <Phone
                      className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      size={20}
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03XXXXXXXXX"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                    Email Address *
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ali@gmail.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                    University / Institute *
                  </label>
                  <div className="relative group">
                    <Building2
                      className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      size={20}
                    />
                    <input
                      type="text"
                      name="university"
                      required
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="COMSATS Vehari"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                    Account Password *
                  </label>
                  <div className="relative group">
                    <Hash
                      className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      size={20}
                    />
                    <input
                      type="password"
                      name="password"
                      required
                      minLength="6"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Submit */}
        <div className="xl:col-span-4 space-y-6">
          {/* Sleek Bank Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden border border-slate-700">
            {/* Card Embellishments */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-8 right-8">
              <Zap size={48} className="text-white/10 fill-white/10" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-400 text-[10px] font-bold tracking-widest mb-1.5 uppercase">
                    Account Title
                  </p>
                  <p className="font-bold text-xl tracking-tight">
                    CS Department
                  </p>
                </div>
                <ShieldCheck size={28} className="text-blue-400" />
              </div>
              <div>
                <p className="text-blue-400 text-[10px] font-bold tracking-widest mb-1.5 uppercase">
                  Account Number
                </p>
                <p className="font-mono text-2xl tracking-widest">
                  0000 0000 0000
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-bold text-white border border-white/10">
                HBL / Easypaisa
              </div>
            </div>
          </div>

          {/* Verification Box */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                  Transaction ID *
                </label>
                <div className="relative group">
                  <Zap
                    className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    name="transactionId"
                    required
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="TXN-XXXXXXX"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white text-slate-900 font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
                  Proof of Payment (URL)
                </label>
                <div className="relative group">
                  <LinkIcon
                    className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    size={20}
                  />
                  <input
                    type="url"
                    name="receiptUrl"
                    value={formData.receiptUrl}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white text-slate-900 font-medium transition-all"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">
                  Total Payable
                </span>
                <span className="text-4xl font-black text-blue-600 tracking-tight">
                  PKR 0
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group disabled:opacity-70 mt-2"
              >
                {loading ? "Processing..." : "Complete Registration"}
                {!loading && (
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
