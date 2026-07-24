"use client";

import React, { useState } from "react";
import { Save, Store, Shield, Bell, Database } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1A1A2E]">Store Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your Bloom Studio defaults, notifications, and database preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Profile */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-3">
            <Store className="w-5 h-5 text-[#EB7297]" /> General Store Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Store Name</label>
              <input type="text" defaultValue="SUTHISKA Bloom Studio" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Support Email</label>
              <input type="email" defaultValue="support@suthiska.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
          </div>
        </div>

        {/* Database & Render Configuration */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-3">
            <Database className="w-5 h-5 text-[#EB7297]" /> Database & Cloud Setup
          </h2>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">PostgreSQL Provider Status</label>
            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" /> Ready for Render & PostgreSQL Database Sync
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          {saved && <span className="text-sm font-medium text-green-600">✓ Settings saved successfully!</span>}
          <Button type="submit" className="ml-auto gap-2 shadow-lg shadow-[#EB7297]/20">
            <Save className="w-4 h-4" /> Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
