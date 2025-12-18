"use client"
import Image from 'next/image';
import React from 'react';
import { FaXTwitter, FaTiktok, FaInstagram, FaLinkedin, FaFacebook, FaYoutube, FaVimeo } from 'react-icons/fa6';

const Footer = () => {
    const socialLinks = [
        { icon: <FaXTwitter />, url: '#', label: 'Twitter' },
        { icon: <FaTiktok />, url: '#', label: 'TikTok' },
        { icon: <FaInstagram />, url: '#', label: 'Instagram' },
        { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' },
        { icon: <FaFacebook />, url: '#', label: 'Facebook' },
        { icon: <FaYoutube />, url: '#', label: 'YouTube' },
        { icon: <FaVimeo />, url: '#', label: 'Vimeo' },
    ];

    return (
        <footer className="bg-black text-white py-16 px-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Social Media Section */}
                <div>
                    <h3 className="text-[#CFFF00] text-2xl font-bold mb-8">
                        FOLLOW US
                    </h3>
                    <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                aria-label={social.label}
                                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Logo Section */}
                <div>
                  <Image src={"/logo/marketeer-logo.png"} width={200} height={100} alt='marketeer'/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;