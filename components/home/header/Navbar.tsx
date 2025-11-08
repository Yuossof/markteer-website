import Link from 'next/link'
import React from 'react'

const links = [
    { name: "Home", href: "/" },
    { name: "About US", href: "/about-us" },
    { name: "Services", href: "/" },
    { name: "Our Clients", href: "/" },
    { name: "Contact US", href: "/contact-us" },
]

const Navbar = () => {
    return (
        <div className='fixed top-0 left-0 right-0 z-50'>
            <div className='w-full bg-header-background h-[75px] shadow-slate-700/15 shadow-lg px-7 flex items-center justify-between '>
                <div>
                    <h1 className="text-5xl font-extrabold tracking-tight">
                        <span className="text-[#E6F6FE]">Market</span>
                        <span className="text-[#25B4F8]">ee</span>
                        <span className="text-[#1376F8]">r</span>
                    </h1>
                </div>

                <div className='flex items-center gap-6'>
                    {links.map((link) => (
                        <Link key={link.name} className='font-sans text-md' href={link.href}>{link.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar