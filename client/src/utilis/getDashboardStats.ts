import { useDashboard } from "@/hooks/useReports"
import {
    CheckCircleIcon,
    FolderSimpleIcon,
    SpinnerIcon,
    WarningCircleIcon,
} from "@phosphor-icons/react"

export function getStats() {
    const { data } = useDashboard()

    const STATS = [
        {
            label: "Total Projects",
            value: data?.totalProjects ?? 0,
            delta: "+2 this month",
            icon: FolderSimpleIcon,
            color: "text-primary",
        },
        {
            label: "Tasks Completed",
            value: data?.tasksCompleted ?? 0,
            delta: "+8 this week",
            icon: CheckCircleIcon,
            color: "text-emerald-500",
        },
        {
            label: "In Progress",
            value: data?.inProgress ?? 0,
            delta: "3 due today",
            icon: SpinnerIcon,
            color: "text-amber-500",
        },
        {
            label: "Overdue",
            value: data?.overdue ?? 0,
            delta: "needs attention",
            icon: WarningCircleIcon,
            color: "text-destructive",
        },
    ]

    return STATS
}
