/* eslint-disable @next/next/no-img-element */
"use client";

import { TSpotlight } from "@/types/spotlights";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Spotlights = () => {
    const [spotlights, setSpotlights] = useState<TSpotlight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpotlights = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/spotlights?page=1&pageSize=4`
                );

                if (!res.ok) {
                    console.error(`Failed to fetch spotlights: ${res.status}`);
                    return;
                }

                const data = await res.json();
                setSpotlights(data.spotlights || []);
            } catch (error) {
                console.error("Failed to fetch spotlights:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpotlights();
    }, []);

    if (loading) {
        return null; 
    }

    return (
        <div className="relative">
            {/* Background */}
            <div
                className="absolute inset-0 w-full -z-10"
                style={{
                    background: `
            linear-gradient(
              to top,
              #AA486C 0%,
              #562C5B 50%,
              #000000 100%
            )
          `,
                }}
            />

            <div className="min-h-screen w-full flex justify-center">
                <div className="container px-[70px] ">
                    <div>
                        {/* Newsletter */}
                        <div className="w-full flex justify-end mt-20">
                            <button className="flex gap-2 items-center cursor-pointer">
                                <p className="italic text-[25px]">Join Our Newsletter</p>
                                <ChevronRightIcon />
                            </button>
                        </div>

                        {/* Spotlights */}
                        <div className="grid grid-cols-2 gap-7 group mt-24">
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
                  hover:opacity-100 mt-8
                "
                                >
                                    {/* Image */}
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

                                    {/* Content */}
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
                    <div className="w-full flex justify-center mt-20">
                        <Link href={"/spotlights"} className="mb-[113px] px-[18px] py-[12.5px] rounded-full border border-white bg-transparent text-white font-medium text-lg leading-[160%] flex items-center justify-center gap-[5px] hover:bg-gray-50 hover:text-black transition">
                            Explore More
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Spotlights;
