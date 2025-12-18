/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseUrl } from "@/constants/base-url";
import { useState, useRef, useEffect } from "react";

interface Office {
  id: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  city: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function useOfficeHandlers() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [formData, setFormData] = useState<FormData>({
    city: "",
  });

  const fetchControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (page: number = currentPage, limit: number = pageSize) => {
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort();
    }

    const controller = new AbortController();
    fetchControllerRef.current = controller;

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/offices?page=${page}&pageSize=${limit}`, { signal: controller.signal });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Failed to fetch offices");
        return;
      }

      setOffices(data.offices || []);
      setPagination(data.pagination || { page, pageSize: limit, total: 0, totalPages: 0 });
      setCurrentPage(page);
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

  const handleOpenModal = (office?: Office) => {
    if (office) {
      setEditingId(office.id);
      setFormData({ city: office.city });
    } else {
      setEditingId(null);
      setFormData({ city: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ city: "" });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId ? `${baseUrl}/api/offices/${editingId}` : `${baseUrl}/api/offices`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || `Failed to ${editingId ? "update" : "create"} office`);
        return;
      }

      setSuccess(`Office ${editingId ? "updated" : "created"} successfully!`);
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this office?")) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await fetch(`${baseUrl}/api/offices/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Failed to delete office");
        return;
      }

      setSuccess("Office deleted successfully!");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    fetchData(page, pageSize);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    fetchData(1, newSize);
  };

  return {
    offices,
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
    handleInputChange,
    handleSubmit,
    handleDelete,
    handlePageChange,
    handlePageSizeChange,
  };
}
