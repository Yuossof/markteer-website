import { TModule } from '@/types/project_services'
import React from 'react'

const ServiceModulesSection = ({ data }: { data?: TModule[] }) => {
    return (
        <section className="mt-20 w-full bg-white pt-20 pb-30">
            <h2 className="italic-font lg:text-center text-[22px] lg:text-[40px] leading-[30px] lg:leading-10 font-medium text-[#4051F4]">Service Modules</h2>
            <div className="mx-20 flex justify-center mt-16">
                <div className="grid grid-cols-4 gap-12">
                    {data?.map((item, i) => (
                        <div key={item.id} className="relative w-[250px] h-[220px]">

                            <div
                                className="absolute top-0 left-0 w-[220px] h-60 bg-blue-400 p-px"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 0 100%)'
                                }}
                            >
                                <div
                                    className="w-full h-full bg-white"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)'
                                    }}
                                />
                            </div>

                            <div
                                className="absolute top-2 -left-2 w-[220px] h-60 bg-blue-400 p-px "
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 0 100%)'
                                }}
                            >
                                <div
                                    className="w-full h-full bg-white relative p-4 hover:bg-linear-to-b transition-all from-[#3494e6] to-[#ec6ead] group"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)'
                                    }}
                                >
                                    <h3 className="text-lg  leading-[23px] max-md:text-xs max-md:leading-4  font-semibold wrap-break-word whitespace-pre-line text-blue-600 group-hover:text-white italic-font">
                                        {item.title}
                                    </h3>
                                    <span className="absolute bottom-4 left-4 text-[55px] font-medium safiro leading-none text-[#4051F4] group-hover:text-emerald-200">
                                        0{i+1}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default ServiceModulesSection