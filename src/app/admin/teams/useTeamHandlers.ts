/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseUrl } from "@/constants/base-url";
import { useState, useRef, useEffect } from "react";

interface Team {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  title: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function useTeamHandlers() {
  const [teams, setTeams] = useState<Team[]>([]);
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
  const [formData, setFormData] = useState<FormData>({ title: "" });
  const fetchControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (page: number = currentPage, limit: number = pageSize) => {
    if (fetchControllerRef.current) fetchControllerRef.current.abort();
    const controller = new AbortController();
    fetchControllerRef.current = controller;

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/teams?page=${page}&pageSize=${limit}`, { signal: controller.signal });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Failed to fetch teams");
        return;
      }
      setTeams(data.teams || []);
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

  const handleOpenModal = (team?: Team) => {
    if (team) {
      setEditingId(team.id);
      setFormData({ title: team.title });
    } else {
      setEditingId(null);
      setFormData({ title: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "" });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId ? `${baseUrl}/api/teams/${editingId}` : `${baseUrl}/api/teams`;
      const method = editingId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || `Failed to ${editingId ? "update" : "create"} team`);
        return;
      }
      setSuccess(`Team ${editingId ? "updated" : "created"} successfully!`);
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team?")) return;
    try {
      setDeletingId(id);
      const response = await fetch(`/api/teams/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Failed to delete team");
        return;
      }
      setSuccess("Team deleted successfully!");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    teams,
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
    handlePageChange: (page: number) => fetchData(page, pageSize),
    handlePageSizeChange: (newSize: number) => {
      setPageSize(newSize);
      fetchData(1, newSize);
    },
  };
}
