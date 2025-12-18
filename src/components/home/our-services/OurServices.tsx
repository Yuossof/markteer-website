/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { TService, TProject } from "@/types/project_services";
import Link from "next/link";
import useEmblaCarousel from 'embla-carousel-react';

interface OurServicesProps {
    fetchedServices: TService[];
    handleMouseEnter: (service: TService) => void;
    handleMouseLeave: () => void;
    selectedService: TService | null;
    leftColumnRef: React.RefObject<HTMLDivElement | null>;
    rightColumnRef: React.RefObject<HTMLDivElement | null>;
    leftPausedRef: React.MutableRefObject<boolean>;
    rightPausedRef: React.MutableRefObject<boolean>;
    isLoadingMore?: boolean;
    isTimeoutActive?: boolean;
    isScrolling?: boolean;
    leftProjects?: TProject[];
    rightProjects?: TProject[];
    handleProjectsMouseEnter?: () => void;
    handleProjectsMouseLeave?: () => void;
    isHoveringProjects?: boolean;
}

// Mobile Accordion Item Component
const MobileServiceItem: React.FC<{
    service: TService;
    isOpen: boolean;
    onToggle: () => void;
}> = ({ service, isOpen, onToggle }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
    });

    // Local state for projects fetched specifically for this service
    const [projects, setProjects] = useState<TProject[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    // Fetch projects when accordion opens
    useEffect(() => {
        if (!isOpen || hasFetched) return;

        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                // Try to fetch from API
                const res = await fetch(`/api/services/${service.id}/projects?skip=0&take=10`);
                if (res.ok) {
                    const data = await res.json();
                    const fetchedProjects = data.projects || data || [];
                    setProjects(fetchedProjects);
                    console.log(`Fetched ${fetchedProjects.length} projects for ${service.title}`);
                } else {
                    // Fallback: use projects from service object if available
                    if (service.projects && service.projects.length > 0) {
                        setProjects(service.projects);
                    }
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                // Fallback: use projects from service object
                if (service.projects && service.projects.length > 0) {
                    setProjects(service.projects);
                }
            } finally {
                setIsLoading(false);
                setHasFetched(true);
            }
        };

        fetchProjects();
    }, [isOpen, service.id, service.title, service.projects, hasFetched]);

    // Re-initialize embla when projects change or accordion opens
    useEffect(() => {
        if (emblaApi && isOpen && projects.length > 0) {
            setTimeout(() => {
                emblaApi.reInit();
            }, 100);
        }
    }, [emblaApi, isOpen, projects]);

    return (
        <div className="border-b border-gray-700">
            {/* Service Header - Clickable */}
            <button
                onClick={onToggle}
                className="w-full py-4 px-4 flex items-center justify-between text-left"
            >
                <span
                    className={`
                        uppercase text-lg font-medium
                        transition-all duration-300
                        ${isOpen ? "service-active service-text" : "text-gray-500"}
                    `}
                >
                    {service.title}
                </span>
                
                {/* Arrow Icon */}
                <svg
                    className={`w-5 h-5 transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Collapsible Content */}
            <div
                className={`
                    overflow-hidden transition-all duration-500 ease-out
                    ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                {/* Short Description */}
                {service.shortDescription && (
                    <div className="px-4 pb-4">
                        <div className="flex items-start gap-3">
                            <div className="w-1 h-6 bg-white rotate-12 rounded-sm shrink-0 mt-1" />
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {service.shortDescription}
                            </p>
                        </div>
                    </div>
                )}

                {/* Projects Slider with Embla */}
                <div className="pb-6">
                    {isLoading ? (
                        // Loading State
                        <div className="px-4 py-8 flex justify-center">
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                <span className="text-sm text-gray-400">Loading projects...</span>
                            </div>
                        </div>
                    ) : projects.length > 0 ? (
                        // Projects Carousel
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex gap-4 pl-4">
                                {projects.map((project, i) => (
                                    <div 
                                        key={`mobile-project-${project.id || i}`} 
                                        className="flex-[0_0_auto]"
                                    >
                                        <MobileProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // No Projects
                        <div className="px-4 py-8 text-center text-gray-500">
                            No projects available for this service
                        </div>
                    )}
                </div>

                {/* View All Link */}
                <div className="px-4 pb-4">
                    <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <span>View all {service.title} projects</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Mobile Project Card (Smaller version)
const MobileProjectCard: React.FC<{ project: TProject }> = ({ project }) => {
    const imageUrl = project.images?.[0]?.url || "/placeholder.jpg";
    const projectName = project.name || project.title || "Untitled Project";

    return (
        <Link 
            href={`/works/${project.id}`} 
            className="flex flex-col gap-2 w-[180px] cursor-pointer group"
        >
            <div className="overflow-hidden rounded-lg relative bg-gray-800">
                <img
                    src={imageUrl}
                    alt={projectName}
                    className="w-[180px] h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15%), 80% 100%, 0 100%)",
                    }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                    }}
                />
            </div>

            <div className="pr-2">
                <h2 className="text-sm uppercase font-medium truncate text-white">
                    {projectName}
                </h2>

                {project.services && project.services.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {project.services.slice(0, 2).map((cat, idx) => (
                            <span
                                key={cat.id || idx}
                                className="px-2 py-0.5 text-xs rounded-full border border-gray-600 text-gray-400"
                            >
                                {cat.title}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
};

const OurServices: React.FC<OurServicesProps> = ({
    fetchedServices,
    handleMouseEnter,
    handleMouseLeave,
    selectedService,
    leftColumnRef,
    rightColumnRef,
    leftPausedRef,
    rightPausedRef,
    leftProjects,
    rightProjects,
    isLoadingMore,
    isTimeoutActive,
    isScrolling,
    handleProjectsMouseEnter,
    handleProjectsMouseLeave,
    isHoveringProjects
}) => {
    // State for mobile accordion
    const [openServiceId, setOpenServiceId] = useState<string | null>(null);

    const handleToggleService = (serviceId: string) => {
        setOpenServiceId(openServiceId === serviceId ? null : serviceId);
    };

    return (
        <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-12 lg:py-16">
            <div className="max-w-[1400px] mx-auto">
                
                {/* ==================== MOBILE VIEW ==================== */}
                <div className="block lg:hidden">
                    <div className="mb-8">
                        <h2 className="italic-font text-3xl font-medium text-white">
                            Services
                        </h2>
                    </div>

                    {/* Mobile Accordion List */}
                    <div className="border-t border-gray-700">
                        {fetchedServices?.map((service) => (
                            <MobileServiceItem
                                key={service.id}
                                service={service}
                                isOpen={openServiceId === service.id}
                                onToggle={() => handleToggleService(service.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* ==================== DESKTOP VIEW (UNCHANGED) ==================== */}
                <div className="hidden lg:flex flex-col lg:flex-row gap-6 lg:gap-20 ml-16">
                    
                    <div className="">
                        <div className="mb-12">
                            <h2 className="italic-font text-4xl lg:text-5xl font-medium">
                                Services
                            </h2>
                        </div>

                        <nav className="space-y-4">
                            {fetchedServices?.map((service) => {
                                const isActive = selectedService?.id === service.id;
                                const shouldShow = isActive && (
                                    selectedService || 
                                    isTimeoutActive || 
                                    isScrolling || 
                                    isHoveringProjects
                                );
                                
                                return (
                                    <Link
                                        href={`/services/${service.id}`}
                                        key={service.id}
                                        onMouseEnter={() => handleMouseEnter(service)}
                                        onMouseLeave={handleMouseLeave}
                                        className="block group"
                                    >
                                        <span
                                            className={`
                                                uppercase text-xl lg:text-[28px] xl:text-[32px]
                                                leading-tight font-medium block
                                                transition-all duration-300 ease-out
                                                ${isActive
                                                    ? "service-active service-text scale-105 origin-left"
                                                    : "text-gray-500 hover:text-gray-300"
                                                }
                                            `}
                                        >
                                            {service.title}
                                        </span>

                                        <div
                                            className={`
                                                overflow-hidden transition-all duration-300 ease-out
                                                ${shouldShow 
                                                    ? 'max-h-48 opacity-100 mt-3' 
                                                    : 'max-h-0 opacity-0'
                                                }
                                            `}
                                        >
                                            <div className="flex items-start gap-4 pl-2 pr-4">
                                                <div className="w-1.5 h-8 bg-white rotate-12 rounded-sm shrink-0 mt-1" />
                                                <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                                                    {service.shortDescription}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="w-[60%] relative pl-20 ">
                        <div
                            className="h-[600px] lg:h-[800px] rounded-xl overflow-hidden"
                            onMouseEnter={handleProjectsMouseEnter}
                            onMouseLeave={handleProjectsMouseLeave}
                        >
                            <div className="h-full grid grid-cols-2 ">
                                
                                <div
                                    ref={leftColumnRef}
                                    className="h-full overflow-y-auto no-scrollbar"
                                    onMouseEnter={() => { leftPausedRef.current = true; }}
                                    onMouseLeave={() => { leftPausedRef.current = false; }}
                                >
                                    <div className="flex flex-col gap-3 p-1">
                                        {leftProjects?.map((project, i) => (
                                            <ProjectCard 
                                                key={`left-${project.id || i}`} 
                                                project={project} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div
                                    ref={rightColumnRef}
                                    className="h-full overflow-y-auto no-scrollbar"
                                    onMouseEnter={() => { rightPausedRef.current = true; }}
                                    onMouseLeave={() => { rightPausedRef.current = false; }}
                                >
                                    <div className="flex flex-col gap-3 p-1">
                                        {rightProjects?.map((project, i) => (
                                            <ProjectCard 
                                                key={`right-${project.id || i}`} 
                                                project={project} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {isLoadingMore && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                        <span className="text-sm text-white">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default OurServices;