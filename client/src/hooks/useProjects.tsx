import { postProject } from "@/api/projects"
import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface Project {
    name: string,
    teamId: string,
    status: string
    dueOn: Date | string
    priority: string
    description?: string
}

export function useCreateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postProject,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.add({
                title: data.message,
                id: "success",
                timeout: 2500
            })

        },
        onError: (error) => {
            console.error(error.message);
            toast.add({
                title: error.message,
                id: "error",
                timeout: 2500
            })
        }
    })
}