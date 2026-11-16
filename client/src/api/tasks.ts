import type { Tasks, TaskResponse } from "@/hooks/useTasks"
import api from "./axiosClient"

export const fetchTasks = async (queryParams: string): Promise<TaskResponse> =>
    api.get(`/api/tasks${queryParams ? "?" : ""}${queryParams}`)

export const postTask = async (payload: Tasks) =>
    api.post("/api/tasks", payload)
