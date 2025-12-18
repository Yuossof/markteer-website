"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Briefcase, Package, LogOut, ArrowRight, Star, Building, Users, Mail, Code,  SettingsIcon } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const { user, logout, isLoading, setUser } = useAuth();

  useEffect(() => {
    if (!isLoading && !user?.isAdmin) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    setUser(null)
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gray-900 border-t-gray-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return null;
  }

  const adminLinks = [
    {
      title: "Services",
      description: "Manage all services offered by your company",
      icon: Package,
      href: "/admin/services",
    },
    {
      title: "Projects",
      description: "Manage portfolio projects and case studies",
      icon: Briefcase,
      href: "/admin/projects",
    },
    {
      title: "Spotlights",
      description: "Manage homepage spotlights",
      icon: Star,
      href: "/admin/spotlights",
    },
    {
      title: "Offices",
      description: "Manage office locations",
      icon: Building,
      href: "/admin/offices",
    },
    {
      title: "Teams",
      description: "Manage teams and departments",
      icon: Users,
      href: "/admin/teams",
    },
    {
      title: "Jobs",
      description: "Manage job postings",
      icon: Briefcase,
      href: "/admin/jobs",
    },
    {
      title: "Snippets",
      description: "Manage career snippets and images",
      icon: Code,
      href: "/admin/snippets",
    },

  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/admin/settings`} className="cursor-pointer">
                <SettingsIcon className="text-gray-700" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm  flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
                <LayoutGrid className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
            </div>
            <Link href={`/admin/messages`} className="py-1.5 px-3 border bg-slate-50 border-gray-300 rounded-lg cursor-pointer hover:bg-slate-100">
              <Mail className="text-gray-600" />
            </Link>
          </div>
        </header>

        {/* Main Navigation */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className="group text-left"
                >
                  <div className="bg-white cursor-pointer rounded-xl border border-gray-200 hover:border-gray-900 p-8 transition-all duration-300 hover:shadow-lg h-full">

                    {/* Icon */}
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-between">
                      {link.title}
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300" />
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Info Section */}
        <section>
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Getting Started
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="leading-relaxed">
                Use the navigation above to manage your services and projects. Each section allows you to create, edit, and delete content.
              </p>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 shrink-0"></div>
                    <span><span className="font-medium text-gray-900">Services:</span> Create and manage service offerings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 shrink-0"></div>
                    <span><span className="font-medium text-gray-900">Projects:</span> Manage portfolio projects with images</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 shrink-0"></div>
                    <span>All content updates are reflected on the public site in real-time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}