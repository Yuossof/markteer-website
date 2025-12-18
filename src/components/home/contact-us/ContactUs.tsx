/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState } from 'react'
import '../../../app/contact-us/contact-us.css'

import { TContact } from '@/types/contact'

const ContactUs = () => {
  return (
    <div className="min-h-screen w-full flex justify-center px-9 p-4 relative overflow-hidden  ">
      <div
        className="absolute inset-0 -z-1"
        style={{
          background: `
        radial-gradient(circle at 15% 20%, #39100E 0%, transparent 45%),
        radial-gradient(circle at 80% 15%, #131735 0%, transparent 40%),
        radial-gradient(circle at 70% 70%, #3C3449 0%, transparent 45%),
        radial-gradient(circle at 25% 75%, #3E3C18 0%, transparent 40%),
        radial-gradient(circle at 50% 40%, #1D1535 0%, transparent 50%)
      `
        }}
      />
      <div className="max-w-5xl">
        <div className="mb-6 flex flex-col items-center mt-16 gap-5">
          <h2 className="text-4xl font-bold mb-2">Let&apos;s talk</h2>
          <p className="text-gray-200 text-xl text-center font-medium">
            We're here to analyze data, unlock insights, build strategies, craft creative,
            manage media, and produce content that drives impact. Whether you're looking to
            start a new project, connect with our team, or learn more about what we do,
            we're just a message away.
          </p>
        </div>

        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactUs


function ContactUsForm() {
  const [selectedMarket, setSelectedMarket] = useState<string>("");
  const [formData, setFormData] = useState<Omit<TContact, 'id'>>({
    subject: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phoneNumber: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const markets = [
    "Saudi Arabia", "UAE", "Egypt", "Qatar", "Iraq",
    "Morocco", "Kuwait", "Oman", "Bahrain",
    "Yemen", "Jordan", "Lebanon", "Cross Regional", "Others"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedMarket) {
      setError("Please select a market");
      return;
    }
    
    if (!formData.subject || !formData.title || !formData.firstName || !formData.lastName || 
        !formData.email || !formData.company || !formData.phoneNumber || !formData.message) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        market: selectedMarket,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to submit form. Please try again.");
        return;
      }

      setSuccess("Thank you! Your message has been sent successfully.");
      // Reset form
      setFormData({
        subject: "",
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phoneNumber: "",
        message: "",
      });
      setSelectedMarket("");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-20 gap-20">
      {error && (
        <div className="md:col-span-2 p-4 bg-red-50/10 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="md:col-span-2 p-4 bg-green-50/10 border border-green-500 rounded-lg">
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Subject", name: "subject", type: "text" },
          { label: "Title", name: "title", type: "text" },
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Company", name: "company", type: "text" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" }
        ].map(({ label, name, type }) => (
          <div key={name} className={`${label === "Subject" ? "md:col-span-2" : ""}`}>
            <label className="block text-lg text-gray-500 mb-1 uppercase font-medium">
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof Omit<TContact, 'id'>]}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full bg-transparent px-0 py-2 gradient-input disabled:opacity-50"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            placeholder="Your Message"
            className="w-full bg-transparent px-0 py-2 resize-none gradient-input disabled:opacity-50"
          />
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-4xl border border-gray-400 text-lg cursor-pointer text-white hover:bg-amber-50 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>

      <div className="md:col-span-1">
        <label className="block text-lg text-gray-500 mb-4">
          Select Market <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {markets.map((market) => (
            <button
              key={market}
              type="button"
              onClick={() => {
                setSelectedMarket(market);
                setError("");
              }}
              disabled={isLoading}
              className={`
                border rounded-2xl px-3 py-1 text-sm transition cursor-pointer disabled:opacity-50
                hover:border-gray-200 focus:outline-none
                ${selectedMarket === market
                  ? 'border-gray-400 bg-amber-50 text-black'
                  : 'border-gray-400 text-gray-400'}
              `}
            >
              {market}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}