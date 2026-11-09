import { getDashboardStats } from "@/api/reports";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
    totalProjects: number;
    tasksCompleted: number;
    inProgress: number;
    overdue: number
}

export function useDashboard() {
    return useQuery<DashboardStats>({
        queryKey: ["dashboardStats"],
        queryFn: getDashboardStats
    })
}