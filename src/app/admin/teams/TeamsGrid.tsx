"use client";

import React from "react";
import { Trash2, Edit2 } from "lucide-react";

interface Team {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface TeamsGridProps {
  teams: Team[];
  deletingId: string | null;
  pagination: Pagination;
  onEdit: (team: Team) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function TeamsGrid({
  teams,
  deletingId,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
  onPageSizeChange,
}: TeamsGridProps) {
  if (teams.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No teams found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-900">Team Name</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900">Created</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="hover:bg-gray-50 border-b border-gray-100 transition">
              <td className="px-4 py-3 text-sm text-gray-900">{team.title}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(team.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                <button
                  onClick={() => onEdit(team)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(team.id)}
                  disabled={deletingId === team.id}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  {deletingId === team.id ? (
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
