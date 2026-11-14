import type { Project, Projects } from "@/hooks/useProjects"
import api from "./axiosClient"

export const fetchProjects = async (queryParams: string): Promise<Projects[]> =>
    api.get(`/api/projects?${queryParams}`)

export const postProject = async (payload: Project) =>
    api.post("/api/projects", payload)
