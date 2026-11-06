import Cookies from "js-cookie"

export function CheckAuthToken(): boolean {
    const cookieToken = Cookies.get("isLoggedIn")
    const localToken =
        typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") : null
    return cookieToken === "true" || localToken === "true"
}
