"use client";
import React from "react";

const Hero = () => {
    const img1 = "https://res.cloudinary.com/db1lfazhq/image/upload/v1762373433/Estate%20Master/austin-distel-gUIJ0YszPig-unsplash_result_imb217.webp"
    const img2 = "https://res.cloudinary.com/db1lfazhq/image/upload/v1762373535/Estate%20Master/austin-distel-wD1LRb9OeEo-unsplash_result_oqzvyq.webp"
    const img3 = "https://res.cloudinary.com/db1lfazhq/image/upload/v1762373301/Estate%20Master/austin-distel-mpN7xjKQ_Ns-unsplash_result_mk0mf2.webp"
    const img4 = "https://res.cloudinary.com/db1lfazhq/image/upload/v1762373397/Estate%20Master/charlesdeluvio-Lks7vei-eAg-unsplash_result_bvgwis.webp"

    return (
        <section className="w-full h-screen flex items-center justify-center relative bg-linear-to-br from-slate-950 via-slate-950 to-slate-900 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-100">
                <div className="absolute left-[5px] top-[35%] w-[600px] h-[450px] bg-[#ff5a1f] opacity-90 blur-[50px] mix-blend-screen"></div>
                <div className="absolute left-[5px] top-[15%] w-[600px] h-[450px] bg-[#c04f4f] opacity-90 blur-[50px] mix-blend-screen"></div>
                <div className="absolute left-[50px] top-[65%] w-[550px] h-[400px] bg-[#16095f] opacity-90 blur-[55px] mix-blend-screen"></div>
                <div className="absolute left-[400px] bottom-[5%] w-[600px] h-[500px] bg-[#6b1540] opacity-80 blur-[60px] mix-blend-screen"></div>
            </div>

            <div className="flex h-full items-center w-full justify-center pt-14">
                <div className="relative z-10 flex items-start justify-center gap-10 h-full w-[80%] ">

                    <div className="flex flex-col gap-6 h-full">
                        <div
                            className="w-[260px] h-[25%] relative overflow-hidden shadow-xl"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img2})` }}
                            ></div>

                            <div className="absolute top-0 right-0 left-0 py-1.5 bg-blue-400">
                                <h3 className="text-center text-sm font-bold">First Ever FC25 Clubhouse</h3>
                            </div>
                        </div>

                        <div
                            className="w-[260px] h-[25%] relative overflow-hidden shadow-xl group"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img3})` }}
                            ></div>
                            <div className="absolute top-0 right-0 left-0 py-1.5 bg-[#444444] group-hover:bg-blue-400 transition-all">
                                <h3 className="text-center text-sm font-bold">First Ever FC25 Clubhouse</h3>
                            </div>


                            <button
                                className=" group-hover:opacity-100
    py-2.5 w-[70%] cursor-pointer opacity-0
    absolute bottom-3.5 -translate-x-1/2 left-1/2 
    bg-white/10 backdrop-blur-md 
    border border-white/20
    text-white font-medium 
    rounded-[50px]
    hover:bg-white/20 transition
  "
                            >
                                Get started
                            </button>

                        </div>

                        <div
                            className="w-[260px] relative h-[25%] overflow-hidden shadow-xl group"
                            style={{ clipPath: "polygon(92% 0, 100% 15%, 100% 100%, 8% 100%, 0 92%, 0 0)" }}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img4})` }}
                            ></div>

                            <div className="absolute top-0 right-0 left-0 py-1.5 bg-[#444444] group-hover:bg-blue-400">
                                <h3 className="text-center text-sm font-bold">First Ever FC25 Clubhouse</h3>
                            </div>

                            <button
                                className=" group-hover:opacity-100
    py-2.5 w-[70%] cursor-pointer opacity-0
    absolute bottom-3.5 -translate-x-1/2 left-1/2 
    bg-white/10 backdrop-blur-md 
    border border-white/20
    text-white font-medium 
    rounded-[50px]
    hover:bg-white/20 transition
  "
                            >
                                Get started
                            </button>
                        </div>
                    </div>

                    <div className="relative w-[75%] h-full">
                        <div className="mb-4">
                            <h2 className="uppercase text-white text-5xl font-semibold tracking-wide drop-shadow-lg">
                                Marketeer eg
                            </h2>
                            <p className="uppercase text-lg text-gray-400 mt-3 font-semibold">Welcome to Marketeer EG, your trusted partner in digital marketing</p>
                        </div>
                        <div
                            className="flex-1 h-[65%] overflow-hidden shadow-2xl"
                            style={{ clipPath: "polygon(92% 0, 100% 20%, 100% 100%, 8% 100%, 0 82%, 0 0)" }}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img1})` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 w-16 h-16 border border-white/10 rounded-lg rotate-12"></div>
            <div className="absolute top-20 left-12 w-8 h-8 bg-white/5 rounded-full"></div>
        </section>
    );
};

export default Hero;
