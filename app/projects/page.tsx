/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Eye, Calendar, Award, TrendingUp } from 'lucide-react';

const ProjectsPage = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: "Complete Brand Identity Development",
            category: "Branding",
            client: "Tech Innovation Corp",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
            description: "Complete rebranding including logo design, brand guidelines, and marketing materials for a leading tech company.",
            result: "+150% Brand Recognition",
            year: "2024",
            featured: true
        },
        {
            id: 2,
            title: "Integrated Digital Marketing Campaign",
            category: "Digital Marketing",
            client: "Success Business Group",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop",
            description: "360° digital marketing strategy that increased online presence and generated qualified leads.",
            result: "3x ROI Achieved",
            year: "2024",
            featured: false
        },
        {
            id: 3,
            title: "E-Commerce Mobile Application",
            category: "Web & Mobile",
            client: "Elegance Store",
            image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=800&fit=crop",
            description: "Full-stack mobile commerce solution with seamless user experience across iOS and Android platforms.",
            result: "$2M+ Sales Generated",
            year: "2024",
            featured: true
        },
        {
            id: 4,
            title: "Comprehensive Marketing Strategy",
            category: "Consultancy",
            client: "Investment Pioneer Company",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
            description: "Strategic marketing consultation resulting in market expansion and increased revenue.",
            result: "45% Growth Rate",
            year: "2023",
            featured: false
        },
        {
            id: 5,
            title: "Professional Video Production",
            category: "Media Production",
            client: "Horizon Foundation",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop",
            description: "High-impact promotional video campaign that captured brand essence and engaged audiences.",
            result: "1M+ Views",
            year: "2023",
            featured: false
        },
        {
            id: 6,
            title: "International Trade Exhibition",
            category: "Events",
            client: "Exhibition Center",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
            description: "Complete event management for international trade show with 500+ attendees.",
            result: "500+ Attendees",
            year: "2023",
            featured: true
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Simple Background */}
            <div className="absolute inset-0">
                <div className="absolute top-40 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Our <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Every project tells a story of transformation and success
                        </p>
                    </div>

                    {/* Featured Project - Full Width */}
                    {projects.filter(p => p.featured)[0] && (
                        <Link 
                            href={`/projects/${projects[0].id}`}
                            className="group block mb-16"
                            onMouseEnter={() => setHoveredId(projects[0].id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div 
                                className="relative h-[600px] overflow-hidden bg-slate-900"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                                }}
                            >
                                {/* Featured Badge */}
                                <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                    }}
                                >
                                    <Award className="w-4 h-4 text-white mr-2" />
                                    <span className="text-white text-sm font-medium">Featured Project</span>
                                </div>

                                <img
                                    src={projects[0].image}
                                    alt={projects[0].title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent"></div>
                                
                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 p-12 max-w-3xl">
                                    <div className="mb-4">
                                        <span className="text-purple-400 font-medium">{projects[0].category}</span>
                                        <span className="text-gray-500 mx-3">•</span>
                                        <span className="text-gray-400">{projects[0].client}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform">
                                        {projects[0].title}
                                    </h2>
                                    <p className="text-gray-300 text-lg mb-6">
                                        {projects[0].description}
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <div className="px-4 py-2 bg-green-500/10 border border-green-500/30"
                                            style={{
                                                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                                            }}
                                        >
                                            <span className="text-green-400 font-semibold">{projects[0].result}</span>
                                        </div>
                                        <span className="text-gray-500">{projects[0].year}</span>
                                    </div>
                                </div>

                                {/* View Project Button */}
                                <div className="absolute bottom-12 right-12 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                                    }}
                                >
                                    <ArrowUpRight className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Regular Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {projects.slice(1).map((project, index) => (
                            <Link
                                href={`/projects/${project.id}`}
                                key={project.id}
                                className="group"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div 
                                    className="relative h-[450px] overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all duration-300"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative h-3/5 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur text-xs text-gray-300"
                                            style={{
                                                clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))'
                                            }}
                                        >
                                            {project.category}
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className={`absolute inset-0 bg-purple-600/80 flex items-center justify-center transition-opacity duration-300 ${
                                            hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                            <Eye className="w-10 h-10 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 h-2/5 flex flex-col justify-between">
                                        <div>
                                            <div className="text-sm text-purple-400 mb-2">{project.client}</div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <span className="text-green-400 text-sm font-semibold">{project.result}</span>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {project.year}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="absolute bottom-6 right-6 w-10 h-10 bg-purple-600/20 border border-purple-600/50 flex items-center justify-center group-hover:bg-purple-600 transition-all"
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                                        }}
                                    >
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Alternative Layout - Timeline Style for Some Projects */}
                    <div className="mb-32">
                        <h2 className="text-3xl font-bold text-white text-center mb-12">More Success Stories</h2>
                        
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-600 to-pink-600"></div>
                            
                            {projects.slice(3, 6).map((project, index) => (
                                <Link 
                                    href={`/projects/${project.id}`}
                                    key={project.id}
                                    className={`flex items-center mb-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                >
                                    <div className="flex-1">
                                        <div
                                            className="bg-slate-900/50 backdrop-blur border border-slate-800 p-8 hover:border-purple-500/50 transition-all group"
                                            style={{
                                                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-purple-400 text-sm font-medium">{project.category}</span>
                                                <span className="text-gray-500 text-sm">{project.year}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 mb-4">{project.client}</p>
                                            <p className="text-gray-300 mb-4">{project.description}</p>
                                            <div className="inline-flex items-center text-green-400 font-semibold">
                                                <TrendingUp className="w-5 h-5 mr-2" />
                                                {project.result}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Timeline Dot */}
                                    <div className="hidden lg:flex w-16 justify-center">
                                        <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                                    </div>
                                    
                                    <div className="flex-1 hidden lg:block"></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-slate-900/30 backdrop-blur p-16"
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                        }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Let's Create Your Success Story
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join our growing list of satisfied clients and transform your business with our expertise
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all group"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                                }}
                            >
                                Start Your Project
                                <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center px-10 py-4 bg-slate-800 text-white font-semibold border border-slate-700 hover:bg-slate-700 transition-all"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                                }}
                            >
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;