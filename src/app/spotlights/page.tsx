import { TSpotlight } from '@/types/spotlights';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function getSpotlights(): Promise<TSpotlight[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/spotlights`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error(`Failed to fetch spotlights: ${res.status}`);
            return [];
        }

        const data = await res.json();
        return Array.isArray(data.spotlights) ? data.spotlights : [];
    } catch (error) {
        console.error('Failed to fetch spotlights:', error);
        return [];
    }
}


const page = async () => {
    const spotlights = await getSpotlights() as TSpotlight[]


    return (

        <div className='relative '>
            <div
                className="absolute inset-0 w-full -z-1"
                style={{
                    background: `
      linear-gradient(
        to top,
        #AA486C 0%,
        #562C5B 50%,
        #000000 100%
      )
    `
                }}
            />
            <div className='min-h-screen w-full flex justify-center'>
                <div className='container px-[70px] '>
                    <div className='w-full flex justify-end mt-20'>
                        <button className='flex gap-2 items-center cursor-pointer'>
                            <p className='italic text-[25px]'>Join Our Newsletter</p>
                            <ChevronRightIcon />
                        </button>
                    </div>

                    <div className='container grid grid-cols-2 gap-7 group mt-25'>
                        {spotlights.length === 0 && (
                            <p className="text-white/50 mt-20 text-center">
                                No spotlights available right now
                            </p>
                        )}
                        {spotlights.map((spotlight) => (
                            <Link
                                key={spotlight.id}
                                href={spotlight.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
        flex gap-8 items-center
        opacity-100
        transition-opacity duration-300
        group-hover:opacity-50
        hover:opacity-100
      "
                            >
                                <div className="relative w-[300px] h-[180px] shrink-0">
                                    <Image
                                        src={spotlight.imgUrl}
                                        alt={spotlight.title}
                                        fill
                                        className="object-cover"
                                        style={{
                                            clipPath:
                                                "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <span className="uppercase text-lg font-medium text-[#CCB0FA]">
                                        {spotlight.type}
                                    </span>
                                    <div>
                                        <p className="text-[18.16px] max-w-[298.15px] italic-font-nr">
                                            {spotlight.title}
                                        </p>
                                        <p className="font-medium text-sm text-white/40 mt-2.5">
                                            {spotlight.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page