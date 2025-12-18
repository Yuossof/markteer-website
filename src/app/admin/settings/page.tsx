"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, X, ArrowLeft, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/constants/base-url";

interface CloudinaryConfig {
  id: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface Email {
  id: string;
  email: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [cloudinaryLoading, setCloudinaryLoading] = useState(false);
  const [cloudinaryConfig, setCloudinaryConfig] = useState<CloudinaryConfig | null>(null);
  const [cloudinaryForm, setCloudinaryForm] = useState({
    cloudName: "",
    apiKey: "",
    apiSecret: "",
  });

  // Email state
  const [emails, setEmails] = useState<Email[]>([]);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailsError, setEmailsError] = useState("");
  const [emailsPagination, setEmailsPagination] = useState<Pagination>({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 0,
  });
  const [deletingEmailId, setDeletingEmailId] = useState<string | null>(null);

  // Fetch Cloudinary config

  const fetchEmails = async (page: number = 1, pageSize: number = 5) => {
    try {
      setEmailsLoading(true);
      const res = await fetch(`${baseUrl}/api/emails?page=${page}&pageSize=${pageSize}`);
      const data = await res.json();

      if (res.ok) {
        setEmails(data.emails || []);
        setEmailsPagination(data.pagination || { page, pageSize, total: 0, totalPages: 0 });
        setEmailsError("");
      } else {
        setEmailsError(data?.error || "Failed to fetch emails");
      }
    } catch (err) {
      setEmailsError("Failed to fetch emails");
      console.error(err);
    } finally {
      setEmailsLoading(false);
    }
  };

  const handleEmailsPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > (emailsPagination.totalPages || 1)) return;
    fetchEmails(newPage, emailsPagination.pageSize);
  };

  const handleEmailsPageSizeChange = (newSize: number) => {
    fetchEmails(1, newSize);
  };

  useEffect(() => {
    const fetchCloudinaryConfig = async () => {
      try {
        setCloudinaryLoading(true);
        const res = await fetch(`${baseUrl}/api/cloudinary`);
        const data = await res.json();

        if (res.ok && data.config) {
          setCloudinaryConfig(data.config);
          setCloudinaryForm({
            cloudName: data.config.cloudName,
            apiKey: data.config.apiKey,
            apiSecret: data.config.apiSecret,
          });
        }
      } catch (err) {
        console.error("Failed to fetch cloudinary config:", err);
      } finally {
        setCloudinaryLoading(false);
      }
    };

    fetchCloudinaryConfig();
    fetchEmails(emailsPagination.page, emailsPagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloudinaryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCloudinaryForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleCloudinarySave = async () => {
    if (!cloudinaryForm.cloudName || !cloudinaryForm.apiKey || !cloudinaryForm.apiSecret) {
      setError("Please fill in all Cloudinary fields");
      return;
    }

    setCloudinaryLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${baseUrl}/api/cloudinary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cloudinaryForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save Cloudinary config");
        return;
      }

      setCloudinaryConfig(data.config);
      setSuccess("Cloudinary config saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setCloudinaryLoading(false);
    }
  };

  const handleAddEmail = async () => {
    if (!newEmail.trim()) {
      setEmailsError("Please enter an email");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setEmailsError(data.error || "Failed to add email");
        return;
      }
      // refresh list to update pagination
      await fetchEmails(1, emailsPagination.pageSize);
      setNewEmail("");
      setEmailsError("");
    } catch (err) {
      setEmailsError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDeleteEmail = async (id: string) => {
    if (!confirm("Delete this email?")) return;

    try {
      setDeletingEmailId(id);
      const res = await fetch(`${baseUrl}/api/emails/${id}`, { method: "DELETE" });

      if (!res.ok) {
        setEmailsError("Failed to delete email");
        return;
      }

      // refresh current page
      await fetchEmails(emailsPagination.page, emailsPagination.pageSize);
    } catch (err) {
      setEmailsError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeletingEmailId(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage system configuration</p>
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

        {/* Cloudinary Config Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Cloudinary Configuration</h2>
          {cloudinaryConfig && (
            <p className="text-sm text-gray-600 mb-4">Current cloud: {cloudinaryConfig.cloudName}</p>
          )}

          {cloudinaryLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-8 h-8 border-2 border-gray-900 border-t-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cloud Name</label>
                <input
                  type="text"
                  name="cloudName"
                  value={cloudinaryForm.cloudName}
                  onChange={handleCloudinaryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  placeholder="Enter cloud name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type="password"
                  name="apiKey"
                  value={cloudinaryForm.apiKey}
                  onChange={handleCloudinaryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  placeholder="Enter API key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Secret</label>
                <input
                  type="password"
                  name="apiSecret"
                  value={cloudinaryForm.apiSecret}
                  onChange={handleCloudinaryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  placeholder="Enter API secret"
                />
              </div>

              <button
                onClick={handleCloudinarySave}
                disabled={cloudinaryLoading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Configuration
              </button>
            </div>
          )}
        </section>

        {/* Email List Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Newsletter Emails</h2>

          {emailsError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{emailsError}</p>
            </div>
          )}

          <div className="mb-6 flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setEmailsError("");
              }}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
            />
            <button
              onClick={handleAddEmail}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer"
            >
              Add Email
            </button>
          </div>

          {emailsLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-8 h-8 border-2 border-gray-900 border-t-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : emails.length === 0 ? (
            <p className="text-center text-gray-600 py-6">No emails added yet</p>
          ) : (
            <div className="space-y-2">
              {emails.map((email) => (
                <div key={email.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-900">{email.email}</span>
                  <button
                    onClick={() => handleDeleteEmail(email.id)}
                    disabled={deletingEmailId === email.id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer disabled:opacity-50"
                  >
                    {deletingEmailId === email.id ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}

              {/* Pagination controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEmailsPageChange(emailsPagination.page - 1)}
                    disabled={emailsPagination.page <= 1}
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-600">Page {emailsPagination.page} of {emailsPagination.totalPages || 1}</span>
                  <button
                    onClick={() => handleEmailsPageChange(emailsPagination.page + 1)}
                    disabled={emailsPagination.page >= (emailsPagination.totalPages || 1)}
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Per page</label>
                  <select
                    value={emailsPagination.pageSize}
                    onChange={(e) => handleEmailsPageSizeChange(parseInt(e.target.value, 10))}
                    className="bg-transparent border rounded px-2 py-1 text-sm text-black"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
