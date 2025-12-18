"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ServiceHeroSection = ({ data }: {data: {title: string, description: string}}) => {
    const textRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        const words = element.innerText.split(" ");
        element.innerHTML = "";

        words.forEach((word) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.style.opacity = "0.1";
            span.style.display = "inline-block";
            span.style.marginRight = "8px";
            span.style.transition = "opacity 0.3s ease";
            element.appendChild(span);
        });

        gsap.to(element.children, {
            opacity: 1,
            stagger: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top 35%",
                end: "top 20%",
                scrub: 1,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="flex gap-6 container lg:pt-[70px] lg:pl-[90px] lg:mt-10 relative min-h-screen">
            <div className="flex">
                <h1 className="italic-font text-[#FFF6F6] lg:text-6xl text-[40px] min-w-fit">
                    <span>Services</span>
                    <span className="font-extrabold ml-2">/</span>
                </h1>
            </div>
            <div className="mt-9">
                <p className="lg:text-6xl text-[40px] font-bold leading-[55px] uppercase text-[#4051F4]">
                    {data.title}
                </p>
                <p
                    ref={textRef}
                    className="text-white text-[23px]  mt-3 md:max-w-[663px] leading-relaxed"
                >
                    {data.description}
                </p>
            </div>
        </section>
    )
}

export default ServiceHeroSection