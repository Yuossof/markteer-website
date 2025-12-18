"use client";

import React, { useEffect } from "react";
import { Plus, AlertCircle, CheckCircle, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SnippetsGrid from "./SnippetsGrid";
import SnippetModal from "./SnippetModal";
import { useSnippetHandlers } from "./useSnippetHandlers";

export default function AdminSnippetsPage() {
  const router = useRouter();
  const {
    snippets,
    isLoading,
    error,
    success,
    isModalOpen,
    editingId,
    isSubmitting,
    deletingId,
    formData,
    pagination,
    setError,
    setSuccess,
    fetchData,
    handleOpenModal,
    handleCloseModal,
    handleFileUpload,
    removeImageFile,
    removeExistingUrl,
    handleSubmit,
    handleDelete,
    handlePageChange,
    handlePageSizeChange,
  } = useSnippetHandlers();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Snippets</h1>
              <p className="text-gray-600">Manage career snippets</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Snippet
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span className="text-sm text-red-800">{error}</span>
            <button onClick={() => setError("")} className="ml-auto cursor-pointer">
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <span className="text-sm text-green-800">{success}</span>
            <button onClick={() => setSuccess("")} className="ml-auto cursor-pointer">
              <X className="w-4 h-4 text-green-600" />
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-gray-900 border-t-gray-300 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm">Loading snippets...</p>
            </div>
          </div>
        ) : snippets.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No snippets yet</h3>
              <p className="text-gray-600 text-sm mb-6">Create your first snippet</p>
              <button
                onClick={() => handleOpenModal()}
                className="px-5 py-2.5 cursor-pointer bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 rounded-lg transition-colors"
              >
                Create Snippet
              </button>
            </div>
          </div>
        ) : (
          <SnippetsGrid
            snippets={snippets}
            deletingId={deletingId}
            pagination={pagination}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}

        <SnippetModal
          isOpen={isModalOpen}
          isSubmitting={isSubmitting}
          editingId={editingId}
          formData={formData}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          onFileUpload={handleFileUpload}
          onRemoveImageFile={removeImageFile}
          onRemoveExistingUrl={removeExistingUrl}
        />
      </div>
    </div>
  );
}
