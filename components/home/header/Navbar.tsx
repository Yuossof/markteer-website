"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { servicesNames } from "@/data/services-data";

const links = [
  { name: "Home", href: "/" },
  { name: "Works", href: "/works" },
  { name: "About US", href: "/about-us" },
  {
    name: "Services", menu: [
      { name: "Social Media & Digital Marketing", href: `/services/${servicesNames.socialMediaMarketing}` },
      { name: "Web & Mobile Development.", href: `/services/${servicesNames.webMobileDevelopment}` },
      { name: "Marketing Consultancy & Strategic Planning.", href: `/services/${servicesNames.marketingConsultancy}` },
      { name: "Media Production.", href: `/services/${servicesNames.mediaProduction}` },
      { name: "Branding Development.", href: `/services/${servicesNames.brandingDevelopment}` },
      { name: "Photography & Media Coverage.", href: `/services/${servicesNames.photographyMedia}` },
      { name: "Events Planning.", href: `/services/${servicesNames.eventsPlanning}` },
    ]
  },
  { name: "Contact US", href: "/contact-us" },
];

const Navbar = () => {
  
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-header-background h-[75px] shadow-slate-700/15 shadow-lg px-7 flex items-center justify-between">

        {/* Logo */}
        <Link href={"/"} className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={"/logo/marketeer-logo.png"} className="w-60 h-35" alt="Marketeer" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.href ? (
              <Link
                key={link.name}
                className="font-sans text-md hover:text-[#25B4F8] transition uppercase"
                href={link.href}
              >
                {link.name}
              </Link>
            ) : (
              <div key={link.name} className="relative group cursor-pointer">
                <span className="font-sans text-md hover:text-[#25B4F8] transition flex items-center gap-1 uppercase">
                  {link.name}
                  <ChevronDown size={16} />
                </span>

                {/* Desktop submenu */}
                <div
                  className="
    absolute -right-6 top-full mt-4 
    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
    transition-all
    w-max
    filter drop-shadow-[0_8px_20px_rgba(37,180,248,0.6)]
  "
                >
                  <div
                    className="
      bg-black backdrop-blur-2xl 
      px-2 py-2 w-max
    "
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% calc(100% - 35px), calc(100% - 35px) 100%, 0 100%)"
                    }}
                  >
                    {link.menu?.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-1 uppercase text-gray-400 transition hover:scale-105 text-sm hover:text-gray-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`
          md:hidden bg-header-background px-7 shadow-lg overflow-hidden transition-all duration-300
          ${open ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
        `}
      >
        <div className="flex flex-col gap-4">
          {links.map((link) =>
            link.href ? (
              <Link
                key={link.name}
                className="font-sans text-lg py-2 border-b border-white/10 hover:text-[#25B4F8] transition"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <div key={link.name}>
                <button
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                  className="w-full flex justify-between items-center font-sans text-lg py-2 border-b border-white/10 hover:text-[#25B4F8] transition"
                >
                  {link.name}
                  {submenuOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                {/* Mobile submenu */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300 pl-4
                    ${submenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  {link.menu?.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-base hover:text-[#25B4F8]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
