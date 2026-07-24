"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Lock, Save, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const { state, dispatch } = useAuth();
  
  const [formData, setFormData] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
    phone: state.user?.phone || "+91 ",
    currentPassword: "",
    newPassword: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.user) {
      dispatch({
        type: "LOGIN",
        payload: {
          ...state.user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A2E]">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your personal information and security preferences</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Profile Section */}
          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#EB7297]" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="phone">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Security Section */}
          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#EB7297]" /> Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#93A186]" /> Your data is encrypted and securely stored.
            </p>
          </section>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-between">
            {isSaved ? (
              <span className="text-[#93A186] font-semibold text-sm flex items-center gap-2">
                ✓ Settings saved successfully
              </span>
            ) : (
              <div />
            )}
            <Button type="submit" className="min-w-[120px]">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
