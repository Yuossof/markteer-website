/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";

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

export function useMessageHandlers() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
  const fetchControllerRef = useRef<AbortController | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async (page: number = 1, limit: number = 10) => {
    if (fetchControllerRef.current) fetchControllerRef.current.abort();
    const controller = new AbortController();
    fetchControllerRef.current = controller;

    try {
      setIsLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const messagesRes = await fetch(`${baseUrl}/api/messages?page=${page}&pageSize=${limit}`, { signal: controller.signal });
      const messagesData = await messagesRes.json();
      if (!messagesRes.ok) {
        setError(messagesData?.error || "Failed to fetch messages");
        return;
      }
      setMessages(messagesData.messages || []);
      setPagination(messagesData.pagination || { page, pageSize: limit, total: 0, totalPages: 0 });
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
    fetchData();
    return () => {
      if (fetchControllerRef.current) fetchControllerRef.current.abort();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      setDeletingId(id);
      const response = await fetch(`${baseUrl}/api/messages/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Failed to delete message");
        return;
      }
      setSuccess("Message deleted successfully!");
      fetchData(pagination.page, pagination.pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    messages,
    isLoading,
    error,
    success,
    deletingId,
    pagination,
    setError,
    setSuccess,
    fetchData,
    handleDelete,
    handlePageChange: (page: number) => fetchData(page, pagination.pageSize),
    handlePageSizeChange: (newSize: number) => fetchData(1, newSize),
  };
}
