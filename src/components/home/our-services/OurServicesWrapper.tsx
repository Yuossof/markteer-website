"use client";
import React, { useRef, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { TService } from "@/types/project_services";
import OurServices from "./OurServices";
import { useServiceProjects } from "./useServiceProjects";
import { useScrollAnimation } from "./useScrollAnimation";
import { servicesAsyncAtom } from "@/services/servicesService";

export const OurServicesWrapper = () => {
    const leftColumnRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const rightColumnRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

    const leftPausedRef = useRef<boolean>(false);
    const rightPausedRef = useRef<boolean>(false);

    const speed = 0.3;
    
    // Use Jotai atom to fetch services
    const servicesAtomData = useAtomValue(servicesAsyncAtom);
    const fetchedServices = servicesAtomData?.data || [];
    
    const [selectedService, setSelectedService] = useState<TService | null>(null);
    const [isTimeoutActive, setIsTimeoutActive] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    
    const [isHoveringProjects, setIsHoveringProjects] = useState(false);
    const isHoveringProjectsRef = useRef(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const {
        service: loadedService,
        setService: setLoadedService,
        isLoadingMore
    } = useServiceProjects(selectedService);

    useScrollAnimation(leftColumnRef, rightColumnRef, leftPausedRef, rightPausedRef, speed);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 2000);
        };

        const leftCol = leftColumnRef.current;
        const rightCol = rightColumnRef.current;

        if (leftCol) leftCol.addEventListener("scroll", handleScroll);
        if (rightCol) rightCol.addEventListener("scroll", handleScroll);

        return () => {
            if (leftCol) leftCol.removeEventListener("scroll", handleScroll);
            if (rightCol) rightCol.removeEventListener("scroll", handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (service: TService) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsTimeoutActive(true);
        setSelectedService(service);
        setLoadedService(service);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            if (!isHoveringProjectsRef.current) {
                setSelectedService(null);
                setIsTimeoutActive(false);
            }
        }, 2000);
    };

    const handleProjectsMouseEnter = () => {
        isHoveringProjectsRef.current = true;
        setIsHoveringProjects(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleProjectsMouseLeave = () => {
        isHoveringProjectsRef.current = false;
        setIsHoveringProjects(false);
        timeoutRef.current = setTimeout(() => {
            if (!isHoveringProjectsRef.current) {
                setSelectedService(null);
                setIsTimeoutActive(false);
            }
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const half = loadedService?.projects ? Math.ceil(loadedService.projects.length / 2) : 0;
    const leftProjects = loadedService?.projects?.slice(0, half) || [];
    const rightProjects = loadedService?.projects?.slice(half) || [];

    return (
        <OurServices
            fetchedServices={fetchedServices}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            selectedService={loadedService}
            leftColumnRef={leftColumnRef}
            rightColumnRef={rightColumnRef}
            leftPausedRef={leftPausedRef}
            rightPausedRef={rightPausedRef}
            leftProjects={leftProjects}
            rightProjects={rightProjects}
            isLoadingMore={isLoadingMore}
            isTimeoutActive={isTimeoutActive}
            isScrolling={isScrolling}
            handleProjectsMouseEnter={handleProjectsMouseEnter}
            handleProjectsMouseLeave={handleProjectsMouseLeave}
            isHoveringProjects={isHoveringProjects}
        />
    );
};

export default OurServicesWrapper;