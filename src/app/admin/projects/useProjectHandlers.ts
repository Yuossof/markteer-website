import { baseUrl } from "@/constants/base-url";
import { useState } from "react";

interface DescriptionSection {
  id: string;
  title: string;
  description: string;
}

interface Project {
  id: string;
  name?: string;
  client?: string;
  clientImage?: string;
  description: string;
  isUpcoming: boolean;
  isFeature: boolean;
  images: { id: string; url: string }[];
  services: { id: string; title: string }[];
  descriptionSections: DescriptionSection[];
}

interface FormData {
  name: string;
  client: string;
  clientImage: string; // URL of existing client image
  clientImageFile: File | null; // New client image file
  description: string;
  services: string[];
  images: string[];
  imageFiles: File[];
  isUpcoming: boolean;
  isFeature: boolean;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function useProjectHandlers() {
  // ===== State =====
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<{ id: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [shortDescriptions, setShortDescriptions] = useState<{ title: string; description: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    client: "",
    clientImage: "",
    clientImageFile: null,
    description: "",
    services: [],
    images: [],
    imageFiles: [],
    isUpcoming: false,
    isFeature: false,
  });

  // ===== Fetch Data =====
  const fetchData = async (page: number = currentPage, limit: number = pageSize) => {
    try {
      setIsLoading(true);
      const [projRes, servRes] = await Promise.all([
        fetch(`${baseUrl}/api/projects?page=${page}&pageSize=${limit}`),
        fetch(`${baseUrl}/api/services`),
      ]);

      const projData = await projRes.json();
      const servData = await servRes.json();
      console.log(projData)

      if (!projRes.ok) {
        setError(projData.error || "Failed to fetch projects");
        return;
      }

      setProjects(projData.projects || []);
      setPagination(projData.pagination);
      setCurrentPage(page);
      setServices(servData.services || []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // ===== Modal Handlers =====
  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        name: project.name || "",
        client: project.client || "",
        clientImage: project.clientImage || "",
        clientImageFile: null,
        description: project.description,
        services: project.services.map((s) => s.id),
        images: project.images.map((i) => i.url),
        imageFiles: [],
        isUpcoming: project.isUpcoming ?? false,
        isFeature: project.isFeature ?? false,
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", client: "", clientImage: "", clientImageFile: null, description: "", services: [], images: [], imageFiles: [], isUpcoming: false, isFeature: false });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", client: "", clientImage: "", clientImageFile: null, description: "", services: [], images: [], imageFiles: [], isUpcoming: false, isFeature: false });
    setShortDescriptions([]);
    setEditingId(null);
  };

  // ===== Form Handlers =====
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleIsUpcoming = (value?: boolean) => {
    if (typeof value === "boolean") {
      setFormData((prev) => ({ ...prev, isUpcoming: value }));
    } else {
      setFormData((prev) => ({ ...prev, isUpcoming: !prev.isUpcoming }));
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Just add files to imageFiles, server will handle upload
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
    }));

    setSuccess(`${files.length} file(s) selected. They will be uploaded when you submit the form.`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({ ...prev, imageFiles: prev.imageFiles.filter((_, i) => i !== index) }));
  };

  const handleClientImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, clientImageFile: file }));
      setSuccess("Client image selected. It will be uploaded when you submit the form.");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleRemoveClientImage = () => {
    setFormData((prev) => ({
      ...prev,
      clientImage: "",
      clientImageFile: null,
    }));
  };

  const handleToggleIsFeature = (value?: boolean) => {
    if (typeof value === "boolean") {
      setFormData((prev) => ({ ...prev, isFeature: value }));
    } else {
      setFormData((prev) => ({ ...prev, isFeature: !prev.isFeature }));
    }
  };

  const handleAddShortDescription = () => {
    setShortDescriptions([...shortDescriptions, { title: "", description: "" }]);
  };

  const handleRemoveShortDescription = (index: number) => {
    setShortDescriptions(shortDescriptions.filter((_, i) => i !== index));
  };

  const handleUpdateShortDescription = (index: number, field: "title" | "description", value: string) => {
    setShortDescriptions(
      shortDescriptions.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // ===== Submit & Delete =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId ? `${baseUrl}/api/projects/${editingId}` : `${baseUrl}/api/projects`;
      const method = editingId ? "PUT" : "POST";

      // Use FormData to send files and JSON data together
      const requestData = new FormData();
      requestData.append("name", formData.name);
      requestData.append("client", formData.client);
      requestData.append("description", formData.description);
      requestData.append("services", JSON.stringify(formData.services));
      requestData.append("shortDescriptions", JSON.stringify(shortDescriptions));
      requestData.append("isUpcoming", formData.isUpcoming ? "true" : "false");
      requestData.append("isFeature", formData.isFeature ? "true" : "false");
      
      // Add client image file or existing URL
      if (formData.clientImageFile) {
        requestData.append("clientImage", formData.clientImageFile);
      } else if (editingId) {
        requestData.append("existingClientImage", formData.clientImage);
      }
      
      // Add existing image URLs
      formData.images.forEach((url) => {
        requestData.append("existingImages", url);
      });

      // Add new files to upload
      formData.imageFiles.forEach((file) => {
        requestData.append("files", file);
      });

      const response = await fetch(url, {
        method,
        body: requestData, // FormData is sent as multipart/form-data
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        setError(errorMsg || `Failed to ${editingId ? "update" : "create"} project`);
        return;
      }

      setSuccess(`Project ${editingId ? "updated" : "created"} successfully!`);
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await fetch(`${baseUrl}/api/projects/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete project");
        return;
      }

      setSuccess("Project deleted successfully!");
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
    // State
    projects,
    services,
    isLoading,
    error,
    success,
    isModalOpen,
    editingId,
    isSubmitting,
    deletingId,
    shortDescriptions,
    formData,
    pagination,
    currentPage,
    pageSize,
    // Setters
    setError,
    setSuccess,
    // Handlers
    fetchData,
    handleOpenModal,
    handleCloseModal,
    handleInputChange,
    handleServiceToggle,
    handleAddImageUrl,
    handleRemoveImage,
    handleFileUpload,
    handleRemoveFile,
    handleClientImageUpload,
    handleRemoveClientImage,
    handleToggleIsFeature,
    handleAddShortDescription,
    handleRemoveShortDescription,
    handleUpdateShortDescription,
    handleToggleIsUpcoming,
    handleSubmit,
    handleDelete,
    handlePageChange,
    handlePageSizeChange,
  };
}
