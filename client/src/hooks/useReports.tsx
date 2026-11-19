import { getDashboardStats, getOverdues, getUpcomingDeadline } from "@/api/reports";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
    readonly totalProjects: number;
    readonly tasksCompleted: number;
    readonly inProgress: number;
    readonly overdue: number;
    readonly projectsThisMonth: number;
    readonly tasksCompletedThisWeek: number;
    readonly tasksDueToday: number
}

export interface UpcomingDeadline {
    readonly type: "task" | "project",
    readonly name: string,
    readonly priority: "low" | "medium" | "high",
    readonly dueDate: Date,
}

export interface Overdue {
    readonly _id: string,
    readonly name: string,
    readonly team: string,
    readonly owners: string[]
}

export function useDashboard() {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: getDashboardStats
    })
}

export function useUpcomingDeadlines() {
    return useQuery({
        queryFn: getUpcomingDeadline,
        queryKey: ["upcomingDeadlines"]
    })
}

export function useOverdues() {
    return useQuery({
        queryFn: getOverdues,
        queryKey: ["overdues"]
    })
}