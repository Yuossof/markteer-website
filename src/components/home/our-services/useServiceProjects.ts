/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import { TService, TProject } from "@/types/project_services";
import { baseUrl } from "@/constants/base-url";

export function useServiceProjects(selectedService: TService | null) {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [service, setService] = useState<TService | null>(selectedService);

    // Call this to fetch more projects for the selected service
    const loadMoreProjects = useCallback(async () => {
        if (!service || !service.hasMoreProjects || isLoadingMore || !service.projects) {
            return;
        }
        setIsLoadingMore(true);
        try {
            const skip = service.projects.length;
            const res = await fetch(`${baseUrl}/api/services/${service.id}/projects?skip=${skip}&take=10`);
            if (!res.ok) return;
            const data = await res.json();
            const newProjects: TProject[] = data.projects;
            if (newProjects.length === 0) return;
            setService(prev => prev ? {
                ...prev,
                projects: [...(prev.projects || []), ...newProjects],
                hasMoreProjects: data.pagination.hasMore,
                loadedProjects: (prev.projects?.length || 0) + newProjects.length
            } : prev);
        } catch (err) {
            // Optionally handle error
        } finally {
            setIsLoadingMore(false);
        }
    }, [service, isLoadingMore]);

    // When selectedService changes, update local state
    // (This is a simple pattern; you can use useEffect if you want to sync more deeply)
    if (service !== selectedService) {
        setService(selectedService);
    }

    return { service, setService, isLoadingMore, loadMoreProjects };
}
