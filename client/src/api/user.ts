import type { Login } from "@/hooks/useUser"
import axios from "axios"

export async function loginAuth(payload: Login) {
    try {
        const response = await axios.post("/api/auth/login", payload)
        return response?.data
    } catch (error: any) {
        if (error.response) {
            const message =
                error.response.data?.error || "An unexpected server error occurred."
            return Promise.reject(new Error(message))
        } else if (error.request) {
            return Promise.reject(
                new Error("Network error. Please check your internet connection.")
            )
        } else {
            return Promise.reject(new Error(error.message))
        }
    }
}
