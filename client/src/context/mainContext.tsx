import React, {
    createContext,
    useContext,
    useState,
    type ChangeEvent,
    type Dispatch,
    type SetStateAction,
} from "react"
type ValidateFieldType =
    | "Email is required"
    | "Please enter a valid email address"
    | "Name is required"
    | "Password is required"
    | undefined

type setState<T> = Dispatch<SetStateAction<T>>

interface ErrorType {
    name?: string
    email?: string
    password?: string
}

interface FormType {
    name?: string
    email: string
    password: string
}

interface AlertType {
    type: "success" | "error" | "loading" | ""
    message?: string
    open: boolean
}

interface ContextType {
    validateField(
        name?: string | undefined,
        value?: string | undefined
    ): ValidateFieldType
    handleChange(e: React.ChangeEvent<HTMLInputElement, Element>): void
    resetAuthStates(): void
    form: FormType
    setForm: setState<FormType>
    error: ErrorType
    setError: setState<ErrorType>
    alert: AlertType
    setAlert: setState<AlertType>
    isNameInvalid: boolean
    isEmailInvalid: boolean
    isPasswordInvalid: boolean
}

const Context = createContext<ContextType | null>(null)
export const useMain = () => {
    const context = useContext(Context)
    if (!context) throw new Error("useMain should be used within the provider")
    return context
}

export function ContextProvider({ children }: React.PropsWithChildren) {
    const [alert, setAlert] = useState<AlertType>({
        open: false,
        type: "",
        message: "",
    })
    const [form, setForm] = useState<FormType>({
        name: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState<ErrorType>({
        name: "",
        email: "",
        password: "",
    })

    function resetAuthStates() {
        setForm({
            name: "",
            email: "",
            password: "",
        })
        setError({
            name: "",
            email: "",
            password: "",
        })
        setAlert({ open: false, type: "" })
    }

    function validateField(name?: string, value?: string): ValidateFieldType {
        if (name === "email") {
            if (!value?.trim()) return "Email is required"
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return "Please enter a valid email address"
        } else if (name === "password") {
            if (!value?.trim()) return "Password is required"
        } else {
            if (!value?.trim()) return "Name is required"
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (error.email || error.password || error.name) {
            const message = validateField(name, value)
            setError((prev) => ({ ...prev, [name]: message ?? "" }))
        }
    }

    const isNameInvalid = Boolean(error.name)
    const isEmailInvalid = Boolean(error.email)
    const isPasswordInvalid = Boolean(error.password)

    const provider = {
        validateField,
        form,
        setForm,
        error,
        setError,
        handleChange,
        isNameInvalid,
        isEmailInvalid,
        isPasswordInvalid,
        alert,
        setAlert,
        resetAuthStates,
    }

    return <Context.Provider value={provider}>{children}</Context.Provider>
}
