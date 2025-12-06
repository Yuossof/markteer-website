import React from 'react'
import { servicesNames } from '@/data/services-data'

const OurServices = () => {
    const services = [
        { name: "Digital & Social Marketing", href: `/services/${servicesNames.socialMediaMarketing}`, description: "Social media campaigns and digital marketing solutions." },
        { name: "Web & Mobile Dev", href: `/services/${servicesNames.webMobileDevelopment}`, description: "Custom web and mobile applications." },
        { name: "Marketing Strategy & Consulting", href: `/services/${servicesNames.marketingConsultancy}`, description: "Expert marketing strategy and business growth guidance." },
        { name: "Photography & Media", href: `/services/${servicesNames.photographyMedia}`, description: "Professional photography and media content." },
        { name: "Media Production", href: `/services/${servicesNames.mediaProduction}`, description: "Empower brands with compelling media content." },
        { name: "Branding Development", href: `/services/${servicesNames.brandingDevelopment}`, description: "Create a compelling brand identity." },
        { name: "Events Planning", href: `/services/${servicesNames.eventsPlanning}`, description: "Comprehensive event planning and execution." },
    ]

    return (
        <section className='px-20'>
            <div className='mt-25'>
                <h2 className='italic-font  text-5xl font-bold'>Services</h2>
                <div className='mt-16'>
                    {services.map((service) => (
                        <div key={service.name} className='flex flex-col gap-2.5 group cursor-pointer'>
                            <span className='uppercase text-[28px] text-gray-500 group-hover:text-white transition-all italic-playfair group-hover:text-[40px] '>{service.name}</span>
                            <div className='group-hover:flex mb-6 hidden ml-2 transition-all items-center gap-5'>
                                <div className='w-1.5 h-9 rounded-lg bg-white rotate-30'></div>
                                <p className='text-[18px]'>{service.description}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className='max-h-[900px]'>
            </div>
        </section>
    )
}

export default OurServices