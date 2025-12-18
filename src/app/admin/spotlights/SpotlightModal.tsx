/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { X, ImagePlus, Loader } from "lucide-react";

interface SpotlightModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  editingId: string | null;
  formData: {
    imgUrl: string;
    type: string;
    title: string;
    link: string;
    description: string;
    imageFile: File | null;
  };
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

export default function SpotlightModal({
  isOpen,
  isSubmitting,
  editingId,
  formData,
  onClose,
  onSubmit,
  onInputChange,
  onFileUpload,
  onRemoveFile,
}: SpotlightModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingId ? "Edit Spotlight" : "Create New Spotlight"}
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-900 mb-2">
                Type *
              </label>
              <input
                id="type"
                type="text"
                name="type"
                value={formData.type}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="e.g., Featured, Trending"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="Spotlight title"
                required
                disabled={isSubmitting}
              />
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
                rows={3}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                placeholder="Spotlight description"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Link */}
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-900 mb-2">
                Link *
              </label>
              <input
                id="link"
                type="url"
                name="link"
                value={formData.link}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="https://example.com"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Image
              </label>

              {/* Current Image Preview */}
              {formData.imgUrl && !formData.imageFile && (
                <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <img
                    src={formData.imgUrl}
                    alt="Current"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-2">Current image</p>
                </div>
              )}

              {/* File Upload */}
              <label className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                <ImagePlus className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileUpload}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>

              {/* Selected File Preview */}
              {formData.imageFile && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-blue-700">{formData.imageFile.name}</span>
                  <button
                    type="button"
                    onClick={onRemoveFile}
                    disabled={isSubmitting}
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
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
              "Update Spotlight"
            ) : (
              "Create Spotlight"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
