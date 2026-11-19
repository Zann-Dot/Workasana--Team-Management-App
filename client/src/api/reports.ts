import api from "./axiosClient";
import type { DashboardStats, Overdue, UpcomingDeadline } from "@/hooks/useReports";

export async function getDashboardStats(): Promise<DashboardStats> {
    return api.get("/api/reports/dashboard")
}

export async function getUpcomingDeadline(): Promise<UpcomingDeadline[]> {
    return api.get("/api/reports/upcoming-deadlines")
}

export async function getOverdues(): Promise<Overdue[]> {
    return api.get("/api/reports/overdues")
}