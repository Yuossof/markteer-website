"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useAtomValue } from "jotai";
import { useAuth } from "@/lib/useAuth";
import { servicesAsyncAtom } from "@/services/servicesService";
import { TService } from "@/types/project_services";
import { usePathname } from "next/navigation";

const links: Array<{
  name: string;
  href?: string;
  menu?: Array<{ name: string; href: string }>;
}> = [
  { name: "Home", href: "/" },
  // { name: "About US", href: "/about-us" },
  {
    name: "Services", menu: [
      // { name: "Social Media & Digital Marketing", href: `/services/00` },
    ]
  },
  { name: "Works", href: "/works" },
  { name: "Spotlights", href: "/spotlights" },
  { name: "Careers", href: "/careers" },
  { name: "GET IN TOUCH", href: "/contact-us" },

];

const Navbar = () => {
  const servicesAtomData = useAtomValue(servicesAsyncAtom);
  const { user } = useAuth();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const navLinks = useMemo(() => {
    const services = servicesAtomData?.data || [];
    const servicesMenu = services.map((service: TService) => ({
      name: service.title,
      href: `/services/${service.id}`,
    }));

    return links.map((link) =>
      link.name === "Services"
        ? { ...link, menu: servicesMenu.length > 0 ? servicesMenu : link.menu }
        : link
    );
  }, [servicesAtomData]);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const isServicesActive = () => {
    return pathname?.startsWith("/services");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-header-background h-[75px] shadow-slate-700/15 shadow-lg px-7 flex items-center justify-between">

        <Link href={"/"} className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={"/logo/marketeer-logo.png"} className="w-60 h-35" alt="Marketeer" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.name}
                className={`font-sans text-md hover:italic-playfair hover:text-[#25B4F8] transition uppercase ${isActive(link.href) ? "text-[#25B4F8]" : ""}`}
                href={link.href}
              >
                {link.name}
              </Link>
            ) : (
              <div key={link.name} className="relative group cursor-pointer">
                <span className={`font-sans text-md hover:italic-playfair hover:text-[#25B4F8] transition flex items-center gap-1 uppercase ${isServicesActive() ? "text-[#25B4F8]" : ""}`}>
                  {link.name}
                  <ChevronDown size={16} />
                </span>

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
                    {link.menu?.map((item: { name: string; href: string }) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-1 uppercase text-gray-400 transition hover:scale-105 hover:italic-playfair text-sm hover:text-gray-200 ${isActive(item.href) ? "text-gray-200" : ""}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
          {user && (
            <Link
              className={`font-sans text-md hover:italic-playfair hover:text-[#25B4F8] transition uppercase ${isActive("/admin") ? "text-[#25B4F8]" : ""}`}
              href={"/admin"}
            >
              Admin
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

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
                className={`font-sans text-lg py-2 border-b border-white/10 hover:italic-playfair hover:text-[#25B4F8] transition ${isActive(link.href) ? "text-[#25B4F8]" : ""}`}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <div key={link.name}>
                <button
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                  className={`w-full flex justify-between items-center font-sans text-lg py-2 border-b border-white/10 hover:italic-playfair hover:text-[#25B4F8] transition ${isServicesActive() ? "text-[#25B4F8]" : ""}`}
                >
                  {link.name}
                  {submenuOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

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
                      className={`block py-2 text-base hover:italic-playfair hover:text-[#25B4F8] ${isActive(item.href) ? "text-[#25B4F8]" : ""}`}
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