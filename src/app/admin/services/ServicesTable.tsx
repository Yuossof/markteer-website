import React from "react";
import { Edit2, Eye, Trash2, Loader, Plus } from "lucide-react";

interface Service {
    id: string;
    title: string;
    description: string;
    shortDescription?: string;
}

interface ServicesTableProps {
    services: Service[];
    deletingId: string | null;
    onEdit: (service: Service) => void;
    onDelete: (id: string) => void;
    onViewProjects: (id: string) => void;
    onAddNew: () => void;
}

export default function ServicesTable({
    services,
    deletingId,
    onEdit,
    onDelete,
    onViewProjects,
    onAddNew,
}: ServicesTableProps) {
    if (services.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <div className="max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No services yet</h3>
                    <p className="text-gray-600 text-sm mb-6">Get started by creating your first service</p>
                    <button
                        onClick={onAddNew}
                        className="px-5 py-2.5 bg-gray-900 cursor-pointer text-white text-sm font-medium hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        Create Service
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.map((service, index) => (
                            <tr
                                key={service.id}
                                className={`hover:bg-gray-50 transition-colors ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                }`}
                            >
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {service.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600 max-w-md">
                                        <p className="line-clamp-2 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(service)}
                                            className="p-2 text-gray-600 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Edit service"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onViewProjects(service.id)}
                                            className="p-2 text-blue-600 cursor-pointer hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View projects"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(service.id)}
                                            disabled={deletingId === service.id}
                                            className="p-2 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="Delete service"
                                        >
                                            {deletingId === service.id ? (
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

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                    Total: <span className="font-medium text-gray-900">{services.length}</span>{" "}
                    {services.length === 1 ? "service" : "services"}
                </p>
            </div>
        </div>
    );
}
