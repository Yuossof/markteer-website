import React from "react";
import { X, Loader } from "lucide-react";

interface ServiceModule {
    id?: string;
    title: string;
    description: string;
}

interface FormData {
    title: string;
    shortDescription: string;
    description: string;
    modules: ServiceModule[];
}

interface ServiceModalProps {
    isOpen: boolean;
    isSubmitting: boolean;
    isEditing: boolean;
    formData: FormData;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onAddModule: () => void;
    onRemoveModule: (index: number) => void;
    onModuleChange: (index: number, field: "title" | "description", value: string) => void;
}

export default function ServiceModal({
    isOpen,
    isSubmitting,
    isEditing,
    formData,
    onClose,
    onSubmit,
    onInputChange,
    onAddModule,
    onRemoveModule,
    onModuleChange,
}: ServiceModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90%] overflow-y-auto">
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEditing ? "Edit Service" : "Create New Service"}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={onSubmit} className="p-6 space-y-5">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                            Service Title *
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onInputChange}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                            placeholder="e.g., Web Development"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-900 mb-2">
                            Short Description
                        </label>
                        <input
                            id="shortDescription"
                            type="text"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={onInputChange}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                            placeholder="A short summary (one sentence)"
                            disabled={isSubmitting}
                        />
                        <p className="mt-2 text-xs text-gray-500">A concise summary shown on listings (optional)</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={onInputChange}
                            rows={5}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                            placeholder="Describe the service in detail..."
                            required
                            disabled={isSubmitting}
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            Provide a clear and detailed description of the service
                        </p>
                    </div>

                    {/* Service Modules */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Service Modules (Optional)
                            </label>
                            <button
                                type="button"
                                onClick={onAddModule}
                                disabled={isSubmitting}
                                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                            >
                                + Add Module
                            </button>
                        </div>

                        {formData.modules.length > 0 && (
                            <div className="space-y-3 mb-4">
                                {formData.modules.map((module, idx) => (
                                    <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <label className="text-xs font-semibold text-gray-700">Module {idx + 1}</label>
                                            <button
                                                type="button"
                                                onClick={() => onRemoveModule(idx)}
                                                disabled={isSubmitting}
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Module title"
                                            value={module.title}
                                            onChange={(e) => onModuleChange(idx, "title", e.target.value)}
                                            className="w-full px-3 py-2 mb-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                                            disabled={isSubmitting}
                                        />
                                        <textarea
                                            placeholder="Module description"
                                            value={module.description}
                                            onChange={(e) => onModuleChange(idx, "description", e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2.5 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2.5 cursor-pointer text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : isEditing ? (
                                "Update Service"
                            ) : (
                                "Create Service"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
