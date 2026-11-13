import api from "./axiosClient";

export const fetchTasks = async () => api.get("/api/tasks")