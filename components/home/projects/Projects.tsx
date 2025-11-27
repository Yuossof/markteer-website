"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const HomeProjects = () => {

    const projects = [
        {
            id: 1,
            title: "Rebranding Campaign for Tech Startup",
            description: "Complete brand identity redesign including logo, visual guidelines, and marketing materials for a leading fintech company.",
            image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200&h=800&fit=crop",
            category: "Branding & Identity"
        },
        {
            id: 2,
            title: "E-Commerce Mobile App Development",
            description: "Full-stack development of a cross-platform mobile application with integrated payment gateway and real-time tracking.",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
            category: "Mobile Development"
        },
        {
            id: 3,
            title: "Digital Marketing Campaign - Fashion Brand",
            description: "360° digital marketing strategy that increased online sales by 150% through targeted social media and SEO campaigns.",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=800&fit=crop",
            category: "Digital Marketing"
        },
        {
            id: 4,
            title: "Corporate Event Documentary",
            description: "Professional video production covering a 3-day international conference with highlights, interviews, and promotional content.",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
            category: "Media Production"
        },
        {
            id: 5,
            title: "Restaurant Chain Website Redesign",
            description: "Modern responsive website with online reservation system, menu management, and multi-location support.",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=800&fit=crop",
            category: "Web Development"
        },
        {
            id: 6,
            title: "Product Launch Photography",
            description: "High-end product photography session for luxury watch brand including lifestyle shots and catalog imagery.",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop",
            category: "Photography"
        },
        {
            id: 7,
            title: "Annual Tech Summit Organization",
            description: "End-to-end planning and execution of a 500+ attendee technology summit including venue, speakers, and digital presence.",
            image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&h=800&fit=crop",
            category: "Event Planning"
        }
    ];

    return (
        <section className="py-20 relative bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-x-0 bottom-0 h-[25%] opacity-60"
                    style={{
                        background: `linear-gradient(
                                    to top,
                                    rgba(30, 80, 200, 0.7) 0%, 
                                    rgba(30, 80, 200, 0.45) 40%, 
                                    transparent 100%
                                  )`
                    }}
                ></div>
            </div>
            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Featured Projects
                    </h2>
                    <div className="w-24 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Discover our latest work and successful project deliveries
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <Link href={"/projects"} className="lg:col-span-2 lg:row-span-2">
                        <ProjectCard item={projects[0]} large />
                    </Link>

                    <div className="space-y-6">
                        <Link href={"/projects"}>
                            <ProjectCard item={projects[1]} />
                        </Link>
                        <Link href={"/projects"}>
                            <ProjectCard item={projects[2]} />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Link href={"/projects"}>
                        <ProjectCard item={projects[3]} />
                    </Link>
                    <Link href={"/projects"}>
                        <ProjectCard item={projects[4]} />
                    </Link>
                    <Link href={"/projects"}>
                        <ProjectCard item={projects[5]} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 mb-12">
                    <Link href={"/projects"}>
                        <ProjectCard item={projects[6]} wide />
                    </Link>
                </div>

                <div className="text-center">
                    <Link
                        href={"/projects"}
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                        }}
                        className="inline-flex cursor-pointer items-center px-10 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 group rounded-sm"
                    >
                        View All Projects
                        <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

type ProjectItem = {
    id: number,
    title: string,
    description: string,
    image: string,
    category: string
}

const ProjectCard = ({ item, large = false, wide = false }: { item: ProjectItem, large?: boolean, wide?: boolean }) => {
    const heightClass = large ? 'h-[500px]' : wide ? 'h-[300px]' : 'h-[240px]';

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`group relative overflow-hidden ${heightClass} bg-slate-800 cursor-pointer
                        hover:shadow-xl transition-all duration-300 hover:shadow-purple-500/20`}
            style={{
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hover && (
                <div
                    className="pointer-events-none absolute w-[165px] h-11 flex items-center justify-between bg-slate-900 rounded-3xl pl-3
                             transition-transform duration-75 z-20"
                    style={{
                        left: pos.x - 40,
                        top: pos.y - 30
                    }}
                >
                    <span className=''>View Details</span>
                    <div className='bg-blue-500 w-11 h-11 rounded-full flex justify-center items-center'>
                        <ArrowUpRight size={24} />
                    </div>
                </div>
            )}

            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Category Badge */}
                <span className="inline-block self-start px-3 py-1 bg-purple-600/80 text-white text-xs font-semibold rounded-full mb-3">
                    {item.category}
                </span>

                <h3 className="text-white text-xl md:text-2xl font-bold mb-2 transition-all duration-300 group-hover:text-purple-400">
                    {item.title}
                </h3>

                <p className="text-gray-300 text-sm md:text-base opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {item.description}
                </p>

                <div className="w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 group-hover:w-20 transition-all duration-500 mt-3"></div>
            </div>
        </div>
    );
};

export default HomeProjects;