import type { TaskSummary } from "@/hooks/useTasks";
import api from "./axiosClient";

export const fetchTasks = async (): Promise<TaskSummary> => api.get("/api/tasks")