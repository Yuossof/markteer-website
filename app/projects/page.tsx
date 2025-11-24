/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import { ExternalLink, Github, Eye, ArrowUpRight } from 'lucide-react';

const ProjectsPage = () => {
    const [filter, setFilter] = useState('all');
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Modern e-commerce solution with advanced features",
            category: "web",
            image: "https://images.unsplash.com/photo-1661288378434-a69c00b39830?w=600&h=400&fit=crop",
            gradient: "from-purple-500 via-pink-500 to-red-500",
            tech: ["React", "Node.js"],
            color: "#a855f7"
        },
        {
            id: 2,
            title: "Mobile Banking App",
            description: "Secure mobile banking with biometric auth",
            category: "mobile",
            image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
            gradient: "from-blue-500 via-purple-500 to-pink-500",
            tech: ["React Native", "Firebase"],
            color: "#3b82f6"
        },
        {
            id: 3,
            title: "AI Dashboard",
            description: "AI-powered analytics dashboard",
            category: "web",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            gradient: "from-green-500 via-blue-500 to-purple-500",
            tech: ["Vue.js", "Python"],
            color: "#10b981"
        },
        {
            id: 4,
            title: "Brand Identity Design",
            description: "Complete brand identity package",
            category: "design",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
            gradient: "from-yellow-500 via-orange-500 to-red-500",
            tech: ["Figma", "Illustrator"],
            color: "#f59e0b"
        },
        {
            id: 5,
            title: "Task Management Tool",
            description: "Collaborative task management app",
            category: "web",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
            gradient: "from-cyan-500 via-blue-500 to-purple-500",
            tech: ["Angular", "Express"],
            color: "#06b6d4"
        },
        {
            id: 6,
            title: "Restaurant Menu App",
            description: "Digital menu with QR integration",
            category: "mobile",
            image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop",
            gradient: "from-lime-500 via-green-500 to-blue-500",
            tech: ["Flutter", "Dart"],
            color: "#84cc16"
        },
        {
            id: 7,
            title: "Social Media Campaign",
            description: "Complete social media marketing",
            category: "design",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
            gradient: "from-pink-500 via-purple-500 to-indigo-500",
            tech: ["After Effects", "Premiere"],
            color: "#ec4899"
        },
        {
            id: 8,
            title: "Fitness Tracking App",
            description: "Comprehensive fitness tracking",
            category: "mobile",
            image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=300&fit=crop",
            gradient: "from-orange-500 via-red-500 to-pink-500",
            tech: ["Swift", "CoreData"],
            color: "#f97316"
        }
    ];

    const categories = [
        { id: 'all', label: 'All Projects', count: projects.length },
        { id: 'web', label: 'Web Development', count: projects.filter(p => p.category === 'web').length },
        { id: 'mobile', label: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
        { id: 'design', label: 'Design', count: projects.filter(p => p.category === 'design').length }
    ];

    const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
                <div
                    className="absolute top-0 left-0 w-full h-full opacity-10"
                    style={{
                        background: `
              radial-gradient(ellipse 800px 600px at top left, 
                #a855f7 0%, 
                #ec4899 50%, 
                transparent 100%
              )
            `
                    }}
                ></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                        OUR PROJECTS
                    </h1>
                    <div className="w-24 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Explore our portfolio of innovative projects that showcase our expertise
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.id)}
                            className="relative group"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                            }}
                        >
                            <div className={`absolute inset-0 ${filter === category.id
                                    ? 'bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500'
                                    : 'bg-gray-800'
                                }`}></div>

                            <div className="relative px-6 py-3 bg-gray-950 m-px font-semibold flex items-center gap-2"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))'
                                }}
                            >
                                <span className={`transition-colors ${filter === category.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                                    }`}>
                                    {category.label}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${filter === category.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-800 text-gray-500'
                                    }`}>
                                    {category.count}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative ${index === 0 || index === 3 ? 'lg:col-span-2 lg:row-span-1' : ''
                                }`}
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                            }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div
                                className={`absolute inset-0 bg-linear-to-br transition-all duration-300 ${project.gradient} ${hoveredId === project.id ? 'p-0.5' : 'p-px'
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
                                ></div>
                            </div>

                            <div className="relative z-10 h-full">
                                <div className={`relative overflow-hidden ${index === 0 || index === 3 ? 'h-48' : 'h-40'
                                    }`}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-transform duration-500 ${hoveredId === project.id ? 'scale-105' : 'scale-100'
                                            }`}
                                    />

                                    <div className={`absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-80' : 'opacity-60'
                                        }`}></div>

                                    <div className="absolute top-3 right-3 z-20">
                                        <div
                                            className="px-2 py-1 rounded text-xs font-semibold text-white uppercase"
                                            style={{
                                                background: `${project.color}40`,
                                                border: `1px solid ${project.color}60`
                                            }}
                                        >
                                            {project.category}
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        {[Eye, ExternalLink, Github].map((Icon, i) => (
                                            <button
                                                key={i}
                                                className="w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                                                style={{
                                                    background: `${project.color}50`,
                                                    border: `1px solid ${project.color}70`
                                                }}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {project.tech.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-2 py-0.5 text-xs rounded font-medium transition-colors"
                                                style={{
                                                    background: hoveredId === project.id ? `${project.color}20` : '#1e293b',
                                                    color: hoveredId === project.id ? '#fff' : '#94a3b8'
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-1">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-3">
                                        {project.description}
                                    </p>

                                    <button
                                        className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${hoveredId === project.id ? 'translate-x-1' : ''
                                            }`}
                                        style={{
                                            color: hoveredId === project.id ? project.color : '#6b7280'
                                        }}
                                    >
                                        <span>View Details</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button
                        className="relative inline-flex items-center px-10 py-4 font-semibold text-white group"
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                            }}
                        ></div>

                        <div
                            className="absolute inset-0 bg-gray-950 m-px group-hover:bg-gray-900 transition-colors"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))'
                            }}
                        ></div>

                        <span className="relative flex items-center gap-2">
                            View More Projects
                            <ExternalLink className="w-5 h-5" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;