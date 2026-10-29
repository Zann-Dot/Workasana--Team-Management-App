import type { Login } from "@/hooks/useUser"
import axios from "axios"

export async function loginAuth(payload: Login) {
    const response = await axios.post("https://workasana-api.onrender.com/auth/login", payload)
    return response?.data
}
