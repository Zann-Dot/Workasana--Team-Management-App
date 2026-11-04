import { loginAuth, resetPassword } from "@/api/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
export type Login = {
    email: string
    password: string
}

export function useLoginAuth() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: loginAuth,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (err) => console.error(err.message),
    })
}

export function useResetPassword() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (err) => console.error(err.message),
    })
}
