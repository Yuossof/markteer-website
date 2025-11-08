"use client"
// pages/contact.tsx
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-900/20 transform rotate-45"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/20 transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/10 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 text-lg">
            We&apos;re here to help. Reach out to us anytime
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone Card */}
          <div className="relative bg-gray-950 border border-gray-800 rounded-lg p-6 overflow-hidden hover:border-purple-800 transition-all duration-300 group">
            {/* Sharp shapes */}
            <div className="absolute -top-3 -right-3 w-0 h-0 
              border-l-40 border-l-transparent
              border-t-40 border-t-purple-800/50
              group-hover:border-t-purple-600/50 transition-colors"></div>
            <div className="absolute -bottom-3 -left-3 w-0 h-0 
              border-r-40 border-r-transparent
              border-b-40 border-b-purple-800/30
              group-hover:border-b-purple-600/30 transition-colors"></div>
            
            <div className="relative">
              <div className="bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Phone</h3>
              <p className="text-gray-500 text-sm">+2011 49811263</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="relative bg-gray-950 border border-gray-800 rounded-lg p-6 overflow-hidden hover:border-blue-800 transition-all duration-300 group">
            {/* Sharp shapes */}
            <div className="absolute -top-3 -right-3 w-0 h-0 
              border-l-40 border-l-transparent
              border-t-40 border-t-blue-800/50
              group-hover:border-t-blue-600/50 transition-colors"></div>
            <div className="absolute -bottom-3 -left-3 w-0 h-0 
              border-r-40 border-r-transparent
              border-b-40 border-b-blue-800/30
              group-hover:border-b-blue-600/30 transition-colors"></div>
            
            <div className="relative">
              <div className="bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-gray-500 text-sm break-all">Info@marketeereg.com</p>
            </div>
          </div>

          {/* Location Card */}
          <div className="relative bg-gray-950 border border-gray-800 rounded-lg p-6 overflow-hidden hover:border-pink-800 transition-all duration-300 group">
            {/* Sharp shapes */}
            <div className="absolute -top-3 -right-3 w-0 h-0 
              border-l-40 border-l-transparent
              border-t-40 border-t-pink-800/50
              group-hover:border-t-pink-600/50 transition-colors"></div>
            <div className="absolute -bottom-3 -left-3 w-0 h-0 
              border-r-40 border-r-transparent
              border-b-40 border-b-pink-800/30
              group-hover:border-b-pink-600/30 transition-colors"></div>
            
            <div className="relative">
              <div className="bg-pink-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <p className="text-gray-500 text-sm">Gamal Abdel Nasser, Industrial Area, Third New Cairo, Cairo Governorate, Cairo, Egypt</p>
            </div>
          </div>

          {/* Support Card */}
          <div className="relative bg-gray-950 border border-gray-800 rounded-lg p-6 overflow-hidden hover:border-green-800 transition-all duration-300 group">
            {/* Sharp shapes */}
            <div className="absolute -top-3 -right-3 w-0 h-0 
              border-l-40 border-l-transparent
              border-t-40 border-t-green-800/50
              group-hover:border-t-green-600/50 transition-colors"></div>
            <div className="absolute -bottom-3 -left-3 w-0 h-0 
              border-r-40 border-r-transparent
              border-b-40 border-b-green-800/30
              group-hover:border-b-green-600/30 transition-colors"></div>
            
            <div className="relative">
              <div className="bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-500 text-sm">+2011 49811263</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative bg-gray-950 border border-gray-800 rounded-xl p-8 md:p-12 overflow-hidden">
          {/* Sharp decorative shapes */}
          <div className="absolute -top-6 -right-6 w-0 h-0 
            border-l-80 border-l-transparent
            border-t-80 border-t-purple-900/20"></div>
          <div className="absolute -bottom-6 -left-6 w-0 h-0 
            border-r-80 border-r-transparent
            border-b-80 border-b-blue-900/20"></div>
          
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Get In Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors"
                    placeholder="+20 123 456 7890"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors"
                    placeholder="Message subject"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors resize-none"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-3 bg-linear-to-r from-purple-700 to-blue-700 text-white font-semibold rounded-lg hover:from-purple-800 hover:to-blue-800 transform cursor-pointer transition-all duration-300 shadow-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="mt-12 relative bg-gray-950 border border-gray-800 rounded-xl p-2 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-0 h-0 
            border-l-60 border-l-transparent
            border-t-60 border-t-purple-900/20"></div>
          <div className="absolute -bottom-4 -left-4 w-0 h-0 
            border-r-60 border-r-transparent
            border-b-60 border-b-blue-900/20"></div>
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8976737702924!2d31.497!3d30.0667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA0JzAwLjEiTiAzMcKwMjknNDkuMiJF!5e0!3m2!1sen!2seg!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;