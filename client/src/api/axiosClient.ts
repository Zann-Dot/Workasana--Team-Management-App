import axios from "axios"

const api = axios.create({
    baseURL: "https://workasana-api.onrender.com",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
    (response) => response?.data,
    (error) => {
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
)

export default api
