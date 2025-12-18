/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { notFound } from 'next/navigation';
import { Link, Share2 } from 'lucide-react';
import ShareButtons from '@/components/careers/ShareButtons';

interface JobDetailsPageProps {
    params: {
        id: string;
    };
}

interface Office {
    id: string
    city: string
}

interface JobDetail {
    id: string;
    title: string;
    description: string;
    imgUrl?: string;
    requirements?: string;
    responsibilities?: string;
    salaryRange?: string;
    jobType?: string;
    location?: string;
    createdAt: Date;
    office: Office
}

async function getJobDetails(id: string): Promise<JobDetail | null> {
    try {

        console.log(id)
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/jobs/${id}`, {
            next: {
                revalidate: 90
            }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.job;
    } catch (error) {
        return null;
    }
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
    const resolvedParams = await params;
    const job = await getJobDetails(resolvedParams.id);
    console.log(job)

    if (!job) {
        notFound();
    }

    return (
        <div className='w-full bg-white min-h-screen'>
            {/* Hero Section */}
            <div className="w-full flex justify-center">
                <div className="w-full max-w-5xl mt-16 px-4">
                    <div
                        className="relative h-[254px] lg:h-[434px] bg-cover bg-center rounded-lg w-full bg-black"
                        style={{
                            backgroundImage: `url("/images/pattern/layered-waves-haikei.svg")`,
                        }}

                    // style={{
                    //     backgroundImage: `url("/images/pattern/low-poly-grid-haikei (3).svg")`,
                    // }}

                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 rounded-lg -z-1" />

                        {/* Title */}
                        <div className="absolute -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 p-6 lg:p-10">
                            <div className='flex flex-col items-center'>
                                <h1 className="text-3xl lg:text-5xl text-[24px] md:text-[60px] font-extrabold mb-2 md:mb-4 text-white text-center md:leading-[70px]">
                                    {job.title}
                                </h1>
                                <span className='italic-font text-[20px] md:text-[50px] text-white w-full text-center relative'>{job.office.city}</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 absolute bottom-5 right-4'>
                            <ShareButtons />
                        </div>
                    </div>
                </div>
            </div>


            {/* Content Section */}
            <div className='w-full flex justify-center px-4 py-12 lg:py-16'>
                <div className='xl:min-w-5xl w-full max-w-4xl md:px-14'>
                    {/* Description */}
                    {job.description && (
                        <div className='mb-12'>
                            <div
                                className='prose prose-lg max-w-none text-gray-700 tiptap-content'
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                        </div>
                    )}


                    {/* Salary */}
                    {job.salaryRange && (
                        <div className='mb-12 p-6 bg-gray-100 rounded-lg'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                Salary Range
                            </h3>
                            <p className='text-gray-700'>
                                {job.salaryRange}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}