"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "About US", href: "/about-us" },
  { name: "Services", href: "/" },
  { name: "Our Clients", href: "/" },
  { name: "Contact US", href: "/contact-us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-header-background h-[75px] shadow-slate-700/15 shadow-lg px-7 flex items-center justify-between">
        
        {/* Logo */}
        <Link href={"/"}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight transition-all duration-300">
            <span className="text-[#E6F6FE]">Market</span>
            <span className="text-[#25B4F8]">ee</span>
            <span className="text-[#1376F8]">r</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              className="font-sans text-md hover:text-[#25B4F8] transition"
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Animated Dropdown */}
      <div
        className={`
          md:hidden bg-header-background px-7 shadow-lg overflow-hidden transition-all duration-300
          ${open ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
        `}
      >
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              className="font-sans text-lg py-2 border-b border-white/10 hover:text-[#25B4F8] transition"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
