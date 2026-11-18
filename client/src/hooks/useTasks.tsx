import { fetchTasks, postTask } from "@/api/tasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Users } from "./useUser"
import { toast } from "@/components/ui/toast"

export interface Tasks {
    _id?: string
    name: string
    team: string
    status: string
    project: string
    priority: string
    tags: string[]
    owners: Users[] | string[]
    timeToComplete: number | string
    dueDate?: Date
    createdAt?: Date
    updatedAt?: Date,
    completedAt?: Date
}

export interface TaskResponse {
    currentPage: number
    tasks: Tasks[]
    totalPages: number
    totalTasks: number
}

export function useGetTasks(queryParams: string = "") {
    return useQuery<TaskResponse>({
        queryFn: () => fetchTasks(queryParams),
        queryKey: ["tasks", { queryParams }],
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
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
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