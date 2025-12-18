export type TProjectImages = {
    id?: string;
    url: string;
}

type TDescriptionSection = {
    id: string;
    title: string;
    description: string
}
export type TProject = {
    id?: string;
    name?: string;
    title?: string;
    description?: string;
    result?: string;
    client?: string;
    image?: string;
    categories?: string[];
    images?: TProjectImages[];
    services?: Array<{ id?: string; title?: string }>;
    createdAt?: string | Date;
    descriptionSections: TDescriptionSection[]
}

export type TModule = {
    id?: string;
    title: string;
    description?: string;
}

export type TService = {
    id: string;
    title: string;
    shortDescription?: string;
    description?: string;
    projects?: TProject[];
    modules?: TModule[];
    
    hasMoreProjects?: boolean;
    totalProjects?: number;
    loadedProjects?: number;
    
    _count?: {
        projects: number;
    };
}

export type TProjectsPaginationResponse = {
    projects: TProject[];
    pagination: {
        skip: number;
        take: number;
        total: number;
        hasMore: boolean;
    };
}

export type TServicesResponse = {
    services: TService[];
}


