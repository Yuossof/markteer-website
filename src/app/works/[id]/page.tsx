import ProjectsSwiper from '@/components/home/projects/ProjectsSwipper';
import { TProject } from '@/types/project_services';
import Image from 'next/image';
import React from 'react';
import WorkServices from '@/components/works/WorkServices';

interface PageProps {
    params: {
        id: string;
    };
}

async function getProjectData(projectId: string): Promise<TProject | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/projects/${projectId}`, {
            next: {
                revalidate: 120
            }
        });

        if (!res.ok) {
            console.error(`Failed to fetch project: ${res.status}`);
            return null;
        }

        const data = await res.json();
        return data.project || null;
    } catch (error) {
        console.error('Failed to fetch project:', error);
        return null;
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const resolvedParams = await params;
    const project = await getProjectData(resolvedParams.id);
    console.log(project)

    if (!project) {
        return (
            <div className='container flex flex-col items-center justify-center min-h-screen'>
                <h1 className='text-2xl font-bold text-gray-300'>Project not found</h1>
            </div>
        );
    }

    // Get the primary category for display

    return (
        <div className=' flex flex-col items-center'>
            <div className='flex gap-20 mt-20'>
                <div className='flex flex-col gap-8 border-l-3 border-gray-600 pl-6'>
                    {project.client && (
                        <div>
                            <span className='text-[7px] md:text-[20px] font-medium uppercase text-gray-500'>Client</span>
                            <h4 className='font-medium text-[8px] md:text-[25px] uppercase max-w-[400px] max-md:max-w-[88px] max-md:text-[9px] max-md:font-semibold text-balance'>
                                {project.client}
                            </h4>
                        </div>
                    )}
                    <div>
                        <span className='text-[7px] md:text-[20px] font-medium uppercase text-gray-500'>Title</span>
                        <h4 className='font-medium text-[8px] md:text-[25px] uppercase max-w-[400px] max-md:max-w-[88px] max-md:text-[9px] max-md:font-semibold text-balance'>
                            {project.title || project.name}
                        </h4>
                    </div>

                    <div>
                        <span className='text-[7px] md:text-[20px] font-medium uppercase text-gray-500'>Services</span>
                        <div className='mt-4 flex flex-wrap justify-start gap-2 max-w-[250px]'>
                            {project.services?.slice(0, 20).map((service, index) => (
                                <WorkServices service={service} key={index} />
                            ))}
                        </div>
                    </div>

                    {project.categories && project.categories.length > 0 && (
                        <div>
                            <span className='text-[7px] md:text-[20px] font-medium uppercase text-gray-500'>Categories</span>
                            <div className='flex gap-3 mt-4 flex-wrap'>
                                {project.categories.slice(0, 3).map((category, index) => (
                                    <div key={index} className='px-6 py-2 border-2 border-orange-400 rounded-3xl bg-gray-800'>
                                        {category}
                                    </div>
                                ))}
                                {project.categories.length > 3 && (
                                    <div className='px-6 py-2 border-2 border-gray-600 rounded-3xl bg-gray-800'>
                                        +{project.categories.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div className='relative w-[400px] h-[430px]'>
                        {project.images && project.images.length > 0 && (
                            <Image
                                src={project.images[0].url}
                                fill
                                className='object-cover'
                                alt={project.title || "Project"}
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)",
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='my-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 w-full mt-20 px-4 max-w-[1400px] mx-auto'>
                    {project.descriptionSections.map((section) => (
                        <div key={section.id} className='flex flex-col'>
                            <p className='text-lg md:text-xl lg:text-[25px] font-semibold text-white/70 mb-4 italic'>
                                {section.title}
                            </p>
                            <p className='text-[25px] italic text-white/90 leading-relaxed wrap-break-word'>
                                {section.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {project.images && project.images.length > 0 && (
                <div className='mt-20 w-full'>
                    <h2 className='text-3xl font-bold mb-8 text-center'>Project Images</h2>
                    <ProjectsSwiper images={project.images} />
                </div>
            )}
        </div>
    );
}