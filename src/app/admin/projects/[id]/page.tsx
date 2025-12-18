/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Trash2, Loader } from "lucide-react";

interface Image {
  id: string;
  url: string;
}

interface Service {
  id: string;
  title: string;
}

interface ProjectDetail {
  id: string;
  name: string;
  client?: string | null;
  description?: string | null;
  images: Image[];
  services: Service[];
}

export default function AdminProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load project");
          return;
        }
        setProject(data.project || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete project");
        return;
      }
      router.push("/admin/projects");
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin/projects")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Projects</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-6 h-6 animate-spin text-gray-700" />
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : !project ? (
          <div className="p-6 bg-white border border-gray-200 rounded-md">
            <p className="text-sm text-gray-700">Project not found.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-100 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                {project.client && <p className="text-sm text-gray-600">Client: {project.client}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 py-2 text-sm cursor-pointer text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50"
                >
                  {deleting ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 inline" />}
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Images */}
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {project.images.map((img) => (
                    <div key={img.id} className="rounded overflow-hidden bg-gray-100">
                      <img src={img.url} alt={project.name} className="w-full h-56 object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {project.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{project.description}</p>
                </div>
              )}

              {/* Services */}
              {project.services && project.services.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span key={s.id} className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
