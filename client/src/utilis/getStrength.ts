export const getStrength = (count: number, password: string) => {
    if (!password) {
        return {
            label: "",
            color: "bg-muted",
            textColor: "text-muted-foreground",
            bars: 0,
        }
    }
    if (count <= 2) {
        return {
            label: "Weak",
            color: "bg-destructive",
            textColor: "text-destructive",
            bars: 1,
        }
    }
    if (count === 3) {
        return {
            label: "Fair",
            color: "bg-amber-500",
            textColor: "text-amber-500",
            bars: 2,
        }
    }
    if (count === 4) {
        return {
            label: "Good",
            color: "bg-blue-500",
            textColor: "text-blue-500 dark:text-blue-400",
            bars: 3,
        }
    }
    return {
        label: "Strong",
        color: "bg-emerald-500",
        textColor: "text-emerald-500 dark:text-emerald-400",
        bars: 4,
    }
}