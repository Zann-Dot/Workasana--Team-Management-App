import type { Login, Signup, Users } from "@/hooks/useUser"
import api from "./axiosClient"

export async function loginAuth(payload: Login) {
    return await api.post("/api/auth/login", payload)
}

export async function resetPassword(passwordConfig: Login) {
    return await api.put("/api/auth/reset-password", passwordConfig)
}

export async function signup(payload: Signup) {
    return await api.post("/api/auth/signup", payload)
}

export const getUsers = async (): Promise<Users[]> => await api.get("/api/users")