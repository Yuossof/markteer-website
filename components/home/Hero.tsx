"use client";
import React, { useState } from "react";

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

    const handleHover = (image: string) => {
        setMainImage(image);
    };

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

            <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[75%] h-[65%] opacity-60 
                rounded-[40px] blur-[100px] 
                bg-linear-to-br ${gradients[mainImage]}
                `}
            ></div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-100">
                <div className="absolute left-[5px] top-[35%] w-[600px] h-[450px] bg-[#ff5a1f] opacity-90 blur-[50px] mix-blend-screen"></div>
                <div className="absolute left-[5px] top-[15%] w-[600px] h-[450px] bg-[#c04f4f] opacity-90 blur-[50px] mix-blend-screen"></div>
                <div className="absolute left-[50px] top-[65%] w-[550px] h-[400px] bg-[#16095f] opacity-90 blur-[55px] mix-blend-screen"></div>
                <div className="absolute left-[400px] bottom-[5%] w-[600px] h-[500px] bg-[#6b1540] opacity-80 blur-[60px] mix-blend-screen"></div>
            </div>

            <div className="relative z-10 flex h-full items-center w-full justify-center pt-14">
                <div className="relative z-10 flex items-start justify-center gap-10 h-full w-[80%] ">

                    <div className="flex flex-col gap-6 h-full">

                        <div
                            onMouseEnter={() => handleHover(img1)}
                            className="group w-[260px] h-[25%] relative overflow-hidden shadow-xl"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img1})` }}></div>

                            <div className="absolute top-0 right-0 left-0 py-1.5 bg-blue-400">
                                <h3 className="text-center text-sm font-bold">Clubhouse A</h3>
                            </div>

                            <button className="absolute bottom-3.5 left-1/2 -translate-x-1/2 
                                py-2.5 w-[70%] cursor-pointer opacity-0
                                bg-white/10 backdrop-blur-md border border-white/20
                                text-white font-medium rounded-[50px]
                                group-hover:opacity-100 hover:bg-white/20 transition"
                            >
                                Get started
                            </button>
                        </div>

                        {/* IMAGE 2 */}
                        <div
                            onMouseEnter={() => handleHover(img2)}
                            className="group w-[260px] h-[25%] relative overflow-hidden shadow-xl"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img2})` }}></div>

                            <div className="absolute top-0 right-0 left-0 py-1.5 bg-gray-600 group-hover:bg-blue-400 transition">
                                <h3 className="text-center text-sm font-bold">Clubhouse B</h3>
                            </div>

                            <button className="absolute bottom-3.5 left-1/2 -translate-x-1/2 
                                py-2.5 w-[70%] cursor-pointer opacity-0
                                bg-white/10 backdrop-blur-md border border-white/20
                                text-white font-medium rounded-[50px]
                                group-hover:opacity-100 hover:bg-white/20 transition"
                            >
                                Get started
                            </button>
                        </div>

                        {/* IMAGE 3 */}
                        <div
                            onMouseEnter={() => handleHover(img3)}
                            className="group w-[260px] h-[25%] relative overflow-hidden shadow-xl"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img3})` }}></div>

                            <div className="absolute top-0 right-0 left-0 py-1.5 bg-gray-600 group-hover:bg-blue-400 transition">
                                <h3 className="text-center text-sm font-bold">Clubhouse C</h3>
                            </div>

                            <button className="absolute bottom-3.5 left-1/2 -translate-x-1/2 
                                py-2.5 w-[70%] cursor-pointer opacity-0
                                bg-white/10 backdrop-blur-md border border-white/20
                                text-white font-medium rounded-[50px]
                                group-hover:opacity-100 hover:bg-white/20 transition"
                            >
                                Get started
                            </button>
                        </div>
                    </div>

                    {/* الصورة الأساسية */}
                    <div className="relative w-[75%] h-full">
                        <div className="mb-4">
                            <h2 className="uppercase text-white text-5xl font-semibold">Marketeer EG</h2>
                            <p className="uppercase text-lg text-gray-400 mt-3 font-semibold">
                                Welcome to Marketeer EG, your trusted partner in digital marketing
                            </p>
                        </div>

                        <div
                            className="flex-1 h-[65%] overflow-hidden shadow-2xl"
                            style={{ clipPath: "polygon(92% 0, 100% 20%, 100% 100%, 8% 100%, 0 82%, 0 0)" }}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${mainImage})` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
