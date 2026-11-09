import api from "./axiosClient";
import type { DashboardStats } from "@/hooks/useReports";

export async function getDashboardStats(): Promise<DashboardStats> {
    return api.get("/api/reports/dashboard")
}