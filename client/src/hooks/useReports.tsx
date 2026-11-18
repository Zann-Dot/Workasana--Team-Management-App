import { getDashboardStats, getUpcomingDeadline } from "@/api/reports";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
    totalProjects: number;
    tasksCompleted: number;
    inProgress: number;
    overdue: number;
    projectsThisMonth: number;
    tasksCompletedThisWeek: number;
    tasksDueToday: number
}

export interface UpcomingDeadline {
    type: "task" | "project",
    name: string,
    priority: "low" | "medium" | "high",
    dueDate: Date,
}

export function useDashboard() {
    return useQuery<DashboardStats>({
        queryKey: ["dashboardStats"],
        queryFn: getDashboardStats
    })
}

export function useUpcomingDeadlines() {
    return useQuery<UpcomingDeadline[]>({
        queryFn: getUpcomingDeadline,
        queryKey: ["upcomingDeadlines"]
    })
}