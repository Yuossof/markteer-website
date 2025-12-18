import CaseStudies from "@/components/services/CaseStudies";
import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceModulesSection from "@/components/services/ServiceModulesSection";
import { TService } from "@/types/project_services";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    serviceId: string;
  };
}

const getServiceData = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/services/${id}`, { next: { revalidate: 160 } });

    if (!res.ok) {
      console.error(`Failed to fetch service ${id}: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data?.service ?? null;
  } catch (err) {
    console.error(`Failed to fetch service ${id}:`, err);
    return null;
  }
};

const ServicePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const service = (await getServiceData(resolvedParams.serviceId)) as TService | null;

  if (!service) {
    notFound();
  }

  const ServiceModules = service?.modules ?? [];
  const ServiceProjects = service?.projects ?? [];

  return (
    <div className="flex flex-col items-center bg-black">
      <ServiceHeroSection
        data={{
          title: service.title,
          description: service.description as string,
        }}
      />
      <ServiceModulesSection data={ServiceModules}/>
      <CaseStudies projects={ServiceProjects}/>
    </div>
  );
}

export default ServicePage;