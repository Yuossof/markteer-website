import React from 'react'
import Snippets from '@/components/careers/Snippets';
import JoinOurTeam from '@/components/careers/JoinOurTeam';

async function getSnippets() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/snippets`, {
            next: {
                revalidate: 60
            }
        })

        if (!res.ok) {
            console.error(`Failed to fetch snippets: ${res.status}`);
            return null;
        }

        const data = await res.json()
        return data.snippets

    } catch (error) {
        console.error('Failed to fetch snippets:', error);
        return null;
    }
}

const page = async () => {
    const snippets = await getSnippets()

    return (
        <div className='w-full px-16'>
            {/* Header Section */}
            <div className='w-full flex justify-center  md:px-16 min-h-screen'>
                <div className='container flex flex-col justify-start items-start mb-24 max-md:mb-7 mt-20 px-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h2 className='text-[22px] md:text-[40px] italic-font font-semibold leading-tight md:leading-[105px] text-white'>
                            Culture at Kijamii
                        </h2>
                        <button className='uppercase cursor-pointer hidden bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 font-medium py-5 px-6 rounded-full w-[239px] h-[71px] md:flex items-center justify-center gap-1 text-xl leading-5 futura'>
                            Join the team
                        </button>
                    </div>
                    <div className='lg:mx-[7px] max-w-[700px]'>
                        <p className='text-[23px] leading-9 max-md:text-[12px] max-md:leading-[25px] mb-4'>
                            Our culture is what we believe a workplace should be; a safe space where creativity, collaboration and curiosity come together to fuel big ideas and bold moves. We’re a diverse team of thinkers, doers, and innovators who believe in working hard, having fun, and pushing boundaries.
                        </p>
                        <p className='text-[23px] mt-5 leading-9 max-md:text-[12px] max-md:leading-[25px] mb-4'>
                            Whether you&apos;re brainstorming with the team in Riyadh, joining a virtual huddle from Dubai, or sharing a coffee with colleagues in Cairo, you'll find a place where your voice matters, your ideas take flight, and every challenge is a new opportunity. Welcome to a culture where we grow, thrive, and create together.
                        </p>
                    </div>
                </div>
            </div>
            <Snippets snippets={snippets} />
            <div className='my-24'></div>
            <JoinOurTeam />
        </div>
    )
}

export default page