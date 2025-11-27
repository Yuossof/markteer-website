/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const ProjectsPage = () => {
    const [filter, setFilter] = useState('all');
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: "Complete Brand Identity Development",
            category: "branding",
            client: "Tech Innovation Corp",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
            services: ["Logo Design", "Brand Guidelines", "Print Materials"],
        },
        {
            id: 2,
            title: "Integrated Digital Marketing Campaign",
            category: "digital-marketing",
            client: "Success Business Group",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
            services: ["Social Media Management", "Paid Ads", "Content Writing"],
        },
        {
            id: 3,
            title: "E-Commerce Mobile Application",
            category: "web-mobile",
            client: "Elegance Store",
            image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop",
            services: ["iOS App", "Android App", "Admin Dashboard"],
        },
        {
            id: 4,
            title: "Comprehensive Marketing Strategy",
            category: "consultancy",
            client: "Investment Pioneer Company",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
            services: ["Market Analysis", "Marketing Plan", "Specialized Consulting"],
        },
        {
            id: 5,
            title: "Professional Promotional Video Production",
            category: "media-production",
            client: "Horizon Foundation",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
            services: ["Script Writing", "Filming", "Editing"],
        },
        {
            id: 6,
            title: "International Trade Exhibition Organization",
            category: "events",
            client: "International Exhibition Center",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
            services: ["Planning", "Management", "Coordination"],
        },
        {
            id: 7,
            title: "Product Launch Event Media Coverage",
            category: "photography",
            client: "Advanced Technology Company",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
            services: ["Photography", "Videography", "Live Streaming"],
        },
        {
            id: 8,
            title: "Interactive Website Development",
            category: "web-mobile",
            client: "Financial Services Company",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
            services: ["UI/UX Design", "Frontend Development", "Backend Development"],
        },
        {
            id: 9,
            title: "Social Media Advertising Campaign",
            category: "digital-marketing",
            client: "Modern Fashion Brand",
            image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
            services: ["Ad Management", "Content Creation", "Performance Analysis"],
        },
        {
            id: 10,
            title: "Promotional Materials Design & Print",
            category: "branding",
            client: "Specialized Medical Complex",
            image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&h=600&fit=crop",
            services: ["Brochures", "Banners", "Promotional Gifts"],
        },
        {
            id: 11,
            title: "Annual Conference Organization",
            category: "events",
            client: "Professionals Association",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
            services: ["Full Planning", "Guest Management", "Live Broadcasting"],
        },
        {
            id: 12,
            title: "Business Development Consulting",
            category: "consultancy",
            client: "Tech Startup",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
            services: ["Feasibility Study", "Business Plan", "Growth Strategy"],
        }
    ];

    const categories = [
        { id: 'all', label: 'All Projects', count: projects.length },
        { id: 'branding', label: 'Branding', count: projects.filter(p => p.category === 'branding').length },
        { id: 'digital-marketing', label: 'Digital Marketing', count: projects.filter(p => p.category === 'digital-marketing').length },
        { id: 'web-mobile', label: 'Web & Mobile', count: projects.filter(p => p.category === 'web-mobile').length },
        { id: 'consultancy', label: 'Consultancy', count: projects.filter(p => p.category === 'consultancy').length },
        { id: 'media-production', label: 'Media Production', count: projects.filter(p => p.category === 'media-production').length },
        { id: 'events', label: 'Events', count: projects.filter(p => p.category === 'events').length },
        { id: 'photography', label: 'Photography', count: projects.filter(p => p.category === 'photography').length }
    ];

    const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-0 left-0 w-full h-full opacity-10"
                    style={{
                        background: `radial-gradient(ellipse 800px 600px at top left, #a855f7 0%, #ec4899 50%, transparent 100%)`
                    }}
                />
            </div>

            <div className="max-w-[1800px] mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400">PROJECTS</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Explore our portfolio of successful projects across various industries
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.id)}
                            className="relative group transition-all duration-300"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                            }}
                        >
                            <div className={`absolute inset-0 transition-all duration-300 ${
                                filter === category.id
                                    ? 'bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500'
                                    : 'bg-gray-800 group-hover:bg-gray-700'
                            }`} />

                            <div 
                                className="relative px-5 py-3 bg-gray-950 m-px font-semibold flex items-center gap-2"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))'
                                }}
                            >
                                <span className={`transition-colors text-sm ${
                                    filter === category.id 
                                        ? 'text-white' 
                                        : 'text-gray-400 group-hover:text-gray-200'
                                }`}>
                                    {category.label}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full transition-all ${
                                    filter === category.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700'
                                }`}>
                                    {category.count}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProjects.map((project) => (
                        <Link
                        href={`/projects/${project.id}`}
                            key={project.id}
                            className="group relative h-[400px] cursor-pointer"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                            }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Border */}
                            <div
                                className={`absolute inset-0 bg-linear-to-br from-purple-500 via-pink-500 to-cyan-500 transition-all duration-500 ${
                                    hoveredId === project.id ? 'p-1' : 'p-px'
                                }`}
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                                }}
                            >
                                <div
                                    className="h-full w-full bg-gray-950"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))'
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full overflow-hidden">
                                <div className="relative h-full">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${
                                            hoveredId === project.id ? 'scale-110' : 'scale-100'
                                        }`}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
                                        hoveredId === project.id ? 'opacity-95' : 'opacity-80'
                                    }`} />

                                    {/* Project Information */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        {/* Client Name */}
                                        <div className="mb-2">
                                            <span className="text-xs text-gray-400 font-medium">
                                                {project.client}
                                            </span>
                                        </div>

                                        {/* Project Title */}
                                        <h3 className="text-xl font-black text-white mb-3 tracking-tight">
                                            {project.title}
                                        </h3>

                                        {/* Services Tags */}
                                        <div className={`flex flex-wrap gap-2 transition-all duration-500 ${
                                            hoveredId === project.id ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
                                        }`}>
                                            {project.services.map((service, serviceIndex) => (
                                                <span
                                                    key={serviceIndex}
                                                    className="px-3 py-1 text-xs rounded-full font-semibold backdrop-blur-md bg-purple-500/30 text-white border border-purple-500/50"
                                                >
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;