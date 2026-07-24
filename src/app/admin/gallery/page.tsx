"use client";

import React, { useState, useEffect, useRef } from "react";
import { Trash2, Upload, Images, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then(r => r.json())
      .then(data => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return;
    setUploading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: preview, caption }),
      });
      const newImage = await res.json();
      setImages(prev => [newImage, ...prev]);
      setPreview(null);
      setCaption("");
      setIsModalOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image from the gallery?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1A1A2E] flex items-center gap-2">
            <Images className="w-6 h-6 text-[#EB7297]" />
            Gallery Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Images added here will appear in the homepage gallery section.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-lg shadow-[#EB7297]/20">
          <Upload className="w-4 h-4" /> Add Image
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-6 h-6 animate-spin text-[#EB7297]" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Images className="w-14 h-14 text-gray-200" />
            <p className="text-gray-400 text-sm">No gallery images yet. Click "Add Image" to upload your first photo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map(img => (
              <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                <img
                  src={img.url}
                  alt={img.caption || "Gallery image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                  {img.caption && (
                    <p className="text-white text-xs text-center font-medium leading-snug line-clamp-2">{img.caption}</p>
                  )}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-gray-900">Add Gallery Image</h2>
              <button
                onClick={() => { setIsModalOpen(false); setPreview(null); setCaption(""); }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer group border-2 border-dashed border-gray-200 hover:border-[#EB7297] rounded-xl p-4 transition-colors bg-gray-50 hover:bg-[#FEF0F3]/30 flex flex-col items-center justify-center gap-2 min-h-[140px]"
                >
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" className="w-28 h-28 rounded-xl object-cover shadow-md" />
                      <span className="text-xs text-[#EB7297] font-medium">Click to change</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#EB7297] transition-colors" />
                      <p className="text-sm font-medium text-gray-600">Click to upload</p>
                      <p className="text-xs text-gray-400">PNG, JPG, WEBP — any format</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  placeholder="e.g. Bridal rose garland for wedding"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => { setIsModalOpen(false); setPreview(null); setCaption(""); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!preview || uploading} className="gap-2 shadow-lg shadow-[#EB7297]/20">
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "Uploading..." : "Add to Gallery"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
