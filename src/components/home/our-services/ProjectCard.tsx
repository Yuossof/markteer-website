// components/home/our-services/ProjectCard.tsx

import { TProject } from "@/types/project_services";
import Image from "next/image";
import Link from "next/link";

export const ProjectCard = ({ project }: { project: TProject }) => {
    const imageUrl = project.images?.[0]?.url || "/placeholder.jpg";
    const projectName = project.name || project.title || "Untitled Project";

    return (
        <Link href={`/works/${project.id}`} className="flex flex-col gap-4 w-[280px] cursor-pointer group pb-14">
            <div className="overflow-hidden rounded-xs relative">
                <Image
                    src={imageUrl}
                    width={300}
                    height={300}
                    alt={projectName}
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20%), 80% 100%, 0 100%)",
                        objectFit: "cover",
                        objectPosition: "center",
                        width: "300px",
                        height: "300px"
                    }}
                />
            </div>

            <div>
                <h2 className="text-xl uppercase">{projectName}</h2>

                {project.services && project.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {project.services.map((cat, idx) => (
                            <span
                                key={cat.id || idx}
                                className="px-3 py-1 text-sm rounded-full border-2 border-gray-500"
                            >
                                {cat.title}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
};