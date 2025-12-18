/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { X } from "lucide-react";

interface SnippetModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  editingId: string | null;
  formData: { existingUrl: string; imageFiles: File[] };
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImageFile: (index: number) => void;
  onRemoveExistingUrl: () => void;
}

export default function SnippetModal({
  isOpen,
  isSubmitting,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFileUpload,
  onRemoveImageFile,
  onRemoveExistingUrl
}: SnippetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">{editingId ? "Edit Snippet" : "Create New Snippet"}</h2>
          <button onClick={onClose} className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Snippet Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onFileUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            {formData.existingUrl && (
              <div className="mt-3 relative w-40">
                <img src={formData.existingUrl} alt="existing" className="w-full h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => onRemoveExistingUrl()}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1"
                  aria-label="Remove existing image"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}

            {formData.imageFiles && formData.imageFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {formData.imageFiles.map((file, idx) => (
                  <div key={`new-${idx}`} className="relative">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => onRemoveImageFile(idx)}
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1"
                      aria-label="Remove selected image"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving..." : editingId ? "Update Snippet" : "Create Snippet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
