"use client"
import React, { useState, useEffect } from 'react'
import {
    FaShoppingCart,
    FaVideo,
    FaBullhorn,
    FaChartLine,
    FaShareAlt,
    FaSearch,
    FaPalette,
    FaPen,
    FaBriefcase
} from 'react-icons/fa'

const OurServices = () => {
    const [activeIndex, setActiveIndex] = useState(1);

    const services = [
        {
            title: "E-Commerce",
            description: "Build professional and user-friendly online stores that convert your visitors into loyal customers",
            icon: FaShoppingCart,
            number: "01",
            gradient: "from-purple-500 via-pink-500 to-red-500"
        },
        {
            title: "Media Production",
            description: "Create high-quality visual and audio content that tells your brand story creatively",
            icon: FaVideo,
            number: "02",
            gradient: "from-blue-500 via-purple-500 to-pink-500"
        },
        {
            title: "Digital Advertisement",
            description: "Strategic advertising campaigns that deliver your message to the right audience",
            icon: FaBullhorn,
            number: "03",
            gradient: "from-green-500 via-blue-500 to-purple-500"
        },
        {
            title: "Financial Consultant",
            description: "Expert financial consulting services to help you achieve your business goals",
            icon: FaChartLine,
            number: "04",
            gradient: "from-yellow-500 via-orange-500 to-red-500"
        },
        {
            title: "Social Media",
            description: "Comprehensive social media management to build a strong community around your brand",
            icon: FaShareAlt,
            number: "05",
            gradient: "from-cyan-500 via-blue-500 to-purple-500"
        },
        {
            title: "SEO",
            description: "Search engine optimization to ensure your website ranks high in search results",
            icon: FaSearch,
            number: "06",
            gradient: "from-lime-500 via-green-500 to-blue-500"
        },
        {
            title: "Brand Identity",
            description: "Design distinctive visual identity that reflects your brand's personality",
            icon: FaPalette,
            number: "07",
            gradient: "from-pink-500 via-purple-500 to-indigo-500"
        },
        {
            title: "Content & Social",
            description: "Create engaging content that resonates with your audience and enhances presence",
            icon: FaPen,
            number: "08",
            gradient: "from-orange-500 via-red-500 to-pink-500"
        },
        {
            title: "Business Consultant",
            description: "Comprehensive business consulting to develop effective growth strategies",
            icon: FaBriefcase,
            number: "09",
            gradient: "from-indigo-500 via-purple-500 to-pink-500"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => {
                if (prev >= services.length - 1) {
                    return 1;
                }
                return prev + 1;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [services.length]);

    return (
        <section className="min-h-screen py-20 bg-linear-to-br from-gray-950 via-slate-950 to-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
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
                        Discover our comprehensive range of digital solutions designed to elevate your business to new heights
                    </p>
                </div>

                {/* Services Layout */}
                <div className="relative">
                    {/* Main Featured Service */}
                    <div className="mb-16">
                        <div
                            className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 p-12 text-center hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                            }}
                        >
                            {/* Colorful Border */}
                            <div
                                className={`absolute inset-0 bg-linear-to-r ${services[0].gradient} p-0.5 group-hover:p-1 transition-all duration-500`}
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                                }}
                            >
                                <div
                                    className="h-full w-full bg-slate-950/90"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 29px) 0, 100% 29px, 100% 100%, 29px 100%, 0 calc(100% - 29px))'
                                    }}
                                ></div>
                            </div>

                            <div className="relative z-10">
                                <div
                                    className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-r from-purple-500 to-pink-500 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-purple-500/30"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                    }}
                                >
                                    <FaShoppingCart className="text-4xl text-white" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors duration-300">
                                    {services[0].title}
                                </h3>

                                <p className="text-lg text-gray-300 max-w-2xl mx-auto group-hover:text-gray-200 transition-colors duration-300">
                                    {services[0].description}
                                </p>

                                <div className="mt-8">
                                    <span className="text-6xl font-black text-slate-800 group-hover:text-slate-700 transition-colors duration-300">
                                        01
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid Services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.slice(1).map((service, index) => {
                            const IconComponent = service.icon;
                            const actualIndex = index + 1;
                            const isActive = actualIndex === activeIndex;

                            return (
                                <div
                                    key={index}
                                    className={`group relative bg-slate-900/30 backdrop-blur-sm border transition-all duration-400 p-8 ${isActive
                                            ? 'bg-slate-800/40 border-slate-700/60 -translate-y-1'
                                            : 'border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700/60 hover:-translate-y-1'
                                        }`}
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                    }}
                                >
                                    {/* Colorful Border */}
                                    <div
                                        className={`absolute inset-0 bg-linear-to-r ${service.gradient} transition-all duration-500 ${isActive
                                                ? 'p-0.5 opacity-100'
                                                : 'p-0.5 opacity-0 group-hover:opacity-100 group-hover:p-0.5'
                                            }`}
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                        }}
                                    >
                                        <div
                                            className="h-full w-full bg-slate-900/90"
                                            style={{
                                                clipPath: 'polygon(0 0, calc(100% - 19px) 0, 100% 19px, 100% 100%, 19px 100%, 0 calc(100% - 19px))'
                                            }}
                                        ></div>
                                    </div>

                                    {/* Number Background */}
                                    <div className={`absolute top-4 right-4 text-5xl font-black transition-colors duration-300 ${isActive
                                            ? 'text-slate-800/30'
                                            : 'text-slate-900/20 group-hover:text-slate-800/30'
                                        }`}>
                                        {service.number}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`relative z-10 inline-flex items-center justify-center w-14 h-14 bg-linear-to-r ${service.gradient} mb-6 transition-transform duration-300 shadow-lg ${isActive
                                                ? 'scale-110'
                                                : 'group-hover:scale-110'
                                            }`}
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                                        }}
                                    >
                                        <IconComponent className="text-xl text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${isActive
                                                ? 'text-gray-100'
                                                : 'text-white group-hover:text-gray-100'
                                            }`}>
                                            {service.title}
                                        </h3>

                                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive
                                                ? 'text-gray-300'
                                                : 'text-gray-400 group-hover:text-gray-300'
                                            }`}>
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Gradient Bottom Line */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${service.gradient} transition-all duration-500 ${isActive
                                            ? 'opacity-100'
                                            : 'opacity-0 group-hover:opacity-100'
                                        }`}></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurServices