/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Calendar, User } from 'lucide-react';
import Link from 'next/link';

const ProjectDetailsPage = () => {
    const [selectedImage, setSelectedImage] = useState(0);

    const project = {
        id: 1,
        title: "E-Commerce Mobile Application",
        client: "Elegance Store",
        category: "Web & Mobile Development",
        date: "January 2024",
        description: "A comprehensive e-commerce mobile application designed to provide seamless shopping experience for users. The app features intuitive navigation, secure payment gateway, real-time inventory management, and personalized recommendations based on user preferences.",
        fullDescription: "This project involved creating a complete mobile commerce solution from scratch. We focused on delivering a user-centric design that makes shopping effortless and enjoyable. The application includes advanced features such as AI-powered product recommendations, augmented reality try-on for selected items, and a robust backend system for inventory management. The checkout process was optimized to reduce cart abandonment, resulting in a significant increase in conversion rates.",
        technologies: [
            "React Native",
            "Node.js",
            "MongoDB",
            "Express.js",
            "Redux",
            "Firebase",
            "Stripe API",
            "AWS S3"
        ],
        images: [
            "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop"
        ],
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/example"
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-0 right-0 w-full h-full opacity-10"
                    style={{
                        background: `radial-gradient(ellipse 800px 600px at top right, #a855f7 0%, #ec4899 50%, transparent 100%)`
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-full h-full opacity-10"
                    style={{
                        background: `radial-gradient(ellipse 600px 800px at bottom left, #06b6d4 0%, #3b82f6 50%, transparent 100%)`
                    }}
                />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="h-full w-full" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Back Button */}
                <Link 
                    href="/projects"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                    aria-label="Back to Projects"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Projects</span>
                </Link>

                {/* Project Header */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {project.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{project.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <User className="w-4 h-4" />
                            <span>{project.client}</span>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        {project.title}
                    </h1>
                    
                    <p className="text-xl text-gray-400 max-w-4xl leading-relaxed">
                        {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group"
                            aria-label="View Live Demo"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                            }}
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                                }}
                            />
                            <div
                                className="relative px-8 py-3 bg-gray-950 m-px group-hover:bg-gray-900 transition-colors flex items-center gap-2"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))'
                                }}
                            >
                                <span className="text-white font-semibold">View Live Demo</span>
                                <ExternalLink className="w-4 h-4 text-white" />
                            </div>
                        </a>

                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group"
                            aria-label="View on GitHub"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                            }}
                        >
                            <div className="absolute inset-0 bg-gray-800 group-hover:bg-gray-700 transition-colors"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                                }}
                            />
                            <div
                                className="relative px-8 py-3 bg-gray-950 m-px flex items-center gap-2"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))'
                                }}
                            >
                                <span className="text-gray-300 font-semibold">View on GitHub</span>
                                <Github className="w-4 h-4 text-gray-300" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Main Image */}
                <div className="mb-8">
                    <div
                        className="relative h-[400px] md:h-[600px] overflow-hidden group"
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 p-1"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                            }}
                        >
                            <div className="h-full w-full bg-gray-950"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 29px) 0, 100% 29px, 100% 100%, 29px 100%, 0 calc(100% - 29px))'
                                }}
                            >
                                <img
                                    src={project.images[selectedImage]}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {project.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative h-32 md:h-40 overflow-hidden transition-all duration-300 ${
                                selectedImage === index ? 'ring-2 ring-purple-500' : 'opacity-60 hover:opacity-100'
                            }`}
                            aria-label={`View project image ${index + 1}`}
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                            }}
                        >
                            <img
                                src={image}
                                alt={`${project.title} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Full Description */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-linear-to-b from-purple-500 to-pink-500"></div>
                            Project Overview
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {project.fullDescription}
                        </p>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-linear-to-b from-cyan-500 to-blue-500"></div>
                            Technologies Used
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className="relative group"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                        }}
                                    />
                                    <div
                                        className="relative px-5 py-2.5 bg-gray-900 m-px border border-gray-800 group-hover:border-gray-700 transition-colors"
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))'
                                        }}
                                    >
                                        <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                                            {tech}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation to Other Projects */}
                <div className="mt-20 pt-12 border-t border-gray-800">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Explore More Projects
                        </h3>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                            aria-label="View All Projects"
                        >
                            <span className="font-semibold">View All Projects</span>
                            <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;