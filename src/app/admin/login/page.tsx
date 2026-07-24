"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/Button";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";
  const { dispatch } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: "LOGIN",
      payload: {
        id: `adm_${Date.now()}`,
        name: formData.email.split("@")[0] || "Administrator",
        email: formData.email,
        role: "admin",
        phone: "+91 98765 43210",
        rewardPoints: 0,
      },
    });

    router.push(redirectPath);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EB7297]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 text-xs text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
          </Link>
          <div className="w-14 h-14 rounded-2xl bg-[#EB7297] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#EB7297]/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
            Staff & Admin Portal
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Enter your admin credentials to manage store catalog & orders.
          </p>


        </div>

        <motion.div
          className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#EB7297] focus:border-transparent transition-all"
                  placeholder="admin@suthiskabloom.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#EB7297] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full justify-center gap-2 bg-[#EB7297] hover:bg-[#d4607f] text-white shadow-lg shadow-[#EB7297]/20 border-none">
              Sign In to Admin Panel <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-white/40">
            Authorized Personnel Only • Encrypted Portal Session
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center"><div className="w-10 h-10 border-4 border-white/20 border-t-[#EB7297] rounded-full animate-spin" /></div>}>
      <AdminLoginContent />
    </Suspense>
  );
}
