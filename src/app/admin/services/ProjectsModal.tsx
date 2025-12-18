import React from "react";
import { X, Loader } from "lucide-react";

interface Project {
    id: string;
    title?: string;
    name?: string;
    description?: string;
}

interface ProjectsModalProps {
    isOpen: boolean;
    isLoading: boolean;
    serviceTitle: string | null;
    projects: Project[] | null;
    onClose: () => void;
}

export default function ProjectsModal({
    isOpen,
    isLoading,
    serviceTitle,
    projects,
    onClose,
}: ProjectsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {serviceTitle ? `Projects for ${serviceTitle}` : "Projects"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader className="w-6 h-6 animate-spin text-gray-700" />
                        </div>
                    ) : !projects ? (
                        <p className="text-sm text-gray-600">No project data available.</p>
                    ) : projects.length === 0 ? (
                        <p className="text-sm text-gray-600">No projects associated with this service.</p>
                    ) : (
                        <ul className="space-y-4">
                            {projects.map((project) => (
                                <li key={project.id} className="border border-gray-100 rounded-md p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-900">
                                                {project.title || project.name || "Untitled Project"}
                                            </div>
                                            {project.description && (
                                                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {project.description}
                                                </div>
                                            )}
                                        </div>
                                        <a
                                            href={`/admin/projects/${project.id}`}
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
                                        >
                                            Open →
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
