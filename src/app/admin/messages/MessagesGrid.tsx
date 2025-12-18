"use client";

import React from "react";
import { Trash2, Mail, Phone, Building2 } from "lucide-react";

interface Message {
  id: string;
  subject: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  market: string;
  company: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface MessagesGridProps {
  messages: Message[];
  deletingId: string | null;
  pagination: Pagination;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function MessagesGrid({
  messages,
  deletingId,
  pagination,
  onDelete,
  onPageChange,
  onPageSizeChange,
}: MessagesGridProps) {
  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No messages found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">From</p>
                <p className="text-sm font-medium text-gray-900">{msg.firstName} {msg.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Subject</p>
                <p className="text-sm font-medium text-gray-900">{msg.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Market</p>
                <p className="text-sm font-medium text-gray-900">{msg.market}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                <p className="text-sm font-medium text-gray-900">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-3 p-3 bg-gray-50 rounded border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Title:</span> {msg.title}
              </p>
              <p className="text-sm text-gray-700 line-clamp-2">{msg.message}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">
                  {msg.email}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <a href={`tel:${msg.phoneNumber}`} className="text-blue-600 hover:underline">
                  {msg.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                <span>{msg.company}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => onDelete(msg.id)}
                disabled={deletingId === msg.id}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50 flex items-center gap-1"
              >
                {deletingId === msg.id ? (
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span className="text-xs">Delete</span>
                  </>
                )}
              </button>
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
