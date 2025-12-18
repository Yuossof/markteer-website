/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "@/constants/base-url";
import { useState, useRef, useEffect } from "react";

interface Spotlight {
  id: string;
  imgUrl: string;
  type: string;
  title: string;
  link: string;
  description: string;
}

interface FormData {
  imgUrl: string;
  type: string;
  title: string;
  link: string;
  description: string;
  imageFile: File | null;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function useSpotlightHandlers() {
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
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
    imgUrl: "",
    type: "",
    title: "",
    link: "",
    description: "",
    imageFile: null,
  });

  const fetchData = async (page: number = currentPage, limit: number = pageSize) => {
    // abort any in-flight request
    if (fetchControllerRef.current) {
      try {
        fetchControllerRef.current.abort();
      } catch (err) {
        // ignore abort errors
      }
    }

    const controller = new AbortController();
    fetchControllerRef.current = controller;

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/spotlights?page=${page}&pageSize=${limit}`, { signal: controller.signal });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Failed to fetch spotlights");
        return;
      }

      setSpotlights(data.spotlights || []);
      setPagination(data.pagination || { page, pageSize: limit, total: 0, totalPages: 0 });
      setCurrentPage(page);
      setError("");
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
      // clear controller only if it's the one we created
      if (fetchControllerRef.current === controller) fetchControllerRef.current = null;
    }
  };

  const fetchControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (fetchControllerRef.current) {
        try {
          fetchControllerRef.current.abort();
        } catch (err) {
          // ignore abort errors
        }
      }
    };
  }, []);

  const handleOpenModal = (spotlight?: Spotlight) => {
    if (spotlight) {
      setEditingId(spotlight.id);
      setFormData({
        imgUrl: spotlight.imgUrl,
        type: spotlight.type,
        title: spotlight.title,
        link: spotlight.link,
        description: spotlight.description,
        imageFile: null,
      });
    } else {
      setEditingId(null);
      setFormData({
        imgUrl: "",
        type: "",
        title: "",
        link: "",
        description: "",
        imageFile: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      imgUrl: "",
      type: "",
      title: "",
      link: "",
      description: "",
      imageFile: null,
    });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setSuccess("Image selected. It will be uploaded when you submit.");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, imageFile: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId ? `/api/spotlights/${editingId}` : "/api/spotlights";
      const method = editingId ? "PUT" : "POST";

      const requestData = new FormData();
      requestData.append("type", formData.type);
      requestData.append("title", formData.title);
      requestData.append("link", formData.link);
      requestData.append("description", formData.description);

      if (formData.imageFile) {
        requestData.append("file", formData.imageFile);
      } else if (formData.imgUrl) {
        requestData.append("existingImgUrl", formData.imgUrl);
      }

      const response = await fetch(url, {
        method,
        body: requestData,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        setError(errorMsg || `Failed to ${editingId ? "update" : "create"} spotlight`);
        return;
      }

      setSuccess(`Spotlight ${editingId ? "updated" : "created"} successfully!`);
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this spotlight?")) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await fetch(`/api/spotlights/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete spotlight");
        return;
      }

      setSuccess("Spotlight deleted successfully!");
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
    spotlights,
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
    handleRemoveFile,
    handleSubmit,
    handleDelete,
    handlePageChange,
    handlePageSizeChange,
  };
}
