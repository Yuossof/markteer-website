"use client"
import React, { useState, useEffect } from 'react'
import {
    FaShareAlt,
    FaCode,
    FaChartLine,
    FaVideo,
    FaPalette,
    FaCamera,
    FaCalendarAlt
} from 'react-icons/fa'

const OurServices = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const services = [
        {
            title: "Social Media & Digital Marketing",
            description: "We strategically concoct SM content strategies covering from planning content, writing and designing to publishing. Setting KPIs, we monitor and analyze the engagement to set out precise media spending plans and reports.",
            icon: FaShareAlt,
            number: "01",
            gradient: "from-blue-500 via-cyan-500 to-teal-500",
            features: ["Content Strategy", "KPI Monitoring", "Media Planning", "Engagement Analysis"]
        },
        {
            title: "Web & Mobile Development",
            description: "We create wireframes to define the flow of the project, followed by a visual design. Our skilled developers bring the workflow and designs to life with customized content, using a strict deployment plan and continuous monitoring.",
            icon: FaCode,
            number: "02",
            gradient: "from-purple-500 via-pink-500 to-red-500",
            features: ["Wireframing", "Visual Design", "Custom Development", "Deployment & Monitoring"]
        },
        {
            title: "Marketing Consultancy & Strategic Planning",
            description: "We study company profiles and operations to understand marketing needs, conducting research to identify industry trends and opportunities. We develop and implement marketing strategy according to brand objectives and budget.",
            icon: FaChartLine,
            number: "03",
            gradient: "from-orange-500 via-amber-500 to-yellow-500",
            features: ["Market Research", "Brand Positioning", "Strategy Development", "Implementation"]
        },
        {
            title: "Media Production",
            description: "We generate ideas with the creative team, providing content creation, animation, narration, 3D, and video editing. We process plans and organize production schedules and budgets, ensuring milestones are met throughout the project.",
            icon: FaVideo,
            number: "04",
            gradient: "from-red-500 via-rose-500 to-pink-500",
            features: ["Content Creation", "Animation & 3D", "Video Editing", "Production Management"]
        },
        {
            title: "Branding Development",
            description: "We explore brand positions and consumer insights to shape and communicate the vision and mission. We assemble a fully-fledged corporate identity and translate brand elements into tones, visuals, and go-to-market strategies.",
            icon: FaPalette,
            number: "05",
            gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
            features: ["Brand Strategy", "Corporate Identity", "Visual Language", "Market Positioning"]
        },
        {
            title: "Photography & Media Coverage",
            description: "We use a variety of photographic equipment and elements to meet the required criterion of the brand. We develop mood boards while providing food styling, product shoots, photoshoots, special AR filters, and editing.",
            icon: FaCamera,
            number: "06",
            gradient: "from-cyan-500 via-blue-500 to-indigo-500",
            features: ["Professional Photography", "Product Shoots", "AR Filters", "Photo Editing"]
        },
        {
            title: "Events Planning",
            description: "We conceptualize themes while planning budgets and booking venues. We arrange to liaise with the suppliers and manage all logistics required to ensure successful event execution.",
            icon: FaCalendarAlt,
            number: "07",
            gradient: "from-green-500 via-emerald-500 to-teal-500",
            features: ["Theme Conceptualization", "Venue Booking", "Supplier Management", "Logistics Coordination"]
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % services.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [services.length]);

    return (
        <section className="min-h-screen py-20 bg-linear-to-br from-gray-950 via-slate-950 to-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-pu
                rple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-linear-to-r from-green-500/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Subtle Bottom Orange Gradient */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        background: `linear-gradient(to top, 
                #ff4500 0%, 
                #ff6347 8%, 
                #ff8c00 15%, 
                transparent 28%
            )`
                    }}
                ></div>
            </div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="h-full w-full" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block">
                        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 tracking-tight">
                            OUR SERVICES
                        </h2>
                        <div className="h-1 w-full bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
                    </div>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8 leading-relaxed">
                        Comprehensive solutions tailored to elevate your brand and drive measurable results
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={index}
                                className={`group relative bg-slate-900/30 backdrop-blur-sm border transition-all duration-500 p-8 ${
                                    isActive
                                        ? 'bg-slate-800/50 border-slate-700/60 -translate-y-2 shadow-2xl'
                                        : 'border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700/60 hover:-translate-y-2'
                                }`}
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                }}
                            >
                                {/* Colorful Border */}
                                <div
                                    className={`absolute inset-0 bg-linear-to-r ${service.gradient} transition-all duration-500 ${
                                        isActive
                                            ? 'p-1 opacity-100'
                                            : 'p-0.5 opacity-0 group-hover:opacity-100'
                                    }`}
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                    }}
                                >
                                    <div
                                        className="h-full w-full bg-slate-900/95"
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 19px) 0, 100% 19px, 100% 100%, 19px 100%, 0 calc(100% - 19px))'
                                        }}
                                    ></div>
                                </div>

                                {/* Number Background */}
                                <div className={`absolute top-4 right-4 text-6xl font-black transition-all duration-300 ${
                                    isActive
                                        ? 'text-slate-700/40'
                                        : 'text-slate-900/20 group-hover:text-slate-800/30'
                                }`}>
                                    {service.number}
                                </div>

                                {/* Icon */}
                                <div
                                    className={`relative z-10 inline-flex items-center justify-center w-16 h-16 bg-linear-to-r ${service.gradient} mb-6 transition-all duration-500 shadow-lg ${
                                        isActive
                                            ? 'scale-110 shadow-2xl'
                                            : 'group-hover:scale-110 group-hover:shadow-2xl'
                                    }`}
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                    }}
                                >
                                    <IconComponent className="text-2xl text-white" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-gray-100 group-hover:text-white'
                                    }`}>
                                        {service.title}
                                    </h3>

                                    <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                                        isActive
                                            ? 'text-gray-300'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                    }`}>
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <div className={`space-y-2 transition-all duration-500 ${
                                        isActive
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                                    }`}>
                                        {service.features.map((feature, featureIndex) => (
                                            <div 
                                                key={featureIndex} 
                                                className="flex items-center gap-2 text-xs text-gray-400"
                                                style={{ transitionDelay: `${featureIndex * 50}ms` }}
                                            >
                                                <div 
                                                    className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${service.gradient}`}
                                                ></div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gradient Bottom Line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${service.gradient} transition-all duration-500 ${
                                    isActive
                                        ? 'opacity-100'
                                        : 'opacity-0 group-hover:opacity-100'
                                }`}></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default OurServices