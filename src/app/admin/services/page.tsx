/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Plus, AlertCircle, CheckCircle, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ServicesTable from "./ServicesTable";
import ServiceModal from "./ServiceModal";
import ProjectsModal from "./ProjectsModal";

interface Service {
    id: string;
    title: string;
    description: string;
    shortDescription?: string;
    projects?: any[];
    modules?: ServiceModule[];
}

interface ServiceModule {
    id?: string;
    title: string;
    description: string;
}

export default function AdminServicesPage() {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        shortDescription: "",
        description: "",
        modules: [] as ServiceModule[]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [projectsModalOpen, setProjectsModalOpen] = useState(false);
    const [projectsLoading, setProjectsLoading] = useState(false);
    const [serviceProjects, setServiceProjects] = useState<any[] | null>(null);
    const [activeServiceTitle, setActiveServiceTitle] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/services");
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to fetch services");
                return;
            }

            setServices(data.services || []);
            setError("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (service?: Service) => {
        if (service) {
            setEditingId(service.id);
            setFormData({
                title: service.title,
                shortDescription: service.shortDescription || "",
                description: service.description,
                modules: (service.modules || []).map((m: any) => ({
                    id: m?.id,
                    title: m?.title ?? "",
                    description: m?.description ?? ""
                }))
            });
        } else {
            setEditingId(null);
            setFormData({
                title: "",
                shortDescription: "",
                description: "",
                modules: []
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ title: "", shortDescription: "", description: "", modules: [] });
        setEditingId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const url = editingId ? `/api/services/${editingId}` : "/api/services/create";
            const method = editingId ? "PUT" : "POST";

            // Sanitize form data: filter out modules with empty title/description
            const sanitizedFormData = {
                ...formData,
                modules: (formData.modules || []).filter(
                    (m) => (m.title ?? "").trim() && (m.description ?? "").trim()
                )
            };

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sanitizedFormData)
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle error response: convert object to string if needed
                let errorMessage = `Failed to ${editingId ? "update" : "create"} service`;
                if (data.error) {
                    if (typeof data.error === "string") {
                        errorMessage = data.error;
                    } else if (typeof data.error === "object") {
                        // Convert error object to readable string
                        errorMessage = JSON.stringify(data.error);
                    }
                }
                setError(errorMessage);
                return;
            }

            setSuccess(`Service ${editingId ? "updated" : "created"} successfully!`);
            handleCloseModal();
            fetchServices();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            setDeletingId(id);
            setError("");
            setSuccess("");

            const response = await fetch(`/api/services/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to delete service");
                return;
            }

            setSuccess("Service deleted successfully!");
            fetchServices();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setDeletingId(null);
        }
    };

    const handleViewProjects = async (id: string) => {
        try {
            setProjectsLoading(true);
            setServiceProjects(null);
            setActiveServiceTitle(null);

            // Try to get projects from already-fetched services
            const local = services.find(s => s.id === id);
            if (local && Array.isArray(local.projects)) {
                setServiceProjects(local.projects);
                setActiveServiceTitle(local.title);
                setProjectsModalOpen(true);
                return;
            }

            // Fallback: fetch single service details (includes projects)
            const response = await fetch(`/api/services/${id}`);
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to fetch service projects");
                return;
            }

            setServiceProjects(data.service?.projects || []);
            setActiveServiceTitle(data.service?.title || null);
            setProjectsModalOpen(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setProjectsLoading(false);
        }
    };

    const handleAddModule = () => {
        setFormData(prev => ({
            ...prev,
            modules: [...prev.modules, { title: "", description: "" }]
        }));
    };

    const handleRemoveModule = (index: number) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.filter((_, i) => i !== index)
        }));
    };

    const handleModuleChange = (index: number, field: "title" | "description", value: string) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.map((m, i) => 
                i === index ? { ...m, [field]: value } : m
            )
        }));
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push("/admin")}
                        className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Dashboard</span>
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Services</h1>
                            <p className="text-gray-600">Manage your service offerings</p>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Service
                        </button>
                    </div>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-red-800 flex-1">{error}</span>
                        <button onClick={() => setError("")} className="shrink-0 cursor-pointer">
                            <X className="w-4 h-4 text-red-600" />
                        </button>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-green-800 flex-1">{success}</span>
                        <button onClick={() => setSuccess("")} className="shrink-0 cursor-pointer">
                            <X className="w-4 h-4 text-green-600" />
                        </button>
                    </div>
                )}

                {/* Services Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="w-10 h-10 border-2 border-gray-900 border-t-gray-300 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600 text-sm">Loading services...</p>
                        </div>
                    </div>
                ) : (
                    <ServicesTable
                        services={services}
                        deletingId={deletingId}
                        onEdit={handleOpenModal}
                        onDelete={handleDelete}
                        onViewProjects={handleViewProjects}
                        onAddNew={() => handleOpenModal()}
                    />
                )}

                {/* Service Modal */}
                <ServiceModal
                    isOpen={isModalOpen}
                    isSubmitting={isSubmitting}
                    isEditing={editingId !== null}
                    formData={formData}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    onInputChange={handleInputChange}
                    onAddModule={handleAddModule}
                    onRemoveModule={handleRemoveModule}
                    onModuleChange={handleModuleChange}
                />

                {/* Projects Modal */}
                <ProjectsModal
                    isOpen={projectsModalOpen}
                    isLoading={projectsLoading}
                    serviceTitle={activeServiceTitle}
                    projects={serviceProjects}
                    onClose={() => {
                        setProjectsModalOpen(false);
                        setServiceProjects(null);
                        setActiveServiceTitle(null);
                    }}
                />
            </div>
        </div>
    );
}
