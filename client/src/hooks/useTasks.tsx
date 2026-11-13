import { fetchTasks } from "@/api/tasks";
import { useQuery } from "@tanstack/react-query";

export function useGetTasks() {
    return useQuery({
        queryFn: fetchTasks,
        queryKey: ["tasks"]
    })
}