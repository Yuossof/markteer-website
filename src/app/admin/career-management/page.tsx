"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CareerManagementPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/snippets");
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100"></div>
  );
}
