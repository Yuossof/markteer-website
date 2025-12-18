import { atom } from "jotai";
import { TService } from "@/types/project_services";
import { baseUrl } from "@/constants/base-url";

export interface FeaturedProject {
  id: string;
  name?: string | null;
  client?: string | null;
  clientImage?: string | null;
  description?: string | null;
  images: { id: string; url: string }[];
  services: TService[];
}

export const featuredProjectsAtom = atom<FeaturedProject[]>([]);
export const featuredProjectsLoadingAtom = atom<boolean>(false);
export const featuredProjectsErrorAtom = atom<string | null>(null);

export const fetchFeaturedProjectsAtom = atom(
  null,
  async (get, set) => {
    const current = get(featuredProjectsAtom);
    if (current && current.length > 0) return; // already loaded

    set(featuredProjectsLoadingAtom, true);
    set(featuredProjectsErrorAtom, null);

    try {
      const res = await fetch(`${baseUrl}/api/projects/featured?pageSize=20`);
      if (!res.ok) throw new Error("Failed to fetch featured projects");
      const data = await res.json();
      set(featuredProjectsAtom, data.projects || []);
    } catch (err) {
      set(featuredProjectsErrorAtom, err instanceof Error ? err.message : String(err));
    } finally {
      set(featuredProjectsLoadingAtom, false);
    }
  }
);
