import type { AxiosResponse } from "axios";
import api from "./axiosClient";
import type { Teams } from "@/hooks/useTeams";

export const getTeams = async (): Promise<Teams[]> => api.get("/api/teams")