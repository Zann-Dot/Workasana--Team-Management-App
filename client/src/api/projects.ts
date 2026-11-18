import type { ProjectPayload, ProjectResponse } from "@/hooks/useProjects"
import api from "./axiosClient"

export const fetchProjects = async (queryParams: string): Promise<ProjectResponse> =>
    api.get(`/api/projects?${queryParams}`)

export const postProject = async (payload: ProjectPayload) =>
    api.post("/api/projects", payload)
