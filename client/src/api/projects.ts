import type { Project, Projects } from "@/hooks/useProjects";
import api from "./axiosClient";

export const postProject = async (payload: Project) => api.post("/api/projects", payload);
export const fetchProjects = async (): Promise<Projects[]> => api.get("/api/projects")