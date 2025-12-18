/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { baseUrl } from '@/constants/base-url';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

type Project = {
    id: string | number;
    title: string;
    categories: string[];
    client?: string;
    image?: string;
    description?: string;
    result?: string;
    year?: string;
    featured?: boolean;
    services?: { title?: string }[];
};

const CATEGORY_COLORS: Record<string, string> = {
    'Branding': 'border-amber-600',
    'Digital Marketing': 'border-blue-500',
    'Web & Mobile': 'border-purple-500',
    'Consultancy': 'border-green-500',
    'Media Production': 'border-red-500',
    'Events': 'border-pink-500',
    'Design': 'border-yellow-500',
    'SEO': 'border-indigo-500',
    'Content': 'border-orange-500',
    'Strategy': 'border-teal-500',
};

const FALLBACK_BORDER_COLORS = [
    'border-cyan-500',
    'border-rose-500',
    'border-lime-500',
    'border-violet-500',
    'border-fuchsia-500',
    'border-emerald-500',
    'border-sky-500',
    'border-amber-400',
    'border-teal-400',
    'border-pink-400',
];

const getCategoryBorderColor = (category: string, index: number): string => {
    if (CATEGORY_COLORS[category]) {
        return CATEGORY_COLORS[category];
    }
    return FALLBACK_BORDER_COLORS[index % FALLBACK_BORDER_COLORS.length];
};

const SERVICE_INDICATOR_COLORS: Record<string, string> = {
    'All': 'bg-white',
    'Branding': 'bg-amber-600',
    'Digital Marketing': 'bg-blue-500',
    'Web & Mobile': 'bg-purple-500',
    'Consultancy': 'bg-green-500',
    'Media Production': 'bg-red-500',
    'Events': 'bg-pink-500',
    'Design': 'bg-yellow-500',
    'SEO': 'bg-indigo-500',
    'Content': 'bg-orange-500',
    'Strategy': 'bg-teal-500',
};

const SERVICE_TEXT_COLORS: Record<string, string> = {
    'All': 'text-white',
    'Branding': 'text-amber-500',
    'Digital Marketing': 'text-blue-500',
    'Web & Mobile': 'text-purple-500',
    'Consultancy': 'text-green-500',
    'Media Production': 'text-red-500',
    'Events': 'text-pink-500',
    'Design': 'text-yellow-500',
    'SEO': 'text-indigo-500',
    'Content': 'text-orange-500',
    'Strategy': 'text-teal-500',
};

const FALLBACK_SERVICE_COLORS = [
    { indicator: 'bg-cyan-500', text: 'text-cyan-500' },
    { indicator: 'bg-rose-500', text: 'text-rose-500' },
    { indicator: 'bg-lime-500', text: 'text-lime-500' },
    { indicator: 'bg-violet-500', text: 'text-violet-500' },
    { indicator: 'bg-fuchsia-500', text: 'text-fuchsia-500' },
    { indicator: 'bg-emerald-500', text: 'text-emerald-500' },
    { indicator: 'bg-sky-500', text: 'text-sky-500' },
];

const getServiceColors = (service: string, index: number) => {
    const indicatorColor = SERVICE_INDICATOR_COLORS[service];
    const textColor = SERVICE_TEXT_COLORS[service];

    if (indicatorColor && textColor) {
        return { indicator: indicatorColor, text: textColor };
    }

    const fallback = FALLBACK_SERVICE_COLORS[index % FALLBACK_SERVICE_COLORS.length];
    return fallback;
};

const ProjectsPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState('All');
    const [projects, setProjects] = useState<Project[]>([]);
    const [serviceOptions, setServiceOptions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        async function load() {
            setIsLoading(true);
            setError(null);

            try {
                const [projRes, servRes] = await Promise.all([
                    fetch(`${baseUrl}/api/projects`, { signal: controller.signal }),
                    fetch(`${baseUrl}/api/services`, { signal: controller.signal })
                ]);

                const projData = projRes.ok ? await projRes.json() : { projects: [] };
                const servData = servRes.ok ? await servRes.json() : { services: [] };

                if (!mounted) return;

                const items: Project[] = (projData.projects || []).map((p: any) => {
                    const services = (p.services || []) as any[];
                    const categories = p.categories || services.map((s: any) => s?.title).filter(Boolean);
                    const imageUrl = (Array.isArray(p.images) && p.images[0]?.url) || p.image || '';

                    return {
                        id: p.id,
                        title: (p.title || p.name || '') as string,
                        categories,
                        client: (p.client || '') as string,
                        image: imageUrl as string,
                        description: (p.description || '') as string,
                        result: (p.result || '') as string,
                        year: (p.year || '') as string,
                        featured: !!p.featured,
                        services
                    };
                });

                if (!mounted) return;
                setProjects(items);

                const serviceSet = new Set<string>(['All']);
                items.forEach(p => (p.categories || []).forEach(c => serviceSet.add(c)));
                (servData.services || []).forEach((s: any) => serviceSet.add((s?.title || '') as string));
                setServiceOptions(Array.from(serviceSet));
            } catch (err: any) {
                if (err?.name === 'AbortError') return;
                console.error('Failed to load projects/services', err);
                if (mounted) setError('Failed to load content.');
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    const filteredProjects = useMemo(() => projects.filter(p => {
        if (selectedService !== 'All') {
            const matchesService = (p.categories || []).some(c => c.toLowerCase() === selectedService.toLowerCase()) ||
                (p.services || []).some(s => (s.title || '').toLowerCase() === selectedService.toLowerCase());
            if (!matchesService) return false;
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchesSearch = p.title.toLowerCase().includes(q) ||
                (p.description || '').toLowerCase().includes(q) ||
                (p.client || '').toLowerCase().includes(q);
            if (!matchesSearch) return false;
        }

        return true;
    }), [projects, selectedService, searchQuery]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden flex justify-center">
            <div className='container'>
                <div className='px-5 flex relative justify-between gap-20'>
                    <div className=" w-[20%] self-start mt-20 ml-16">
                        <div className='fixed'>
                            <h2 className="italic-font text-[45px] font-bold">Works</h2>
                            <div className='mt-6'>
                                <div className='mb-6'>
                                    <div
                                        className={`flex items-center gap-2 bg-black rounded-full transition-all duration-500 ease-out ${isSearchOpen ? 'w-[220px] px-3 py-2 shadow-xl border border-white/10' : 'w-10 h-10 p-0'
                                            }`}
                                    >
                                        <button
                                            onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                                            className={`${isSearchOpen ? 'pointer-events-none' : ''} transition-all duration-300 cursor-pointer`}
                                        >
                                            <Search className={`w-5 h-5 text-gray-400 ${isSearchOpen ? 'ml-1' : 'ml-2.5'}`} />
                                        </button>

                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search..."
                                            className={`bg-transparent outline-none text-white placeholder:text-gray-500 text-sm transition-all duration-500 ${isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
                                                }`}
                                            autoFocus={isSearchOpen}
                                        />

                                        {isSearchOpen && (
                                            <button
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className="p-1 hover:bg-white/10 rounded-full transition-all duration-300"
                                            >
                                                <X className="w-4 h-4 text-gray-400" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <p className='text-gray-500 ml-2 mb-4'>Services</p>
                                <div className="p-4 rounded-3xl bg-black px-6 shadow-lg w-max">
                                    <div className="flex flex-col gap-4 items-start">
                                        {serviceOptions.map((service, index) => {
                                            const colors = getServiceColors(service, index);
                                            const isSelected = selectedService === service;

                                            return (
                                                <button
                                                    key={service}
                                                    onClick={() => setSelectedService(service)}
                                                    className="cursor-pointer transition-all duration-300 flex items-center gap-3 group"
                                                >
                                                    <span
                                                        className={`
                                                            w-1.5 rounded-full transition-all duration-300
                                                            ${colors.indicator}
                                                            ${isSelected ? 'h-6 opacity-100' : 'h-2 opacity-50 group-hover:h-4 group-hover:opacity-80'}
                                                        `}
                                                    />

                                                    <span
                                                        className={`
                                                            transition-all duration-200
                                                            ${isSelected
                                                                ? `${colors.text} font-medium translate-x-1`
                                                                : 'text-gray-400 group-hover:text-white group-hover:translate-x-1'
                                                            }
                                                        `}
                                                    >
                                                        {service}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 pt-16 pb-6 relative px-7 bg-black overflow-hidden min-h-screen mr-15'>
                        <div
                            className="absolute opacity-[0.1] pointer-events-none "
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
                            }}
                        />

                        <div className='relative z-10'>
                            {isLoading && (
                                <div className="mb-6 text-sm text-gray-300">Loading works…</div>
                            )}
                            {error && (
                                <div className="mb-6 text-sm text-red-400">{error}</div>
                            )}
                            {filteredProjects.map((project, i) => (
                                <Link href={`/works/${project.id}`} style={{ justifyContent: i % 2 === 0 ? "left" : "right" }} className='w-full flex cursor-pointer hover:scale-[1.03] transition duration-400 mt-16' key={project.id}>
                                    <div className='flex items-end gap-9 w-full'>
                                        {i % 2 !== 0 && (
                                            <div className='mb-5 flex flex-col items-end flex-1'>
                                                <p style={{ letterSpacing: "0.5px" }} className='playfair-normal max-w-[200px] md:max-w-[400px] my-1 text-right self-end font-medium text-[21px]'>
                                                    {project.description}
                                                </p>
                                                <div className='mt-4 flex flex-wrap justify-end gap-2 max-w-[250px]'>
                                                    {project.categories.slice(0, 2).map((category, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1 text-sm rounded-full border-2 ${getCategoryBorderColor(category, index)} hover:bg-white/10 transition whitespace-nowrap`}
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
                                            {project.image && (
                                                <Image src={project.image} width={270} height={270} alt={project.title}
                                                    style={{
                                                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20%), 80% 100%, 0 100%)",
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                        width: "270px",
                                                        height: "270px"
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {i % 2 === 0 && (
                                            <div className='mb-5 flex-1'>
                                                <p style={{ letterSpacing: "0.5px" }} className='playfair-normal max-w-[200px] md:max-w-[400px] my-1 text-left self-end font-medium text-[21px]'>
                                                    {project.description}
                                                </p>
                                                <div className='mt-4 flex flex-wrap gap-2 max-w-[250px]'>
                                                    {project.categories.slice(0, 2).map((category, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1 text-sm rounded-full border-2 ${getCategoryBorderColor(category, index)} hover:bg-white/10 transition whitespace-nowrap`}
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
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;