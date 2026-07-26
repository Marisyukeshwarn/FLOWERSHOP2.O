"use client";

import React, { useState, useEffect, useRef } from "react";
import { Trash2, Upload, MessageSquareQuote, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Testimonial {
  id: string;
  name: string;
  event: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then(r => r.json())
      .then(data => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          event,
          location,
          rating,
          text,
          avatar: avatarPreview,
        }),
      });
      const newTestimonial = await res.json();
      setTestimonials(prev => [newTestimonial, ...prev]);
      
      // Reset form
      setName("");
      setEvent("");
      setLocation("");
      setRating(5);
      setText("");
      setAvatarPreview(null);
      setIsModalOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1A1A2E] flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-[#EB7297]" />
            Testimonials Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Testimonials added here will appear in the "Loved by Thousands" section on the homepage. If empty, the section is hidden.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-lg shadow-[#EB7297]/20">
          <Upload className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-6 h-6 animate-spin text-[#EB7297]" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <MessageSquareQuote className="w-14 h-14 text-gray-200" />
            <p className="text-gray-400 text-sm">No testimonials yet. Click "Add Testimonial" to create your first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex text-[#EB7297] mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < t.rating ? "fill-current text-[#EB7297]" : "text-gray-300"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-6 line-clamp-4">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{t.name}</p>
                    <p className="text-xs text-gray-500 truncate">{t.event} • {t.location}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(t.id)}
                  className="absolute top-4 right-4 p-2 bg-white text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors border border-gray-100 shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-serif font-bold text-gray-900">Add Testimonial</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Client Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Anjali Menon" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm" />
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Location</label>
                  <input type="text" required value={location} onChange={e => setLocation(e.target.value)} placeholder="Tirupur" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Event Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Event/Product Type</label>
                  <input type="text" required value={event} onChange={e => setEvent(e.target.value)} placeholder="Temple Garland" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm" />
                </div>
                
                {/* Rating */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Rating (1-5)</label>
                  <input type="number" min="1" max="5" required value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm" />
                </div>
              </div>

              {/* Quote */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Quote / Review</label>
                <textarea required rows={4} value={text} onChange={e => setText(e.target.value)} placeholder="The floral arrangements were absolutely stunning..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm resize-none" />
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Client Photo (Optional)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer group border-2 border-dashed border-gray-200 hover:border-[#EB7297] rounded-xl p-4 transition-colors bg-gray-50 flex flex-col items-center justify-center gap-2"
                >
                  {avatarPreview ? (
                    <div className="flex items-center gap-4">
                      <img src={avatarPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover shadow-sm" />
                      <span className="text-xs text-[#EB7297] font-medium">Change photo</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Click to upload photo</p>
                      <p className="text-xs text-gray-400 mt-1">If empty, a default avatar is used.</p>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading} className="gap-2 shadow-lg shadow-[#EB7297]/20">
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "Saving..." : "Add Testimonial"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
