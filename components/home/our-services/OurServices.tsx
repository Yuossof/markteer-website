import React from 'react'
import { 
    FaShoppingCart, 
    FaVideo, 
    FaBullhorn, 
    FaChartLine, 
    FaShareAlt, 
    FaSearch, 
    FaPalette, 
    FaPen, 
    FaBriefcase 
} from 'react-icons/fa'

const OurServices = () => {
    const services = [
        {
            title: "E-Commerce",
            description: "Eros tempor nostra morbi",
            icon: FaShoppingCart,
            featured: true
        },
        {
            title: "Media Production",
            icon: FaVideo,
            featured: false
        },
        {
            title: "Digital Advertisement",
            icon: FaBullhorn,
            featured: false
        },
        {
            title: "Financial Consultant",
            icon: FaChartLine,
            featured: false
        },
        {
            title: "Social Media",
            icon: FaShareAlt,
            featured: false
        },
        {
            title: "SEO",
            icon: FaSearch,
            featured: false
        },
        {
            title: "Brand Identity",
            icon: FaPalette,
            featured: false
        },
        {
            title: "Content & Social",
            icon: FaPen,
            featured: false
        },
        {
            title: "Business Consultant",
            icon: FaBriefcase,
            featured: false
        }
    ]

    return (
        <section className="relative py-24 overflow-hidden bg-linear-to-br from-[#020616] to-[#060a24]">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent mb-6 tracking-tight">
                        Our Services
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Comprehensive solutions for your digital transformation
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div 
                                key={index}
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                }}
                                className={`group relative backdrop-blur-sm p-8 text-center transition-all duration-500 ease-out cursor-pointer overflow-hidden min-h-[280px] flex flex-col justify-center items-center hover:-translate-y-3 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 ${
                                    service.featured 
                                        ? 'bg-white/5 border border-blue-500/30' 
                                        : 'bg-white/3 border border-white/10'
                                }`}
                            >
                                {/* Top Border */}
                                <div 
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
                                    }}
                                    className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 transition-transform duration-500 ${
                                        service.featured ? '' : 'scale-x-0 group-hover:scale-x-100'
                                    }`} 
                                />
                                
                                {/* Icon */}
                                <div className="relative w-18 h-18 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-blue-500/40"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                    }}
                                >
                                    <div className="absolute inset-0.5 bg-linear-to-br from-[#02071A] to-[#080E2F] transition-opacity duration-500 group-hover:opacity-0"
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))'
                                        }}
                                    />
                                    <IconComponent className="text-2xl text-white relative z-10" />
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-2xl font-semibold text-white mb-4 transition-colors duration-500 group-hover:text-blue-400">
                                    {service.title}
                                </h3>
                                
                                {/* Description */}
                                {service.description && (
                                    <p className="text-slate-400 text-base leading-relaxed opacity-90">
                                        {service.description}
                                    </p>
                                )}
                                
                                {/* Overlay */}
                                <div 
                                    className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default OurServices