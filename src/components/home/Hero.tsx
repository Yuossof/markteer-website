    /* eslint-disable react-hooks/exhaustive-deps */
    "use client";
    import React, { useState, useEffect, useCallback } from "react";
    import Image from "next/image";
    import { useAtom } from "jotai";
    import Link from "next/link";
    import useEmblaCarousel from 'embla-carousel-react';
    import { featuredProjectsAtom, fetchFeaturedProjectsAtom } from "@/atoms/featuredProjectsAtom";

    const Hero = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gradients: any = {
            [0]: "from-orange-900 via-amber-700 to-rose-700",
            [1]: "from-blue-900 via-blue-700 to-indigo-700",
            [2]: "from-purple-900 via-fuchsia-700 to-pink-700",
        };

        const [mainImage, setMainImage] = useState(0);
        const [isMobile, setIsMobile] = useState(false);

        const [projects] = useAtom(featuredProjectsAtom);
        const [, fetchProjects] = useAtom(fetchFeaturedProjectsAtom);

        // Embla Carousel setup
        const [emblaRef, emblaApi] = useEmblaCarousel({
            loop: true,
            align: 'center',
            skipSnaps: false,
        });

        // Sync main image with carousel slide
        const onSelect = useCallback(() => {
            if (!emblaApi) return;
            setMainImage(emblaApi.selectedScrollSnap());
        }, [emblaApi]);

        useEffect(() => {
            if (!emblaApi) return;
            
            onSelect();
            emblaApi.on('select', onSelect);
            emblaApi.on('reInit', onSelect);

            return () => {
                emblaApi.off('select', onSelect);
                emblaApi.off('reInit', onSelect);
            };
        }, [emblaApi, onSelect]);

        // Navigation function for dots
        const scrollTo = useCallback((index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        }, [emblaApi]);

        useEffect(() => {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 1024); // lg breakpoint
            };

            checkMobile();
            window.addEventListener('resize', checkMobile);
            fetchProjects();

            return () => window.removeEventListener('resize', checkMobile);
        }, []);

        const handleHover = (image: number) => {
            setMainImage(image);
        };

        const handleClick = (image: number) => {
            setMainImage(image);
        };

        return (
            <section className="relative w-full min-h-screen lg:h-screen bg-black overflow-hidden flex items-center justify-center py-8 md:py-12 lg:py-0">

                {/* Gradient Background */}
                <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[90%] sm:w-[80%] md:w-[75%] h-[50%] sm:h-[55%] md:h-[65%] opacity-60 
                    rounded-[40px] blur-[50px] sm:blur-[75px] md:blur-[100px] 
                    bg-linear-to-br ${gradients[mainImage]}
                    transition-all duration-500
                    `}
                ></div>

                {/* Color Overlays - Hidden on Mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-100 hidden sm:block">
                    <div className="absolute left-[5px] top-[35%] w-[300px] md:w-[600px] h-[250px] md:h-[450px] bg-[#ff5a1f] opacity-90 blur-[30px] md:blur-[50px] mix-blend-screen"></div>
                    <div className="absolute left-[5px] top-[15%] w-[300px] md:w-[600px] h-[250px] md:h-[450px] bg-[#c04f4f] opacity-90 blur-[30px] md:blur-[50px] mix-blend-screen"></div>
                    <div className="absolute left-[50px] top-[65%] w-[275px] md:w-[550px] h-[200px] md:h-[400px] bg-[#16095f] opacity-90 blur-[35px] md:blur-[55px] mix-blend-screen"></div>
                    <div className="absolute left-[200px] md:left-[400px] bottom-[5%] w-[300px] md:w-[600px] h-[250px] md:h-[500px] bg-[#6b1540] opacity-80 blur-2xl md:blur-[60px] mix-blend-screen"></div>
                </div>

                <div className="relative z-10 flex h-full items-center w-full justify-center pt-8 md:pt-14">
                    {projects.length > 0 && (
                        <>
                            {/* Mobile Slider View */}
                            {isMobile ? (
                                <div className="w-full h-full flex flex-col items-center justify-center px-4">
                                    {/* Embla Carousel */}
                                    <div className="w-full max-w-lg overflow-hidden" ref={emblaRef}>
                                        <div className="flex">
                                            {(projects || []).slice(0, 3).map((project, i) => (
                                                <div
                                                    key={project?.id}
                                                    className="flex-[0_0_100%] min-w-0 px-2"
                                                >
                                                    <div className="flex flex-col items-center">
                                                        {/* Project Title */}
                                                        <div className="mb-4 text-center">
                                                            <h2 className="uppercase text-white text-2xl sm:text-3xl font-semibold">
                                                                {project?.name}
                                                            </h2>
                                                            <div className="flex flex-wrap justify-center gap-2 mt-2">
                                                                {project?.services?.slice(0, 3).map((service, idx) => (
                                                                    <span 
                                                                        key={service.id} 
                                                                        className="uppercase text-xs sm:text-sm text-gray-400 font-semibold"
                                                                    >
                                                                        {service.title}
                                                                        {idx < Math.min(project.services.length, 3) - 1 && (
                                                                            <span className="ml-2">/</span>
                                                                        )}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Project Image - مع الـ Clip Path */}
                                                        <div
                                                            className="w-full h-[300px] sm:h-[350px] overflow-hidden shadow-2xl relative"
                                                            style={{ 
                                                                clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 85%, 0 0)" 
                                                            }}
                                                        >
                                                            {project?.images?.[0]?.url ? (
                                                                <Image
                                                                    src={project.images[0].url}
                                                                    alt={project.name || "Project Image"}
                                                                    fill
                                                                    priority={i === 0}
                                                                    sizes="(max-width: 640px) 100vw, 500px"
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                                                    <span className="text-gray-500">No image</span>
                                                                </div>
                                                            )}

                                                            {/* Overlay with Get Started Button */}
                                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent">
                                                                <Link 
                                                                    href={`/works/${project.id}`} 
                                                                    aria-label={`Get started with ${project.name}`}
                                                                    className="absolute  left-1/2 -translate-x-1/2 
                                                                    top-1/2 -translate-y-1/2
                                                                        py-3 px-8 cursor-pointer
                                                                        bg-transparent hover:bg-white/30
                                                                        border border-white
                                                                        text-white text-sm font-semibold rounded-full
                                                                        transition-all duration-300 shadow-lg"
                                                                >
                                                                    Get Started
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dots Indicator Only - بدون Arrows */}
                                    <div className="flex items-center justify-center gap-3 mt-6">
                                        {(projects || []).slice(0, 3).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => scrollTo(i)}
                                                aria-label={`Go to slide ${i + 1}`}
                                                className={`h-3 rounded-full transition-all duration-300 ${
                                                    mainImage === i 
                                                        ? 'bg-white w-8' 
                                                        : 'bg-white/40 hover:bg-white/60 w-3'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Desktop View - Original Layout */
                                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 md:gap-8 lg:gap-10 h-full w-[95%] sm:w-[90%] lg:w-[80%]">

                                    {/* Thumbnail Images */}
                                    <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 h-auto lg:h-full order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 w-full lg:w-auto justify-center lg:justify-start">

                                        {(projects || []).slice(0, 3).map((project, i) => (
                                            <div
                                                key={project?.id}
                                                onMouseEnter={() => handleHover(i)}
                                                onClick={() => handleClick(i)}
                                                className="group shrink-0 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] 
                                        h-[100px] sm:h-[120px] md:h-[140px] lg:h-[25%] 
                                        relative overflow-hidden shadow-xl cursor-pointer"
                                                style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                                            >
                                                {project?.images?.[0]?.url ? (
                                                    <Image
                                                        src={project.images[0].url}
                                                        alt={project.name || ""}
                                                        fill
                                                        sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-gray-500">No image</span>
                                                    </div>
                                                )}

                                                <div className={`absolute top-0 right-0 left-0 py-1 lg:py-1.5 ${mainImage === i ? 'bg-blue-400' : 'bg-gray-600'} transition z-10`}>
                                                    <h3 className="text-center text-xs lg:text-sm font-bold text-white">{project.name}</h3>
                                                </div>

                                                <Link href={`/works/${project.id}`} aria-label={`Get started with ${project.name}`} className="absolute bottom-2 lg:bottom-3.5 left-1/2 -translate-x-1/2 
                                            py-1.5 lg:py-2.5 w-[70%] cursor-pointer opacity-0
                                            bg-white/10 backdrop-blur-md border border-white/20
                                            text-white text-xs lg:text-sm font-medium rounded-[50px]
                                            lg:group-hover:opacity-100 hover:bg-white/20 transition z-10 text-center"
                                                >
                                                    Get started
                                                </Link>
                                            </div>
                                        ))}

                                    </div>

                                    {/* Main Content */}
                                    <div className="relative w-full lg:w-[75%] h-full order-1 lg:order-2">
                                        <div className="mb-4 text-center lg:text-left">
                                            <h2 className="uppercase text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                                                {projects[mainImage]?.name}
                                            </h2>
                                            <p className="uppercase text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 mt-2 lg:mt-3 font-semibold px-4 lg:px-0">
                                                {projects[mainImage]?.services?.map((service, i) => (
                                                    <span key={service.id} className="inline-block">
                                                        {service.title}
                                                        {i < projects[mainImage].services.length - 1 && <span className="mx-2">/</span>}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>

                                        {/* Main Image */}
                                        <div
                                            className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[65%] overflow-hidden shadow-2xl mx-auto relative"
                                            style={{
                                                clipPath: "polygon(92% 0, 100% 20%, 100% 100%, 8% 100%, 0 82%, 0 0)"
                                            }}
                                        >
                                            <Image
                                                src={projects[mainImage]?.images[0]?.url}
                                                alt="Main Project Display"
                                                fill
                                                priority
                                                fetchPriority="high"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 75vw"
                                                className="object-cover transition-all duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        );
    };

    export default Hero;