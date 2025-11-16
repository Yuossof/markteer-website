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

  const contactCards = [
    {
      icon: Phone,
      title: "Phone",
      content: "+2011 49811263",
      gradient: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: "Info@marketeereg.com",
      gradient: "from-blue-500 via-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Gamal Abdel Nasser, Industrial Area, Third New Cairo, Cairo Governorate, Egypt",
      gradient: "from-green-500 via-blue-500 to-purple-500"
    },
    {
      icon: Clock,
      title: "Customer Support",
      content: "+2011 49811263",
      gradient: "from-cyan-500 via-blue-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Color Gradient Splash - Top Left to Center */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-25"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at top left, 
                #ff0000 0%, 
                #ff8000 15%, 
                #ffff00 25%, 
                #80ff00 35%, 
                #00ff00 45%, 
                #00ff80 55%, 
                #00ffff 65%, 
                #0080ff 75%, 
                #0000ff 85%, 
                #8000ff 95%, 
                transparent 100%
              )
            `
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            CONTACT US
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We&apos;re here to help. Reach out to us anytime and let&apos;s start your digital transformation journey
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={index}
                className="group relative p-6 bg-gray-900 transition-all duration-300 hover:-translate-y-1"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                }}
              >
                {/* Thin Colorful Border */}
                <div 
                  className={`absolute inset-0 bg-linear-to-r ${card.gradient} p-[1px] group-hover:p-[2px] transition-all duration-300`}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                  }}
                >
                  <div 
                    className="h-full w-full bg-gray-950"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))'
                    }}
                  ></div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-800 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {card.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="relative mb-12">
          <div 
            className="relative p-8 md:p-12 bg-gray-950"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
            }}
          >
            {/* Thin Colorful Border */}
            <div 
              className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 p-[1px]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
              }}
            >
              <div 
                className="h-full w-full bg-gray-950"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))'
                }}
              ></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Get In Touch</h2>
              
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
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors duration-300"
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
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none"
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-10 py-4 bg-slate-900 border border-slate-800 text-white font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                    }}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative">
          <div 
            className="relative p-2 bg-gray-950"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
            }}
          >
            {/* Thin Map Border */}
            <div 
              className="absolute inset-0 bg-linear-to-r from-green-500 via-blue-500 to-purple-500 p-[1px]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
              }}
            >
              <div 
                className="h-full w-full bg-gray-950"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 19px) 0, 100% 19px, 100% 100%, 19px 100%, 0 calc(100% - 19px))'
                }}
              ></div>
            </div>
            
            <div className="relative z-10">
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
      </div>
    </div>
  );
};

export default ContactPage;