import React, { useEffect, useRef } from 'react'
import OurClients from '../our-clients/OurClients'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Innovation = () => {
    const firstTextRef = useRef<HTMLParagraphElement>(null);
    const secondTextRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (firstTextRef.current && secondTextRef.current) {
            gsap.to(firstTextRef.current, {
                scale: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: firstTextRef.current,
                    start: "top 90%",
                    end: "bottom 10%",
                    scrub: 0.8,         
                },
            });

            gsap.to(secondTextRef.current, {
                scale: 1.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: secondTextRef.current,
                    start: "top 90%",
                    end: "bottom 10%",
                    scrub: 0.8,
                },
            });
        }
    }, []);

    return (
        <div className='bg-black'>
            <div className='flex flex-col items-center pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8'>
                {/* Text Section */}
                <div className='flex flex-col items-center max-w-5xl'>
                    <h2 className='pt-4 sm:pt-6 text-xl sm:text-2xl md:text-3xl lg:text-[45px] text-white text-center italic-font-nr leading-tight'>
                        An independent, award-winning advertising agency
                    </h2>
                    <h2 className='pt-2 sm:pt-4 text-xl sm:text-2xl md:text-3xl lg:text-[45px] text-white text-center italic-font-nr leading-tight'>
                        <span>driven by </span>
                        <span className='text-[#CCB0FA]'>innovation</span>
                        <span> & </span>
                        <span className='text-[#CCB0FA]'>culture</span>
                    </h2>
                </div>

                {/* Video Section */}
                <div className='flex w-full justify-center mt-6 sm:mt-8 md:mt-12 px-2 sm:px-4'>
                    <div className='relative w-full max-w-[1400px] aspect-video bg-black rounded-lg overflow-hidden'>
                        <iframe
                            src={`https://www.youtube.com/embed/oYmU8Av_e84?rel=0&modestbranding=1&controls=0&autoplay=0&showinfo=0`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video"
                            className='absolute top-0 left-0 w-full h-full'
                        ></iframe>
                    </div>
                </div>
            </div>

            <OurClients />

            <div className='w-full flex flex-col items-center h-[60vh] justify-center'>
                <p ref={firstTextRef} className='text-white text-transition text-center font-medium italic text-[40px]'>We bring cultural resonance to brands in the region</p>
                <p ref={secondTextRef} className='text-white second-transition text-center font-bold text-[30px]'>driving growth and delivering measurable impact</p>
            </div>
        </div>
    )
}

export default Innovation