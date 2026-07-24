"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submission received:", data);
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F9] pb-20">
      {/* Header */}
      <div className="bg-[#FEF0F3] py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-[#93A186]/10">
        <motion.h1 
          className="font-serif text-4xl md:text-5xl text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-foreground/70 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Reach out for bookings, custom designs, and price details. Our design team is ready to assist you.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#93A186]/10"
          >
            <h2 className="font-serif text-3xl text-foreground mb-8">Send an Enquiry</h2>
            
            {isSubmitted ? (
              <div className="bg-[#93A186]/10 text-foreground border border-[#93A186]/20 p-6 rounded-xl flex items-start">
                <span className="w-8 h-8 bg-[#93A186] text-white rounded-full flex items-center justify-center mr-4 shrink-0">
                  ✓
                </span>
                <div>
                  <h4 className="font-medium mb-1">Thank you for reaching out!</h4>
                  <p className="text-sm opacity-80">Our team will get back to you with price details and availability shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <input id="name" name="name" required type="text" className="w-full bg-[#FEF0F3] border border-[#93A186]/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#93A186] focus:border-transparent transition-all" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                    <input id="phone" name="phone" required type="tel" className="w-full bg-[#FEF0F3] border border-[#93A186]/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#93A186] focus:border-transparent transition-all" placeholder="Your phone number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-sm font-medium text-foreground">Event Type</label>
                  <select id="eventType" name="eventType" className="w-full bg-[#FEF0F3] border border-[#93A186]/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#93A186] focus:border-transparent transition-all text-foreground/80">
                    <option value="Wedding">Wedding</option>
                    <option value="Temple Ceremony">Temple Ceremony</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Other Custom Request">Other Custom Request</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message / Details</label>
                  <textarea id="message" name="message" required rows={5} className="w-full bg-[#FEF0F3] border border-[#93A186]/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#93A186] focus:border-transparent transition-all resize-none" placeholder="Tell us about the floral designs you are looking for..." />
                </div>
                <Button type="submit" size="lg" className="w-full flex items-center justify-center">
                  Send Enquiry <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-10"
          >
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start bg-white p-6 rounded-2xl border border-[#93A186]/10">
                  <Phone className="w-6 h-6 text-[#93A186] mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Phone & WhatsApp</h4>
                    <p className="text-foreground/70 font-light">+91 9843166477</p>
                    <p className="text-sm text-[#93A186] mt-1">Available 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-6 rounded-2xl border border-[#93A186]/10">
                  <Mail className="w-6 h-6 text-[#93A186] mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Email</h4>
                    <p className="text-foreground/70 font-light">hello@suthiskabloom.com</p>
                  </div>
                </div>

                <div className="flex items-start bg-white p-6 rounded-2xl border border-[#93A186]/10">
                  <MapPin className="w-6 h-6 text-[#93A186] mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Studio Address</h4>
                    <p className="text-foreground/70 font-light leading-relaxed">
                      123 Floral Avenue, Premium Layout<br />
                      Coimbatore, Tamil Nadu 641001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="flex-1 min-h-[300px] bg-[#93A186]/20 rounded-3xl overflow-hidden relative border border-[#93A186]/30 flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="w-10 h-10 text-[#93A186] mx-auto mb-3 opacity-50" />
                <p className="text-foreground/60 text-sm">Google Maps Integration</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
