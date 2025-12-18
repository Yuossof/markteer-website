/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'

type Job = {
    id: string;
    title: string;
    description: string;
    imgUrl?: string;
    teamId?: string;
    officeId?: string;
}

type Team = { id: string; title: string };
type Office = { id: string; city: string };

const JoinOurTeam = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [offices, setOffices] = useState<Office[]>([]);
    const [search, setSearch] = useState("");
    const [selectedOffice, setSelectedOffice] = useState<string>("All");
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const jobsCacheRef = useRef<Map<string, Job[]>>(new Map());
    const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

    const fetchAll = async () => {
        const controller = new AbortController();
        try {
            setIsLoading(true);
            const [teamsRes, officesRes] = await Promise.all([
                fetch(`/api/teams?pageSize=100`, { signal: controller.signal }),
                fetch(`/api/offices?pageSize=100`, { signal: controller.signal }),
            ]);

            const teamsData = await teamsRes.json();
            const officesData = await officesRes.json();

            setTeams(teamsData.teams || []);
            setOffices(officesData.offices || []);
        } catch (err: any) {
            if (err.name === 'AbortError') return;
            console.error('Fetch join our team error', err);
        } finally {
            setIsLoading(false);
        }

        return () => controller.abort();
    }

    const fetchJobs = async () => {
        const cacheKey = selectedOffice === 'All' ? 'ALL' : `CITY:${selectedOffice}`;
        if (jobsCacheRef.current.has(cacheKey)) {
            setJobs(jobsCacheRef.current.get(cacheKey) || []);
            return;
        }

        const controller = new AbortController();
        try {
            setIsLoading(true);
            let list: Job[] = [];

            if (selectedOffice === 'All') {
                const res = await fetch(`/api/jobs?page=1&pageSize=100`, { signal: controller.signal });
                const data = await res.json();
                list = data.jobs || [];
            } else {
                const ids = offices.filter(o => o.city === selectedOffice).map(o => o.id);
                if (ids.length > 0) {
                    const responses = await Promise.all(
                        ids.map(id => fetch(`/api/jobs?officeId=${id}&page=1&pageSize=100`, { signal: controller.signal }))
                    );
                    const allData = await Promise.all(responses.map(r => r.json()));
                    list = allData.flatMap(d => d.jobs || []);
                    // dedupe
                    const map = new Map<string, Job>();
                    list.forEach(j => map.set(j.id, j));
                    list = Array.from(map.values());
                }
            }

            jobsCacheRef.current.set(cacheKey, list);
            setJobs(list);
        } catch (err: any) {
            if (err.name === 'AbortError') return;
            console.error('Fetch jobs error', err);
        } finally {
            setIsLoading(false);
        }

        return () => controller.abort();
    }

    useEffect(() => {
        let cleanupAll: (() => void) | undefined;
        let cleanupJobs: (() => void) | undefined;

        const init = async () => {
            cleanupAll = await fetchAll();
            cleanupJobs = await fetchJobs();
        }
        init();

        return () => {
            cleanupAll?.();
            cleanupJobs?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!offices.length) return;
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOffice]);

    const filtered = jobs.filter((j) => {
        if (selectedTeam && j.teamId !== selectedTeam) return false;
        if (selectedOffice !== 'All') {
            const office = offices.find(o => o.id === j.officeId);
            if (!office || office.city !== selectedOffice) return false;
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            return (j.title?.toLowerCase().includes(q) || j.description?.toLowerCase().includes(q));
        }
        return true;
    });

    const officeCities = Array.from(new Set(offices.map(o => o.city)));

    return (
        <div className='w-full flex justify-center min-h-screen'>
            <div className='container py-12'>
                <div>
                    <h2 className='italic-font text-[22px] md:text-[60px] leading-[105px] font-semibold mb-8'>Join our team</h2>
                </div>

                <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                    <div className='flex items-center'>
                        <span className='font-light text-lg mr-4'>Offices</span>
                        <div className='flex items-center gap-2.5'>
                            <button onClick={() => selectedOffice !== 'All' && setSelectedOffice('All')} className={`px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm transition-all duration-300 border ${selectedOffice === 'All' ? 'border-white/80' : 'border-gray-700'} hover:border-gray-500`}>All</button>
                            {officeCities.map(city => (
                                <button key={city} onClick={() => selectedOffice !== city && setSelectedOffice(city)} className={`px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm transition-all duration-300 border ${selectedOffice === city ? 'border-white/80' : 'border-gray-700'} hover:border-gray-500`}>{city}</button>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-light text-lg'>Teams</span>
                        <div className='relative'>
                            <button
                                onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                                className='bg-transparent border-b border-gray-700 text-sm px-2 py-1 flex items-center gap-2 min-w-[150px] justify-between hover:border-gray-500 transition-colors'
                            >
                                <span>{selectedTeam ? teams.find(t => t.id === selectedTeam)?.title : 'All Teams'}</span>
                                <ChevronDown size={16} className={`transition-transform duration-300 ${isTeamDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`absolute top-full left-0 mt-2 w-full bg-black border border-gray-700 rounded-md overflow-hidden transition-all duration-300 z-10 ${isTeamDropdownOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className='max-h-[300px] overflow-y-auto'>
                                    <button
                                        onClick={() => {
                                            setSelectedTeam('');
                                            setIsTeamDropdownOpen(false);
                                        }}
                                        className='w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors'
                                    >
                                        All Teams
                                    </button>
                                    {teams.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => {
                                                setSelectedTeam(t.id);
                                                setIsTeamDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${selectedTeam === t.id ? 'bg-gray-800/50' : ''
                                                }`}
                                        >
                                            {t.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='relative'>
                            <Search className='absolute top-1/2 left-3 -translate-y-1/2 text-white/70' size={16} />
                            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder='Search jobs' className='pl-10 pr-3 py-2 bg-transparent border-b border-gray-700 text-sm focus:outline-none focus:border-gray-500 transition-colors w-full md:w-[220px]' />
                        </div>
                    </div>
                </div>

                <div className='mt-8'>
                    {isLoading ? (
                        <>{[1, 2, 3, 4].map(i => (
                            <div key={i} className='flex py-6 px-5 border-t border-gray-800 items-center animate-pulse'>
                                <div className='h-4 bg-white/10 rounded w-1/3'></div>
                                <div className='h-4 bg-white/10 rounded w-1/4 ml-6'></div>
                                <div className='h-4 bg-white/10 rounded w-1/4 ml-6'></div>
                                <div className='ml-auto w-12 h-4 bg-white/10 rounded'></div>
                            </div>
                        ))}</>
                    ) : filtered.length === 0 ? (
                        <p className='text-gray-400'>No jobs found.</p>
                    ) : (
                        filtered.map(job => {
                            const office = offices.find(o => o.id === job.officeId);
                            const team = teams.find(t => t.id === job.teamId);
                            return (
                                <Link href={`/careers/${job.id}`} key={job.id} className='flex py-6 hover:bg-[#CCB0FA33] px-5 border-t border-gray-800 transition items-center'>
                                    <h3 className='flex-1 text-xs lg:text-[20px] font-medium lg:leading-[30px]'>{job.title}</h3>
                                    <span className='flex-1 text-xs lg:text-[18px] font-medium lg:leading-[30px]'>{office?.city || '—'}</span>
                                    <span className='flex-1 text-xs lg:text-[18px] font-medium lg:leading-[30px] text-white/50'>{team?.title || ''}</span>
                                    <div className='flex-1 justify-end whitespace-nowrap text-white text-xs lg:text-lg flex items-center gap-1.5 leading-[29px] font-medium underline futura'>
                                        <span>View Post</span>
                                        <ChevronRight size={19} />
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default JoinOurTeam
