"use client"
import { TProject } from '@/types/project_services'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CaseStudies = ({ projects }: { projects?: TProject[] }) => {
    return (
        <div className='relative overflow-hidden flex justify-center w-full'>
            <div
                className="
    pointer-events-none
    absolute
    -bottom-48
    -left-48
    w-[900px]
    h-[900px]
    rounded-full
    bg-linear-to-tr
    from-[#0b2fff]/60
    via-[#1376f8]/40
    bg-black
    to-transparent
    blur-[140px]
  "
            />


            <div className='px-15 z-10 flex flex-col gap-20 pb-14'>

                <h2 className='italic-font text-center text-[40px] md:text-5xl leading-[34px] mb-12 text-white mt-20'>Case Studies</h2>
                <div className='grid grid-cols-4 gap-20'>
                    {projects?.map((project) => (
                        <div key={project.id}>
                            <Link href={`/works/${project.id}`} className="block">
                                <div className="relative w-[200px] h-[200px]">
                                    {project.images?.[0]?.url && (
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
                                    )}
                                </div>

                                <div className="max-w-[200px]">
                                    <span className="font-semibold text-lg mt-5 block">CLIENT</span>
                                    <h2 className="italic-font-nr uppercase font-medium text-xl mt-3">
                                        {project.name}
                                    </h2>
                                </div>
                            </Link>

                            <div className="mt-3 flex gap-3 flex-wrap max-w-[200px]">
                                {project.services?.slice(0, 5).map((service) => (
                                    <Link
                                        href={`/services/${service.id}`}
                                        key={service.id}
                                        className="text-[10px] uppercase font-medium leading-[22px] text-opacity-80 bg-gray-800/50 px-3 py-1 rounded-2xl hover:border-slate-600 transition border border-transparent"
                                    >
                                        {service.title}
                                    </Link>
                                ))}

                                {project.services && project.services.length > 4 && (
                                    <span className="text-[10px] uppercase font-medium leading-[22px] text-opacity-80 bg-gray-900 px-3 py-1 rounded-2xl">
                                        +{project.services.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>

                    ))}
                </div>
            </div>



        </div>
    )
}

export default CaseStudies