import { fetchProjects, postProject } from "@/api/projects"
import { toast } from "@/components/ui/toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export interface Project {
    name: string
    teamId: string
    status: string
    dueOn: Date | string
    priority: string
    description?: string
}

export interface Projects {
    createdAt: string
    dueDate: string
    dueOn: string
    name: string
    priority: string
    status: string
    teamId: {
        _id: string,
        name: string,
        updatedAt: string
    }
    updatedAt: string
    __v: number
    _id: string
}

export interface ProjectResponse {
    currentPage: number,
    projects: Projects[],
    totalPages: number,
    totalProjects: number
}

export function useCreateProject() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postProject,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            toast.add({
                title: data.message,
                id: "success",
                timeout: 2500,
            })
        },
        onError: (error) => {
            console.error(error.message)
            toast.add({
                title: error.message,
                id: "error",
                timeout: 2500,
            })
        },
    })
}

export function useProjects(queryParams: string = "") {
    return useQuery<ProjectResponse>({
        queryFn: () => fetchProjects(queryParams),
        queryKey: ["projects", { queryParams }, "dashboardStats"],
    })
}