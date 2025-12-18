/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { X } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";

interface JobModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  editingId: string | null;
  formData: {
    title: string;
    description: string;
    teamId: string;
    officeId?: string;
    imgUrl: string;
    imageFile: File | null;
  };
  teams: any[];
  offices?: any[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function JobModal({
  isOpen,
  isSubmitting,
  editingId,
  formData,
  teams,
  offices,
  onClose,
  onSubmit,
  onInputChange,
  onFileUpload,
}: JobModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {editingId ? "Edit Job" : "Create New Job"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Office */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office</label>
            <select
              name="officeId"
              value={formData.officeId || ""}
              onChange={onInputChange}
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Select an office</option>
              {offices?.map((office) => (
                <option key={office.id} value={office.id}>
                  {office.city}
                </option>
              ))}
            </select>
          </div>
          {/* Team */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team
            </label>
            <select
              name="teamId"
              value={formData.teamId}
              onChange={onInputChange}
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.title}
                </option>
              ))}
            </select>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              placeholder="Enter job title"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Description - Tiptap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <RichTextEditor
              value={formData.description}
              onChange={(value) =>
                onInputChange({
                  target: {
                    name: "description",
                    value,
                  },
                } as any)
              }
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileUpload}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            {formData.imageFile && (
              <p className="text-sm text-green-600 mt-1">
                ✓ {formData.imageFile.name}
              </p>
            )}

            {formData.imgUrl && !formData.imageFile && (
              <p className="text-sm text-gray-600 mt-1">
                Current: {formData.imgUrl}
              </p>
            )}
          </div>

          {/* Actions */}
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
              {isSubmitting
                ? "Saving..."
                : editingId
                ? "Update Job"
                : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
