import type { Tasks, TaskSummary } from "@/hooks/useTasks";
import api from "./axiosClient";

export const fetchTasks = async (): Promise<TaskSummary> => api.get("/api/tasks")
export const postTask = async (payload: Tasks) => api.post("/api/tasks", payload)