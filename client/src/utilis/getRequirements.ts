interface Requirements {
    readonly id: string
    label: string
    met: boolean
}

export default function getRequirements(password: string): Requirements[] {
    const requirements = [
        {
            id: "length",
            label: "Minimum 8 characters",
            met: password.length >= 8,
        },
        {
            id: "uppercase",
            label: "At least one uppercase letter (A-Z)",
            met: /[A-Z]/.test(password),
        },
        {
            id: "lowercase",
            label: "At least one lowercase letter (a-z)",
            met: /[a-z]/.test(password),
        },
        {
            id: "number",
            label: "At least one number (0-9)",
            met: /[0-9]/.test(password),
        },
        {
            id: "special",
            label: "At least one special character (!@#$%^&*)",
            met: /[^A-Za-z0-9]/.test(password),
        },
    ]

    return requirements
}
