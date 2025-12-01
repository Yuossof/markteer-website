"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Hero = () => {
    const img1 = "https://res.cloudinary.com/db1lfazhq/image/upload/v1762373433/Estate%20Master/austin-distel-gUIJ0YszPig-unsplash_result_imb217.webp";
    const img2 = "https://res.cloudinary.com/db1lfazhq/image/upload/v1762373535/Estate%20Master/austin-distel-wD1LRb9OeEo-unsplash_result_oqzvyq.webp";
    const img3 = "https://res.cloudinary.com/db1lfazhq/image/upload/v1762373301/Estate%20Master/austin-distel-mpN7xjKQ_Ns-unsplash_result_mk0mf2.webp";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gradients: any = {
        [img1]: "from-orange-900 via-amber-700 to-rose-700",
        [img2]: "from-blue-900 via-blue-700 to-indigo-700",
        [img3]: "from-purple-900 via-fuchsia-700 to-pink-700",
    };

    const [mainImage, setMainImage] = useState(img1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if window is available and set initial mobile state
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleHover = (image: string) => {
        setMainImage(image);
    };

    const handleClick = (image: string) => {
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
                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 md:gap-8 lg:gap-10 h-full w-[95%] sm:w-[90%] lg:w-[80%]">

                    {/* Thumbnail Images */}
                    <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 h-auto lg:h-full order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 w-full lg:w-auto justify-center lg:justify-start">

                        {/* IMAGE 1 */}
                        <div
                            onMouseEnter={() => handleHover(img1)}
                            onClick={() => handleClick(img1)}
                            className="group shrink-0 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] 
                            h-[100px] sm:h-[120px] md:h-[140px] lg:h-[25%] 
                            relative overflow-hidden shadow-xl cursor-pointer"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <Image 
                                src={img1}
                                alt="Clubhouse A"
                                fill
                                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                                className="object-cover"
                            />

                            <div className={`absolute top-0 right-0 left-0 py-1 lg:py-1.5 ${mainImage === img1 ? 'bg-blue-400' : 'bg-gray-600'} lg:bg-blue-400 transition z-10`}>
                                <h3 className="text-center text-xs lg:text-sm font-bold text-white">Clubhouse A</h3>
                            </div>

                            <button aria-label="Get started with Clubhouse A" className="absolute bottom-2 lg:bottom-3.5 left-1/2 -translate-x-1/2 
                                py-1.5 lg:py-2.5 w-[70%] cursor-pointer opacity-0
                                bg-white/10 backdrop-blur-md border border-white/20
                                text-white text-xs lg:text-sm font-medium rounded-[50px]
                                lg:group-hover:opacity-100 hover:bg-white/20 transition z-10"
                            >
                                Get started
                            </button>
                        </div>

                        {/* IMAGE 2 */}
                        <div
                            onMouseEnter={() => handleHover(img2)}
                            onClick={() => handleClick(img2)}
                            className="group shrink-0 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] 
                            h-[100px] sm:h-[120px] md:h-[140px] lg:h-[25%] 
                            relative overflow-hidden shadow-xl cursor-pointer"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <Image 
                                src={img2}
                                alt="Clubhouse B"
                                fill
                                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                                className="object-cover"
                            />

                            <div className={`absolute top-0 right-0 left-0 py-1 lg:py-1.5 ${mainImage === img2 ? 'bg-blue-400' : 'bg-gray-600'} lg:group-hover:bg-blue-400 transition z-10`}>
                                <h3 className="text-center text-xs lg:text-sm font-bold text-white">Clubhouse B</h3>
                            </div>

                            <button aria-label="Get started with Clubhouse B" className="absolute bottom-2 lg:bottom-3.5 left-1/2 -translate-x-1/2 
                                py-1.5 lg:py-2.5 w-[70%] cursor-pointer opacity-0
                                bg-white/10 backdrop-blur-md border border-white/20
                                text-white text-xs lg:text-sm font-medium rounded-[50px]
                                lg:group-hover:opacity-100 hover:bg-white/20 transition z-10"
                            >
                                Get started
                            </button>
                        </div>

                        {/* IMAGE 3 */}
                        <div
                            onMouseEnter={() => handleHover(img3)}
                            onClick={() => handleClick(img3)}
                            className="group shrink-0 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] 
                            h-[100px] sm:h-[120px] md:h-[140px] lg:h-[25%] 
                            relative overflow-hidden shadow-xl cursor-pointer"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <Image 
                                src={img3}
                                alt="Clubhouse C"
                                fill
                                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                                className="object-cover"
                            />

                            <div className={`absolute top-0 right-0 left-0 py-1 lg:py-1.5 ${mainImage === img3 ? 'bg-blue-400' : 'bg-gray-600'} lg:group-hover:bg-blue-400 transition z-10`}>
                                <h3 className="text-center text-xs lg:text-sm font-bold text-white">Clubhouse C</h3>
                            </div>

                            <button aria-label="Get started with Clubhouse C" className="absolute bottom-2 lg:bottom-3.5 left-1/2 -translate-x-1/2 
                                py-1.5 lg:py-2.5 w-[70%] cursor-pointer opacity-0
                                bg-white/10 backdrop-blur-md border border-white/20
                                text-white text-xs lg:text-sm font-medium rounded-[50px]
                                lg:group-hover:opacity-100 hover:bg-white/20 transition z-10"
                            >
                                Get started
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="relative w-full lg:w-[75%] h-full order-1 lg:order-2">
                        <div className="mb-4 text-center lg:text-left">
                            <h2 className="uppercase text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                                Marketeer EG
                            </h2>
                            <p className="uppercase text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 mt-2 lg:mt-3 font-semibold px-4 lg:px-0">
                                Welcome to Marketeer EG, your trusted partner in digital marketing
                            </p>
                        </div>

                        {/* Main Image - OPTIMIZED with priority and fetchpriority */}
                        <div
                            className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[65%] overflow-hidden shadow-2xl mx-auto relative"
                            style={{ 
                                clipPath: isMobile
                                    ? "polygon(100% 0, 100% 100%, 0 100%, 0 0)" 
                                    : "polygon(92% 0, 100% 20%, 100% 100%, 8% 100%, 0 82%, 0 0)" 
                            }}
                        >
                            <Image
                                src={mainImage}
                                alt="Main Clubhouse Display"
                                fill
                                priority
                                fetchPriority="high"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 75vw"
                                className="object-cover transition-all duration-500"
                            />
                        </div>

                        {/* Mobile CTA Button */}
                        <div className="mt-6 text-center lg:hidden">
                            <button aria-label="Get Started" className="py-3 px-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;