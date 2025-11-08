"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
    FaChartLine,
    FaUsers,
    FaDollarSign,
    FaMoneyBillWave,
    FaMobileAlt,
    FaSearch,
    FaBullseye,
    FaLightbulb,
    FaHandshake
} from 'react-icons/fa';

export default function AboutUs() {
    const servicesRef = useRef<HTMLDivElement | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (servicesRef.current) {
                const rect = servicesRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const totalHeight = servicesRef.current.scrollHeight;

                const scrolled = windowHeight - rect.top;
                const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
                setScrollProgress(progress * 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []); 

    return (
        <div className="min-h-screen bg-[#02000c]">


            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <div className="inline-block">
                            <span
                                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                style={{
                                    clipPath: 'polygon(0 0, 93% 0, 100% 28%, 100% 100%, 7% 100%, 0 72%)'
                                }}

                            >
                                About Marketeer Agency
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Empowering Businesses <br />
                            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Since 2016
                            </span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed">
                            A leading business consultation firm with over 8 years of experience,
                            focused on helping businesses thrive in today&apos;s competitive market.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <div
                                className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700"
                                style={{
                                    clipPath: 'polygon(0 0, 93% 0, 100% 28%, 100% 100%, 7% 100%, 0 72%)'
                                }}
                            >
                                <span className="text-3xl font-bold text-blue-400">8+</span>
                                <span className="text-slate-400">Years</span>
                            </div>
                            <div
                                className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700"
                                style={{
                                    clipPath: 'polygon(0 0, 93% 0, 100% 28%, 100% 100%, 7% 100%, 0 72%)'
                                }}                            >
                                <span className="text-3xl font-bold text-purple-400">120+</span>
                                <span className="text-slate-400">Developers</span>
                            </div>
                            <div
                                className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700"
                                style={{
                                    clipPath: 'polygon(0 0, 93% 0, 100% 28%, 100% 100%, 7% 100%, 0 72%)'
                                }}                            >
                                <span className="text-3xl font-bold text-pink-400">500+</span>
                                <span className="text-slate-400">Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="py-20 relative px-4 sm:px-6 lg:px-8 overflow-hidden"
                ref={servicesRef}
            >
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: `
      linear-gradient(100deg,
        rgba(255,110,30,0.9) 0%,
        rgba(255,130,60,0.7) 15%,
        rgba(100,120,255,0.55) 30%,
        rgba(120,80,220,0.45) 45%,
        rgba(40,30,120,0.35) 60%,
        transparent 70%
      ),
      radial-gradient(at 5% 40%, rgba(255,90,30,0.6), transparent 65%),
      radial-gradient(at 10% 60%, rgba(109,79,192,0.5), transparent 70%),
      radial-gradient(at 15% 75%, rgba(22,9,95,0.5), transparent 80%)
    `,
                        mixBlendMode: "screen",
                        filter: "blur(35px)",
                        opacity: 0.95,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "70% 100%",
                    }}
                ></div>


                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Our Services
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Comprehensive solutions designed to address your critical business
                            needs
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 transform -translate-x-1/2">
                            <div
                                className="absolute top-0 left-0 w-full bg-linear-to-b from-blue-500 to-purple-500 transition-all duration-600"
                                style={{ height: `${scrollProgress}%` }}
                            />
                        </div>

                        {/* Services Items */}
                        <div className="relative space-y-16">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"
                                        } relative`}
                                >
                                    <div
                                        className={`absolute top-1/2 w-8 h-0.5 bg-slate-800 ${index % 2 === 0
                                            ? "left-[calc(50%-2rem)]"
                                            : "right-[calc(50%-2rem)]"
                                            } transform -translate-y-1/2`}
                                    />
                                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                        <div className="w-4 h-4 bg-slate-950 border-2 border-slate-600 rounded-full">
                                            <div
                                                className={`w-2 h-2 bg-linear-to-br from-blue-500 to-purple-500 rounded-full m-0.5 transition-opacity duration-600 ${scrollProgress > (index / services.length) * 100
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={`w-[calc(50%-3rem)] ${index % 2 === 0 ? "pr-8" : "pl-8 ml-auto"
                                            }`}
                                    >
                                        <div
                                            className={`group relative bg-slate-900/50 backdrop-blur-sm p-6 border border-slate-800 hover:border-blue-500/50 transition-all duration-600 hover:transform hover:scale-105 ${scrollProgress > (index / services.length) * 100
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-50 translate-y-4"
                                                }`}
                                            style={{
                                                clipPath:
                                                    "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
                                                transition: "all 0.5s ease-out",
                                            }}
                                        >
                                            <div
                                                className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{
                                                    clipPath:
                                                        "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
                                                }}
                                            />

                                            <div className="relative">
                                                <div
                                                    className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "justify-start" : "justify-end"
                                                        }`}
                                                >
                                                    {index % 2 === 0 ? (
                                                        <>
                                                            <div
                                                                className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center"
                                                                style={{
                                                                    clipPath:
                                                                        "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)",
                                                                }}
                                                            >
                                                                <service.icon className="text-white text-xl" />
                                                            </div>
                                                            <h3 className="text-xl font-semibold text-white">
                                                                {service.title}
                                                            </h3>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h3 className="text-xl font-semibold text-white">
                                                                {service.title}
                                                            </h3>
                                                            <div
                                                                className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center"
                                                                style={{
                                                                    clipPath:
                                                                        "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)",
                                                                }}
                                                            >
                                                                <service.icon className="text-white text-xl" />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                <p
                                                    className={`text-slate-400 leading-relaxed ${index % 2 === 0 ? "text-left" : "text-right"
                                                        }`}
                                                >
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Our Story Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20 blur-3xl"></div>
                            <div
                                className="relative bg-slate-900/50 backdrop-blur-sm p-8 border border-slate-800"
                                style={{ clipPath: 'polygon(0 0, 94% 0, 100% 6%, 100% 100%, 6% 100%, 0 94%)' }}
                            >
                                <div
                                    className="aspect-square bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden"
                                    style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}
                                >
                                    <video
                                        src="https://res.cloudinary.com/db1lfazhq/video/upload/v1762425659/Estate%20Master/An9x8U6E8ECBrjwd3YL2vYTlqKn3iwL305JTrVSb7GVuUpCD6c0qC4VvzFFORaqA-xsTmgXuDM57CT1JezwJx-U_atdehr.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />

                                </div>

                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="inline-block">
                                <span
                                    className="px-4 py-2 text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}
                                >
                                    Our Story
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                A Journey of <span className="text-purple-400">Excellence</span>
                            </h2>

                            <p className="text-slate-300 text-lg leading-relaxed">
                                Founded in 2016, <span className="text-white font-semibold">Marketeer EG</span> emerged
                                from a passion for digital excellence and a vision to create a significant impact
                                in the marketing world.
                            </p>

                            <p className="text-slate-400 leading-relaxed">
                                Over the years, we have grown into a dynamic team of professionals, each bringing
                                a wealth of expertise and creativity to the table. Our journey has been marked by
                                numerous successful collaborations with over 120 developers and a myriad of satisfied
                                clients, all of whom have benefited from our tailored digital solutions.
                            </p>

                            <div className="flex gap-4 pt-4">
                                <div
                                    className="flex-1 bg-slate-900/50 backdrop-blur-sm p-4 border border-slate-800"
                                    style={{ clipPath: 'polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)' }}
                                >
                                    <div className="text-2xl font-bold text-blue-400 mb-1">2016</div>
                                    <div className="text-slate-400 text-sm">Founded</div>
                                </div>
                                <div
                                    className="flex-1 bg-slate-900/50 backdrop-blur-sm p-4 border border-slate-800"
                                    style={{ clipPath: 'polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)' }}
                                >
                                    <div className="text-2xl font-bold text-purple-400 mb-1">120+</div>
                                    <div className="text-slate-400 text-sm">Developers</div>
                                </div>
                                <div
                                    className="flex-1 bg-slate-900/50 backdrop-blur-sm p-4 border border-slate-800"
                                    style={{ clipPath: 'polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)' }}
                                >
                                    <div className="text-2xl font-bold text-pink-400 mb-1">8+</div>
                                    <div className="text-slate-400 text-sm">Years</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Philosophy Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-purple-600/10 blur-3xl"></div>

                        <div
                            className="relative bg-slate-900/50 backdrop-blur-sm p-8 sm:p-12 lg:p-16 border border-slate-800"
                            style={{ clipPath: 'polygon(0 0, 96% 0, 100% 4%, 100% 100%, 4% 100%, 0 96%)' }}
                        >
                            <div className="max-w-4xl mx-auto text-center space-y-6">
                                <div className="inline-block">
                                    <span
                                        className="px-4 py-2 text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}
                                    >
                                        Our Philosophy
                                    </span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                    Every Brand Has a <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Unique Story</span>
                                </h2>

                                <p className="text-slate-300 text-lg leading-relaxed">
                                    At <span className="text-white font-semibold">Marketeer EG</span>, we believe
                                    that every brand has a unique story to tell. Our role is to translate that story
                                    into compelling digital narratives that resonate with your audience.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 pt-8">
                                    <div
                                        className="bg-slate-900/50 p-6 border border-slate-800"
                                        style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}
                                    >
                                        <div
                                            className="w-12 h-12 bg-blue-500/10 flex items-center justify-center mb-4 mx-auto"
                                            style={{ clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)' }}
                                        >
                                            <FaBullseye className="text-blue-400 text-2xl" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-2">Excellence</h3>
                                        <p className="text-slate-400 text-sm">Committed to delivering the highest quality in everything we do</p>
                                    </div>

                                    <div
                                        className="bg-slate-900/50 p-6 border border-slate-800"
                                        style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}
                                    >
                                        <div
                                            className="w-12 h-12 bg-purple-500/10 flex items-center justify-center mb-4 mx-auto"
                                            style={{ clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)' }}
                                        >
                                            <FaLightbulb className="text-purple-400 text-2xl" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-2">Innovation</h3>
                                        <p className="text-slate-400 text-sm">Embracing new ideas and technologies to stay ahead</p>
                                    </div>

                                    <div
                                        className="bg-slate-900/50 p-6 border border-slate-800"
                                        style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}
                                    >
                                        <div
                                            className="w-12 h-12 bg-pink-500/10 flex items-center justify-center mb-4 mx-auto"
                                            style={{ clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)' }}
                                        >
                                            <FaHandshake className="text-pink-400 text-2xl" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-2">Partnership</h3>
                                        <p className="text-slate-400 text-sm">Building lasting relationships through trust and results</p>
                                    </div>
                                </div>

                                <p className="text-slate-400 pt-6">
                                    Our holistic approach ensures that every aspect of your digital presence
                                    is optimized for success in the ever-evolving digital landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

// Services Data
const services = [
    {
        icon: FaChartLine,
        title: "Business Planning",
        description: "Crafting tailored business plans that align with your goals and drive sustainable growth."
    },
    {
        icon: FaUsers,
        title: "HR Optimization",
        description: "Ensuring your team is positioned for peak performance through effective recruitment and retention strategies."
    },
    {
        icon: FaDollarSign,
        title: "Sales Strategy",
        description: "Developing comprehensive sales strategies that maximize revenue and market penetration."
    },
    {
        icon: FaMoneyBillWave,
        title: "Cost Control",
        description: "Identifying and eliminating inefficiencies to optimize your operational expenses."
    },
    {
        icon: FaMobileAlt,
        title: "Digital Marketing",
        description: "Innovative marketing services including SEO, social media management, and paid advertising."
    },
    {
        icon: FaSearch,
        title: "Market Research",
        description: "Delivering critical insights into industry trends and customer behavior for informed decisions."
    }
];