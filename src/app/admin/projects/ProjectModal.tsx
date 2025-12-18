/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ImagePlus, Trash2, X, Loader } from "lucide-react";

interface Service {
  id: string;
  title: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  editingId: string | null;
  formData: {
    name: string;
    client: string;
    clientImage: string;
    clientImageFile: File | null;
    description: string;
    services: string[];
    images: string[];
    imageFiles: File[];
    isUpcoming: boolean;
    isFeature: boolean;
  };
  services: Service[];
  shortDescriptions: Array<{ title: string; description: string }>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onServiceToggle: (serviceId: string) => void;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onClientImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveClientImage?: () => void;
  onAddShortDescription: () => void;
  onRemoveShortDescription: (index: number) => void;
  onUpdateShortDescription: (index: number, field: "title" | "description", value: string) => void;
  onToggleIsUpcoming: (value?: boolean) => void;
  onToggleIsFeature?: (value?: boolean) => void;
}

export default function ProjectModal({
  isOpen,
  isSubmitting,
  editingId,
  formData,
  services,
  shortDescriptions,
  onClose,
  onSubmit,
  onInputChange,
  onServiceToggle,
  onAddImage,
  onRemoveImage,
  onFileUpload,
  onRemoveFile,
  onClientImageUpload,
  onRemoveClientImage,
  onAddShortDescription,
  onRemoveShortDescription,
  onUpdateShortDescription,
  onToggleIsUpcoming,
  onToggleIsFeature,
  // onToggleIsFeature,
}: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90%] overflow-y-auto flex flex-col">

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingId ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form onSubmit={onSubmit} className="space-y-5">

            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Project Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="Enter project name"
                disabled={isSubmitting}
              />
            </div>

            {/* Client Name (optional text field) */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-900 mb-2">
                Client Name
              </label>
              <input
                id="client"
                type="text"
                name="client"
                value={formData.client}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="Enter client name"
                disabled={isSubmitting}
              />
            </div>

            {/* Client Image */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Client Logo/Image
              </label>

              {/* Upload Input */}
              <label className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                <ImagePlus className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload client image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onClientImageUpload}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>

              {/* Existing or Selected Image Preview */}
              {(formData.clientImageFile || formData.clientImage) && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-4">
                  <div className="shrink-0 w-20 h-20 bg-gray-200 rounded overflow-hidden">
                    <img
                      src={
                        formData.clientImageFile
                          ? URL.createObjectURL(formData.clientImageFile)
                          : formData.clientImage
                      }
                      alt="Client Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {formData.clientImageFile ? formData.clientImageFile.name : "Client Image"}
                    </p>
                    {formData.clientImageFile && (
                      <p className="text-xs text-gray-500">{(formData.clientImageFile.size / 1024).toFixed(2)} KB</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onRemoveClientImage}
                    disabled={isSubmitting}
                    className="shrink-0 p-1.5 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Upcoming flag */}
            <div className="flex items-center gap-3">
              <input
                id="isUpcoming"
                type="checkbox"
                checked={formData.isUpcoming}
                onChange={() => onToggleIsUpcoming()}
                disabled={isSubmitting}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label htmlFor="isUpcoming" className="text-sm text-gray-900">Mark as upcoming</label>
            </div>

            {/* Feature flag */}
            <div className="flex items-center gap-3">
              <input
                id="isFeature"
                type="checkbox"
                checked={formData.isFeature}
                onChange={() => onToggleIsFeature?.()}
                disabled={isSubmitting}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label htmlFor="isFeature" className="text-sm text-gray-900">Mark as featured</label>
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
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                placeholder="Enter project description"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Related Services
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
                {services.length === 0 ? (
                  <p className="text-sm text-gray-500">No services available</p>
                ) : (
                  services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service.id)}
                        onChange={() => onServiceToggle(service.id)}
                        disabled={isSubmitting}
                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-900">{service.title}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Description Sections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-900">
                  Description Sections
                </label>
                <button
                  type="button"
                  onClick={onAddShortDescription}
                  disabled={isSubmitting}
                  className="flex items-center cursor-pointer gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  + Add Section
                </button>
              </div>

              {shortDescriptions.length === 0 ? (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                  <p className="text-sm text-gray-500">No description sections added</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {shortDescriptions.map((item, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                      <div>
                        <label htmlFor={`sd-title-${idx}`} className="block text-xs font-medium text-gray-700 mb-1.5">
                          Title {idx + 1}
                        </label>
                        <input
                          id={`sd-title-${idx}`}
                          type="text"
                          value={item.title}
                          onChange={(e) => onUpdateShortDescription(idx, "title", e.target.value)}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
                          placeholder="e.g., Performance"
                        />
                      </div>
                      <div>
                        <label htmlFor={`sd-desc-${idx}`} className="block text-xs font-medium text-gray-700 mb-1.5">
                          Description {idx + 1}
                        </label>
                        <textarea
                          id={`sd-desc-${idx}`}
                          value={item.description}
                          onChange={(e) => onUpdateShortDescription(idx, "description", e.target.value)}
                          disabled={isSubmitting}
                          rows={2}
                          className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none text-sm"
                          placeholder="Brief description..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveShortDescription(idx)}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Images */}
            <div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Upload Project Images
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <ImagePlus className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onFileUpload}
                    disabled={isSubmitting}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Uploaded Files Preview */}
              {formData.imageFiles.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Uploaded Files ({formData.imageFiles.length})
                  </h4>
                  <div className="space-y-2">
                    {formData.imageFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div className="shrink-0 w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                          <ImagePlus className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveFile(idx)}
                          disabled={isSubmitting}
                          className="shrink-0 p-1.5 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual URL Entry (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-900">
                    Or Add Image URLs
                  </label>
                  <button
                    type="button"
                    onClick={onAddImage}
                    disabled={isSubmitting}
                    className="flex items-center cursor-pointer gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ImagePlus className="w-4 h-4" />
                    Add URL
                  </button>
                </div>

                {formData.images.length === 0 ? (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <p className="text-sm text-gray-500">No image URLs added</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {formData.images.map((url, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:bg-gray-100 transition-colors"
                      >
                        <div className="shrink-0 w-12 h-12 bg-gray-200 rounded overflow-hidden">
                          <img
                            src={url}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <span className="flex-1 text-sm text-gray-600 truncate">{url}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveImage(idx)}
                          disabled={isSubmitting}
                          className="shrink-0 p-1.5 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : editingId ? (
              "Update Project"
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </div>
    </div>

  );
}
