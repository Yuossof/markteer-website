/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Edit2, Trash2, Loader, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import DescriptionSectionsModal from "./DescriptionSectionsModal";

interface DescriptionSection {
  id: string;
  title: string;
  description: string;
}

interface Project {
  id: string;
  name?: string;
  client?: string;
  clientImage?: string;
  description: string;
  isUpcoming: boolean;
  isFeature: boolean;
  images: { id: string; url: string }[];
  services: { id: string; title: string }[];
  descriptionSections: DescriptionSection[];
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface ProjectsGridProps {
  projects: Project[];
  deletingId: string | null;
  pagination: Pagination;
  onEdit: (project?: Project) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function ProjectsGrid({
  projects,
  deletingId,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
  onPageSizeChange,
}: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewSections = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Services
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Sections
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  {project.images.length > 0 ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={project.images[0].url}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  )}
                </td>

                {/* Project Name */}
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {project.name}
                  </div>
                </td>

                {/* Client */}
                <td className="px-6 py-4">
                  {project.clientImage ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={project.clientImage}
                        alt={project.client || "Client logo"}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ) : project.client ? (
                    <div className="text-sm text-gray-700">{project.client}</div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No logo</span>
                    </div>
                  )}
                </td>

                {/* Description */}
                <td className="px-6 py-4 max-w-xs">
                  <div className="text-sm text-gray-700 line-clamp-2">
                    {project.description}
                  </div>
                </td>

                {/* Services */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.slice(0, 2).map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md whitespace-nowrap"
                      >
                        {s.title}
                      </span>
                    ))}
                    {project.services.length > 2 && (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                        +{project.services.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Image Count */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    {project.images.length}
                  </div>
                </td>

                {/* Description Sections */}
                <td className="px-6 py-4">
                  {project.descriptionSections && project.descriptionSections.length > 0 ? (
                    <button
                      onClick={() => handleViewSections(project)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="View description sections"
                    >
                      <BookOpen className="w-4 h-4" />
                      {project.descriptionSections.length}
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(project)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === project.id ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-gray-700">
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={pagination.pageSize}
              onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span className="text-sm text-gray-600">
            {pagination.total === 0 ? "No projects" : `${(pagination.page - 1) * pagination.pageSize + 1}–${Math.min(pagination.page * pagination.pageSize, pagination.total)} of ${pagination.total}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  page === pagination.page
                    ? "bg-gray-900 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description Sections Modal */}
      {selectedProject && (
        <DescriptionSectionsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          sections={selectedProject.descriptionSections || []}
          projectName={selectedProject.name || ""}
        />
      )}
    </div>
  );
}