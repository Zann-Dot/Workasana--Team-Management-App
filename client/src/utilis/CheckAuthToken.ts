import Cookies from "js-cookie"
export function CheckAuthToken(): boolean {
    const token = Cookies.get("isLoggedIn");
    return token === "true"
}