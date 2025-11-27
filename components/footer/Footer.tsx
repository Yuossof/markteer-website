"use client"
import React from 'react';
import Link from 'next/link';
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Youtube,
    Mail, 
    Phone, 
    MapPin, 
    Send,
    ArrowUpRight,
    Clock,
    ArrowUp
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' }
    ];

    const services = [
        { name: 'Social Media Marketing', href: '/services/social-media' },
        { name: 'Web Development', href: '/services/web-development' },
        { name: 'Mobile Apps', href: '/services/mobile-apps' },
        { name: 'Brand Identity', href: '/services/branding' },
        { name: 'Media Production', href: '/services/media-production' },
        { name: 'Event Planning', href: '/services/events' }
    ];

    const socialLinks = [
        { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' }
    ];

    return (
        <footer className="relative bg-slate-950 pt-20 pb-8 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Your Brand
                                </span>
                            </h2>
                            <p className="text-gray-400 text-sm mt-4">
                                Transforming ideas into digital reality. We craft exceptional experiences that drive growth and innovation.
                            </p>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex space-x-3">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 group"
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center group"
                                    >
                                        <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Our Services</h3>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link 
                                        href={service.href}
                                        className="text-gray-400 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                                    >
                                        <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {service.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Get in Touch</h3>
                        
                        {/* Contact Info */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3 text-gray-400">
                                <MapPin className="w-5 h-5 mt-1 text-purple-400" />
                                <span className="text-sm">123 Business Ave, Tech City, TC 12345</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <Phone className="w-5 h-5 text-purple-400" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <Mail className="w-5 h-5 text-purple-400" />
                                <span className="text-sm">hello@yourbrand.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <Clock className="w-5 h-5 text-purple-400" />
                                <span className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-white font-medium mb-3">Newsletter</h4>
                            <form className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-md flex items-center justify-center hover:scale-110 transition-transform duration-300"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
                    <div className="text-gray-400 text-sm text-center md:text-left">
                        © {currentYear} Your Brand. All rights reserved.
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors">
                            Cookie Policy
                        </Link>
                        <Link href="/sitemap" className="text-gray-400 hover:text-purple-400 transition-colors">
                            Sitemap
                        </Link>
                    </div>
                </div>

                {/* Scroll to Top Button */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-linear-to-r cursor-pointer from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 z-50"
                    aria-label="Scroll to top"
                >
                    <ArrowUp  className="w-6 h-6" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;