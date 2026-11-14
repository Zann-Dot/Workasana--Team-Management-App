import { fetchTasks, postTask } from "@/api/tasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Users } from "./useUser"
import { toast } from "@/components/ui/toast"

export interface Tasks {
    _id?: string
    name: string
    project: string
    team: string
    owners: Users[] | string[]
    tags: string[]
    timeToComplete: number | string
    status: string
    priority: string
    createdAt?: string
    updatedAt?: string
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

export function useCreateTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postTask,
        onSuccess: (data: any) => {
            toast.add({
                title: data?.message,
                id: "success",
                timeout: 2500,
                type: "success"
            })
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error(error.message)
            toast.add({
                title: error.message,
                id: "error",
                timeout: 2500,
                priority: "high",
                type: "error"
            })
        }
    })
}