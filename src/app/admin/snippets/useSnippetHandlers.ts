/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseUrl } from "@/constants/base-url";
import { useState, useRef, useEffect } from "react";

interface Snippet {
  id: string;
  url: string;
  createdAt: string;
}

interface FormData {
  existingUrl: string;
  imageFiles: File[];
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function useSnippetHandlers() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
  const [formData, setFormData] = useState<FormData>({ existingUrl: "", imageFiles: [] });
  const fetchControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (page: number = 1, limit: number = 10) => {
    if (fetchControllerRef.current) fetchControllerRef.current.abort();
    const controller = new AbortController();
    fetchControllerRef.current = controller;

    try {
      setIsLoading(true);
      const snippetRes = await fetch(`/api/snippets?page=${page}&pageSize=${limit}`, { signal: controller.signal });
      const snippetData = await snippetRes.json();
      if (!snippetRes.ok) {
        setError(snippetData?.error || "Failed to fetch snippets");
        return;
      }
      setSnippets(snippetData.snippets || []);
      setPagination(snippetData.pagination || { page, pageSize: limit, total: 0, totalPages: 0 });
      setError("");
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
      if (fetchControllerRef.current === controller) fetchControllerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (fetchControllerRef.current) fetchControllerRef.current.abort();
    };
  }, []);

  const handleOpenModal = (snippet?: Snippet) => {
    if (snippet) {
      setEditingId(snippet.id);
      setFormData({ existingUrl: snippet.url || "", imageFiles: [] });
    } else {
      setEditingId(null);
      setFormData({ existingUrl: "", imageFiles: [] });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ existingUrl: "", imageFiles: [] });
    setEditingId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files ? Array.from(e.currentTarget.files) : [];
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, imageFiles: [...prev.imageFiles, ...files] }));
      setSuccess(`${files.length} image(s) selected.`);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const removeImageFile = (index: number) => {
    setFormData((prev) => ({ ...prev, imageFiles: prev.imageFiles.filter((_, i) => i !== index) }));
  };

  const removeExistingUrl = () => {
    setFormData((prev) => ({ ...prev, existingUrl: "" }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // editing single snippet: allow keeping existingUrl or uploading one replacement
      if (!formData.existingUrl && formData.imageFiles.length === 0) {
        setError("Please provide an image or keep the existing one");
        return;
      }
    } else {
      if (formData.imageFiles.length === 0) {
        setError("Please upload at least one image");
        return;
      }
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId ? `${baseUrl}/api/snippets/${editingId}` : `${baseUrl}/api/snippets`;
      const method = editingId ? "PUT" : "POST";
      const requestData = new FormData();

      if (editingId) {
        // for edit, if user selected new file(s) use first as replacement
        if (formData.imageFiles.length > 0) {
          requestData.append("file", formData.imageFiles[0]);
        } else if (formData.existingUrl) {
          requestData.append("existingUrl", formData.existingUrl);
        }
      } else {
        // create many: append all selected files as `files`
        formData.imageFiles.forEach((file) => requestData.append("files", file));
      }

      const response = await fetch(url, { method, body: requestData });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || `Failed to ${editingId ? "update" : "create"} snippet`);
        return;
      }
      setSuccess(`Snippet ${editingId ? "updated" : "created"} successfully!`);
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this snippet?")) return;
    try {
      setDeletingId(id);
      const response = await fetch(`${baseUrl}/api/snippets/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Failed to delete snippet");
        return;
      }
      setSuccess("Snippet deleted successfully!");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  return {
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
    handleSubmit,
    removeImageFile,
    removeExistingUrl,
    handleDelete,
    handlePageChange: (page: number) => fetchData(page, pagination.pageSize),
    handlePageSizeChange: (newSize: number) => fetchData(1, newSize),
  };
}
