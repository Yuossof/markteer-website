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
      {/* Organic Color Flow from Top-Left */}
      <div className="absolute inset-0">
        {/* Primary Red-Orange Organic Blob */}
        <div
          className="absolute opacity-45"
          style={{
            top: '-8%',
            left: '-12%',
            width: '55%',
            height: '50%',
            background: `radial-gradient(ellipse 180% 120% at 40% 60%, #ff0000 0%, #ff3300 25%, #ff6600 55%, transparent 100%)`,
            filter: 'blur(60px)',
            transform: 'rotate(-18deg)',
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
          }}
        ></div>

        {/* Flowing Magenta Blob */}
        <div
          className="absolute opacity-48"
          style={{
            top: '8%',
            left: '18%',
            width: '42%',
            height: '38%',
            background: `radial-gradient(ellipse 150% 200% at 30% 70%, #ff00ff 0%, #ff1493 35%, #ff69b4 70%, transparent 100%)`,
            filter: 'blur(45px)',
            transform: 'rotate(22deg)',
            borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%',
            clipPath: 'polygon(20% 0%, 80% 20%, 100% 60%, 75% 100%, 25% 80%, 0% 40%)',
          }}
        ></div>

        {/* Electric Blue Organic Shape */}
        <div
          className="absolute opacity-44"
          style={{
            top: '22%',
            left: '32%',
            width: '38%',
            height: '42%',
            background: `radial-gradient(ellipse 220% 140% at 60% 40%, #0066ff 0%, #0080ff 30%, #00aaff 65%, transparent 100%)`,
            filter: 'blur(50px)',
            transform: 'rotate(-12deg)',
            borderRadius: '73% 27% 44% 56% / 49% 65% 35% 51%',
            clipPath: 'ellipse(75% 85% at 45% 55%)',
          }}
        ></div>

        {/* Purple Liquid Drop */}
        <div
          className="absolute opacity-42"
          style={{
            top: '35%',
            left: '48%',
            width: '32%',
            height: '45%',
            background: `radial-gradient(ellipse 160% 180% at 25% 75%, #8000ff 0%, #9933ff 40%, #aa55ff 75%, transparent 100%)`,
            filter: 'blur(38px)',
            transform: 'rotate(28deg)',
            borderRadius: '31% 69% 70% 30% / 32% 40% 60% 68%',
            clipPath: 'polygon(30% 0%, 100% 20%, 70% 100%, 0% 80%)',
          }}
        ></div>

        {/* Cyan Splash */}
        <div
          className="absolute opacity-46"
          style={{
            top: '28%',
            left: '15%',
            width: '48%',
            height: '35%',
            background: `radial-gradient(ellipse 190% 110% at 70% 30%, #00ffff 0%, #00dddd 40%, #00bbbb 80%, transparent 100%)`,
            filter: 'blur(55px)',
            transform: 'rotate(-25deg)',
            borderRadius: '64% 36% 47% 53% / 68% 29% 71% 32%',
            clipPath: 'polygon(15% 10%, 85% 0%, 100% 70%, 60% 100%, 0% 90%, 10% 50%)',
          }}
        ></div>

        {/* Green Organic Flow */}
        <div
          className="absolute opacity-40"
          style={{
            top: '52%',
            left: '38%',
            width: '35%',
            height: '32%',
            background: `radial-gradient(ellipse 140% 160% at 50% 20%, #00ff00 0%, #33ff33 35%, #66ff66 70%, transparent 100%)`,
            filter: 'blur(42px)',
            transform: 'rotate(35deg)',
            borderRadius: '47% 53% 36% 64% / 39% 58% 42% 61%',
            clipPath: 'circle(65% at 40% 60%)',
          }}
        ></div>

        {/* Yellow Energy Burst */}
        <div
          className="absolute opacity-43"
          style={{
            top: '58%',
            left: '52%',
            width: '28%',
            height: '25%',
            background: `radial-gradient(circle at 60% 40%, #ffff00 0%, #ffcc00 60%, transparent 100%)`,
            filter: 'blur(35px)',
            transform: 'rotate(-42deg)',
            borderRadius: '68% 32% 48% 52% / 42% 71% 29% 58%',
            clipPath: 'polygon(40% 0%, 100% 30%, 80% 100%, 20% 70%)',
          }}
        ></div>

        {/* Pink Flowing Stream */}
        <div
          className="absolute opacity-41"
          style={{
            top: '12%',
            left: '8%',
            width: '52%',
            height: '40%',
            background: `radial-gradient(ellipse 170% 130% at 80% 20%, #ff1493 0%, #ff69b4 45%, transparent 80%)`,
            filter: 'blur(65px)',
            transform: 'rotate(8deg)',
            borderRadius: '42% 58% 61% 39% / 67% 33% 67% 33%',
            clipPath: 'polygon(0% 20%, 75% 0%, 100% 50%, 80% 100%, 20% 80%, 0% 60%)',
          }}
        ></div>

        {/* Orange Organic Splash */}
        <div
          className="absolute opacity-47"
          style={{
            top: '18%',
            left: '5%',
            width: '46%',
            height: '42%',
            background: `radial-gradient(ellipse 200% 150% at 30% 80%, #ff4500 0%, #ff6347 30%, #ff8c00 65%, transparent 100%)`,
            filter: 'blur(52px)',
            transform: 'rotate(-15deg)',
            borderRadius: '59% 41% 37% 63% / 28% 49% 51% 72%',
            clipPath: 'polygon(20% 0%, 90% 15%, 100% 85%, 60% 100%, 10% 75%, 0% 25%)',
          }}
        ></div>

        {/* Additional Organic Accent */}
        <div
          className="absolute opacity-39"
          style={{
            top: '45%',
            left: '25%',
            width: '40%',
            height: '30%',
            background: `radial-gradient(ellipse 120% 180% at 70% 50%, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 80%, transparent 100%)`,
            filter: 'blur(48px)',
            transform: 'rotate(18deg)',
            borderRadius: '51% 49% 72% 28% / 44% 67% 33% 56%',
            clipPath: 'ellipse(80% 70% at 30% 70%)',
          }}
        ></div>

        {/* Soft overlay for contrast */}
        <div className="absolute inset-0 bg-slate-950 opacity-25"></div>
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
                  className={`absolute inset-0 bg-linear-to-r ${card.gradient} p-px group-hover:p-0.5 transition-all duration-300`}
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
              className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 p-px"
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
                    className="inline-flex cursor-pointer items-center px-10 py-4 bg-slate-900 border border-slate-800 text-white font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg"
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
              className="absolute inset-0 bg-linear-to-r from-green-500 via-blue-500 to-purple-500 p-px"
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