import { fetchTasks } from "@/api/tasks"
import { useQuery } from "@tanstack/react-query"
import type { Users } from "./useUser"

export interface Tasks {
    _id: string
    name: string
    project: string
    team: string
    owners: Users[]
    tags: string[]
    timeToComplete: number
    status: string
    createdAt: string
    updatedAt: string
    priority: string
}

export interface TaskSummary {
    currentPage: number
    tasks: Tasks[]
    totalPages: number
    totalTasks: number
}

export function useGetTasks() {
    return useQuery<TaskSummary>({
        queryFn: fetchTasks,
        queryKey: ["tasks"],
    })
}
