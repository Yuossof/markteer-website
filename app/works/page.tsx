"use client"
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';


const ProjectsPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState('All');

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categoryColors = {
        "Branding": "border-amber-600",
        "Digital Marketing": "border-blue-500",
        "Web & Mobile": "border-purple-500",
        "Consultancy": "border-green-500",
        "Media Production": "border-red-500",
        "Events": "border-pink-500",
        "Design": "border-yellow-500",
        "SEO": "border-indigo-500",
        "Content": "border-orange-500",
        "Strategy": "border-teal-500",
    } as const;

    type TCategoryName = keyof typeof categoryColors;

    const projects = [
        {
            id: 1,
            title: "Complete Brand Identity Development",
            categories: ["Branding", "Design", "Strategy"],
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
            categories: ["Digital Marketing", "SEO", "Content"],
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
            categories: ["Web & Mobile", "Design"],
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
            categories: ["Consultancy", "Strategy", "Branding"],
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
            categories: ["Media Production", "Content"],
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
            categories: ["Events", "Branding", "Design"],
            client: "Exhibition Center",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
            description: "Complete event management for international trade show with 500+ attendees.",
            result: "500+ Attendees",
            year: "2023",
            featured: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden flex justify-center">
            <div className='container'>
                <div className='px-5 flex relative justify-between gap-20'>
                    <div className=" w-[15%] self-start mt-20">
                        <div className='fixed'>
                            <h2 className="italic-font text-[45px] font-bold">Works</h2>
                            <div className='mt-6'>
                                <div className='mb-6'>
                                    <div className='relative'>
                                        <div
                                            className={`
                        flex items-center gap-2 
                        bg-black rounded-full 
                        transition-all duration-500 ease-out
                        ${isSearchOpen
                                                    ? 'w-[220px] px-3 py-2 shadow-xl border border-white/10'
                                                    : 'w-10 h-10 p-0'
                                                }
                    `}
                                        >
                                            <button
                                                onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                                                className={`${isSearchOpen ? 'pointer-events-none' : ''} transition-all duration-300 cursor-pointer`}
                                            >
                                                <Search className={`w-5 h-5 text-gray-400 ${isSearchOpen ? 'ml-1' : 'ml-2.5'}`} />
                                            </button>

                                            {/* Input Field */}
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search..."
                                                className={`
                            bg-transparent outline-none text-white 
                            placeholder:text-gray-500 text-sm
                            transition-all duration-500
                            ${isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}
                        `}
                                                autoFocus={isSearchOpen}
                                            />

                                            {/* Close Button */}
                                            {isSearchOpen && (
                                                <button
                                                    onClick={() => {
                                                        setIsSearchOpen(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="p-1 hover:bg-white/10 rounded-full transition-all duration-300 animate-fadeIn"
                                                >
                                                    <X className="w-4 h-4 text-gray-400" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* قسم Services */}
                                <p className='text-gray-500 ml-2 mb-4'>Services</p>
                                <div className="p-4 rounded-3xl bg-black px-6 shadow-lg w-max">
                                    <div className="flex flex-col gap-4 items-start">
                                        {["All", "Branding", "Digital Marketing", "Web & Mobile", "Consultancy", "Media Production", "Events"].map(
                                            (service) => (
                                                <button
                                                    key={service}
                                                    onClick={() => setSelectedService(service)}
                                                    className={`
                                cursor-pointer transition-all duration-200
                                ${selectedService === service
                                                            ? 'text-white font-medium translate-x-2'
                                                            : 'text-gray-400 hover:text-white hover:translate-x-1'
                                                        }
                            `}
                                                >
                                                    {service}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 pt-16 pb-6 relative px-7 bg-black overflow-hidden'>
                        {/* Infinite Parallax Pattern */}
                        <div
                            className="absolute opacity-[0.1] pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(white 1px, transparent 1px),
                                    linear-gradient(90deg, white 1px, transparent 1px)
                                `,
                                backgroundSize: '50px 50px',
                                transform: `translateY(${scrollY * 0.5}px)`,
                                width: '100%',
                                height: '300%',
                                top: '-100%',
                                left: 0,
                                willChange: 'transform',
                                transition: 'transform 0.1s linear'
                            }}
                        />

                        <div className='relative z-10'>
                            {projects.map((project, i) => (
                                <div style={{ justifyContent: i % 2 === 0 ? "left" : "right" }} className='w-full flex cursor-pointer hover:scale-[1.03] transition duration-400' key={project.id}>
                                    <div className='flex items-end gap-9 w-full mt-16'>
                                        {i % 2 !== 0 && (
                                            <div className='mb-5 flex flex-col items-end flex-1'>
                                                <p style={{ letterSpacing: "0.5px" }} className={`playfair-normal max-w-[200px] md:max-w-[400px] my-1 text-right self-end font-medium text-[21px]`}>
                                                    {project.description}
                                                </p>
                                                <div className='mt-4 flex flex-wrap justify-end gap-2 max-w-[250px]'>
                                                    {project.categories.slice(0, 2).map((category, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1 text-sm rounded-full border-2 ${categoryColors[category as TCategoryName] || 'border-gray-500'} hover:bg-white/10 transition whitespace-nowrap`}
                                                        >
                                                            {category}
                                                        </span>
                                                    ))}
                                                    {project.categories.length > 2 && (
                                                        <span className="px-3 py-1 text-sm rounded-full border-2 border-gray-500 text-gray-400">
                                                            +{project.categories.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <Image src={project.image} width={270} height={270} alt={project.title}
                                                style={{
                                                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20%), 80% 100%, 0 100%)",
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    width: "270px",
                                                    height: "270px"
                                                }}
                                            />
                                        </div>
                                        {i % 2 === 0 && (
                                            <div className='mb-5 flex-1'>
                                                <p style={{ letterSpacing: "0.5px" }} className={`playfair-normal max-w-[200px] md:max-w-[400px] my-1 text-left self-end font-medium text-[21px]`}>
                                                    {project.description}
                                                </p>
                                                <div className='mt-4 flex flex-wrap gap-2 max-w-[250px]'>
                                                    {project.categories.slice(0, 2).map((category, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1 text-sm rounded-full border-2 ${categoryColors[category as TCategoryName] || 'border-gray-500'} hover:bg-white/10 transition whitespace-nowrap`}
                                                        >
                                                            {category}
                                                        </span>
                                                    ))}
                                                    {project.categories.length > 2 && (
                                                        <span className="px-3 py-1 text-sm rounded-full border-2 border-gray-500 text-gray-400">
                                                            +{project.categories.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;