/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseUrl } from "@/constants/base-url";
import { useState, useRef, useEffect } from "react";

interface Job {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  teamId: string;
  officeId?: string;
  createdAt: string;
}

interface FormData {
  title: string;
  description: string;
  teamId: string;
  officeId: string;
  imgUrl: string;
  imageFile: File | null;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function useJobHandlers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [offices, setOffices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    teamId: "",
    officeId: "",
    imgUrl: "",
    imageFile: null,
  });
  const fetchControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (page: number = 1, limit: number = 10) => {
    if (fetchControllerRef.current) fetchControllerRef.current.abort();
    const controller = new AbortController();
    fetchControllerRef.current = controller;

    try {
      setIsLoading(true);
      const [jobRes, teamRes, officeRes] = await Promise.all([
        fetch(`${baseUrl}/api/jobs?page=${page}&pageSize=${limit}`, { signal: controller.signal }),
        fetch(`${baseUrl}/api/teams?pageSize=100`, { signal: controller.signal }),
        fetch(`${baseUrl}/api/offices?pageSize=100`, { signal: controller.signal }),
      ]);
      const jobData = await jobRes.json();
      const teamData = await teamRes.json();
      const officeData = await officeRes.json();
      if (!jobRes.ok) {
        setError(jobData?.error || "Failed to fetch jobs");
        return;
      }
      setJobs(jobData.jobs || []);
      setPagination(jobData.pagination || { page, pageSize: limit, total: 0, totalPages: 0 });
      setTeams(teamData.teams || []);
      setOffices(officeData.offices || []);
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

  const handleOpenModal = (job?: Job) => {
    if (job) {
      setEditingId(job.id);
      setFormData({ title: job.title, description: job.description, teamId: job.teamId, officeId: job.officeId || "", imgUrl: job.imgUrl, imageFile: null });
    } else {
      setEditingId(null);
      setFormData({ title: "", description: "", teamId: "", officeId: "", imgUrl: "", imageFile: null });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", description: "", teamId: "", officeId: "", imgUrl: "", imageFile: null });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setSuccess("Image selected.");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const url = editingId ? `${baseUrl}/api/jobs/${editingId}` : `${baseUrl}/api/jobs`;
      const method = editingId ? "PUT" : "POST";
      const requestData = new FormData();
      requestData.append("title", formData.title);
      requestData.append("description", formData.description);
      requestData.append("teamId", formData.teamId);
      requestData.append("officeId", formData.officeId);
      if (formData.imageFile) {
        requestData.append("file", formData.imageFile);
      } else if (formData.imgUrl) {
        requestData.append("existingImgUrl", formData.imgUrl);
      }
      const response = await fetch(`${baseUrl}/${url}`, { method, body: requestData });
      const text = await response.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }
      if (!response.ok) {
        setError(data?.error || `Failed to ${editingId ? "update" : "create"} job`);
        return;
      }
      setSuccess(`Job ${editingId ? "updated" : "created"} successfully!`);
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      setDeletingId(id);
      const response = await fetch(`${baseUrl}/api/jobs/${id}`, { method: "DELETE" });
      const text = await response.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }
      if (!response.ok) {
        setError(data?.error || "Failed to delete job");
        return;
      }
      setSuccess("Job deleted successfully!");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    jobs,
    teams,
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
    handleFileUpload,
    handleSubmit,
    handleDelete,
    handlePageChange: (page: number) => fetchData(page, pagination.pageSize),
    handlePageSizeChange: (newSize: number) => fetchData(1, newSize),
  };
}
