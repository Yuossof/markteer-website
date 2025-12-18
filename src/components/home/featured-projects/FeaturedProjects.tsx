/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import {  featuredProjectsAtom, featuredProjectsLoadingAtom, featuredProjectsErrorAtom, fetchFeaturedProjectsAtom } from "@/atoms/featuredProjectsAtom";

export default function FeaturedProjects() {
    const [projects] = useAtom(featuredProjectsAtom);
    const [isLoading] = useAtom(featuredProjectsLoadingAtom);
    const [error] = useAtom(featuredProjectsErrorAtom);
    const [, fetchProjects] = useAtom(fetchFeaturedProjectsAtom);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            breakpoints: {
                "(max-width: 480px)": { slidesToScroll: 1 },
                "(max-width: 768px)": { slidesToScroll: 1 },
                "(max-width: 1024px)": { slidesToScroll: 1 },
            },
        },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-gray-900 border-t-gray-300 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading featured projects...</p>
                </div>
            </div>
        );
    }

    if (error || projects.length === 0) return null;

    return (
        <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="w-full  mb-12">
                    <h2 className="text-xl md:text-[32px] ml-5 font-medium italic-font  text-gray-100 ">
                        Featured Projects
                    </h2>

                </div>

                {/* Carousel Wrapper */}
                <div className="relative mt-20">
                    {/* Embla */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-2 md:gap-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]"
                                >
                                    <Link href={`/works/${project.id}`}>
                                        <div className="group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col items-center px-2">
                                            {/* Image */}
                                            <div className="relative h-[220px] w-[220px] sm:h-60 sm:w-60 md:h-[260px] md:w-[260px] overflow-hidden mx-auto">
                                                {project.images.length > 0 ? (
                                                    <Image
                                                        src={project.images[0].url}
                                                        fill
                                                        className="object-cover"
                                                        alt={project.name || "Image"}
                                                        style={{
                                                            clipPath:
                                                                "polygon(0 0, 100% 0, 100% calc(100% - 20%), 80% 100%, 0 100%)",
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-gray-500">No image</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="pt-5 flex-1 flex flex-col items-start w-[90%]">
                                                {project.name && (
                                                    <h3 className="text-white text-lg sm:text-xl md:text-[22px] lg:text-[28px] mb-2 font-medium uppercase text-center line-clamp-2">
                                                        {project.name}
                                                    </h3>
                                                )}

                                                <div className="flex gap-2 items-center flex-wrap justify-center mt-4">
                                                    {project.clientImage ? (
                                                        <div className="h-6 w-16 sm:h-8 sm:w-20">
                                                            <img
                                                                src={project.clientImage}
                                                                alt={project.client || "Client"}
                                                                className="h-full w-full object-contain"
                                                            />
                                                        </div>
                                                    ) : project.client ? (
                                                        <p className="text-sm sm:text-md font-semibold text-white">
                                                            {project.client}
                                                        </p>
                                                    ) : null}

                                                    <span className="h-6 text-gray-400 hidden sm:inline">|</span>
                                                    <p className="font-medium text-xs sm:text-sm md:text-lg uppercase text-gray-500">
                                                        {project.services[0]?.title || ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrows - Hidden on mobile, visible on tablet+ */}
                    <button 
                        onClick={scrollPrev} 
                        className="hidden md:flex absolute -left-6 lg:-left-16 xl:-left-20 top-1/2 border border-white/20 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full items-center justify-center z-10 backdrop-blur-sm bg-white/10 hover:bg-white/20 cursor-pointer shadow-lg transition-all"
                        aria-label="Previous"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="white"
                            className="w-5 h-5 lg:w-6 lg:h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button 
                        onClick={scrollNext} 
                        className="hidden md:flex absolute -right-6 lg:-right-10 xl:-right-14 top-1/2 border border-white/20 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full items-center justify-center z-10 backdrop-blur-sm bg-white/10 hover:bg-white/20 cursor-pointer shadow-lg transition-all"
                        aria-label="Next"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="white"
                            className="w-5 h-5 lg:w-6 lg:h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Dots (Optional) */}
                <div className="flex md:hidden justify-center gap-2 mt-6">
                    {projects.slice(0, 5).map((_, idx) => (
                        <button
                            key={idx}
                            className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}