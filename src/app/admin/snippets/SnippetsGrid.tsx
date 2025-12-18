"use client";

import React from "react";
import { Trash2, Edit2, ExternalLink } from "lucide-react";

interface Snippet {
  id: string;
  url: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface SnippetsGridProps {
  snippets: Snippet[];
  deletingId: string | null;
  pagination: Pagination;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function SnippetsGrid({
  snippets,
  deletingId,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
  onPageSizeChange,
}: SnippetsGridProps) {
  if (snippets.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No snippets found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            {snippet.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={snippet.url} alt="snippet" className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">{new Date(snippet.createdAt).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(snippet)}
                  className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-xs">Edit</span>
                </button>
                <button
                  onClick={() => onDelete(snippet.id)}
                  disabled={deletingId === snippet.id}
                  className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  {deletingId === snippet.id ? (
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span className="text-xs">Delete</span>
                    </>
                  )}
                </button>
                {snippet.url && (
                  <a
                    href={snippet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2 text-green-600 hover:bg-green-50 rounded-lg transition flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-xs">View</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <select
          value={pagination.pageSize}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer text-black"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
        </select>

        <div className="flex items-center gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm transition cursor-pointer ${
                pagination.page === page
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
