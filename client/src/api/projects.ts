import type { Project } from "@/hooks/useProjects";
import api from "./axiosClient";

export const postProject = async (payload: Project) => api.post("/api/projects", payload)