"use client"
import React, { useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { servicesData } from '@/data/services-data';
import { useParams } from 'next/navigation';

const ServiceDetailPage = () => {
  const params = useParams()
  const serviceName = params["service-name"];
  const serviceData = useMemo(() => {
    return servicesData[serviceName as string]
  }, [serviceName])

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-32 pb-24">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">

          <div
            className="absolute -right-1/4 top-0 w-3/4 h-full opacity-60"
            style={{
              background: `linear-gradient(135deg, 
                transparent 0%,
                rgba(139, 92, 246, 0.3) 20%,
                rgba(236, 72, 153, 0.3) 35%,
                rgba(59, 130, 246, 0.3) 50%,
                rgba(34, 197, 94, 0.3) 65%,
                rgba(251, 146, 60, 0.3) 80%,
                transparent 100%
              )`,
              filter: 'blur(100px)',
            }}
          />
          <div className="absolute right-1/3 top-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute right-1/2 bottom-10 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">

            {/* Service Badge */}
            <div
              className="inline-flex items-center px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 mb-8 mx-auto"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
              }}
            >
              <Sparkles className="w-4 h-4 text-white mr-2" />
              <span className="text-white text-sm font-medium">Premium Service</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {serviceData.title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
              {serviceData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                aria-label='Get Started'
                className="inline-flex cursor-pointer items-center px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all group"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                aria-label='Learn More'
                className="inline-flex cursor-pointer items-center px-8 py-4 bg-slate-800/50 backdrop-blur border border-slate-700 text-white hover:border-purple-500 transition-all"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                Learn More
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mab-4">
              <span className="text-white">What&apos;s </span>
              <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Included</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need for a successful web presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 hover:border-purple-500/50 transition-all group"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                    {feature}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-24">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-1/4 top-0 w-3/4 h-full opacity-50"
            style={{
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(34, 197, 94, 0.2) 15%,
                rgba(59, 130, 246, 0.2) 30%,
                rgba(168, 85, 247, 0.2) 45%,
                rgba(236, 72, 153, 0.2) 60%,
                rgba(251, 146, 60, 0.2) 75%,
                transparent 100%
              )`,
              filter: 'blur(80px)',
            }}
          />
          <div className="absolute right-0 top-1/4 w-64 h-64 bg-linear-to-br from-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Recent </span>
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg">
              See what we&apos;ve built for other clients
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceData.projects.map((project, index) => (
              <Link
                key={project.id}
                href={project.link}
                className="group relative"
              >
                <div
                  className="relative bg-slate-900/50 backdrop-blur border border-slate-800 p-8 h-full overflow-hidden hover:border-transparent transition-all duration-300"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                  }}
                >
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  {/* Color Strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${project.color}`}></div>

                  {/* Project Number */}
                  <div className={`absolute -right-2 -top-2 w-16 h-16 bg-linear-to-br ${project.color} flex items-center justify-center`}
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'
                    }}
                  >
                    <span className="text-white font-bold text-xl">0{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <div className={`text-sm font-medium bg-linear-to-r ${project.color} bg-clip-text text-transparent mb-2`}>
                      {project.client}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:translate-x-2 transition-transform">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {project.description}
                    </p>

                    <div className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                      <span className={`bg-linear-to-r ${project.color} bg-clip-text text-transparent font-medium`}>
                        View Project
                      </span>
                      <ArrowUpRight className="w-4 h-4 ml-2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-10 py-4 bg-linear-to-r from-slate-800 to-slate-700 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
              }}
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg,
                rgba(139, 92, 246, 0.1) 0%,
                rgba(236, 72, 153, 0.1) 25%,
                rgba(59, 130, 246, 0.1) 50%,
                rgba(34, 197, 94, 0.1) 75%,
                rgba(251, 146, 60, 0.1) 100%
              )`
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Let&apos;s create something amazing together
          </p>

          <button
            className="inline-flex items-center px-12 py-5 bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
            }}
          >
            Get In Touch
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;