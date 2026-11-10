import { useDashboard } from "@/hooks/useReports"
import {
    CheckCircleIcon,
    FolderSimpleIcon,
    SpinnerIcon,
    WarningCircleIcon,
} from "@phosphor-icons/react"

export function getStats() {
    const { data } = useDashboard()
    const projectsValue = `${data?.projectsThisMonth === 0 ? "" : "+"}${data?.projectsThisMonth}`
    const tasksValue = `${data?.tasksCompletedThisWeek === 0 ? "" : "+"}${data?.tasksCompletedThisWeek}`

    const STATS = [
        {
            label: "Total Projects",
            value: data?.totalProjects ?? 0,
            delta: `${projectsValue} this month`,
            icon: FolderSimpleIcon,
            color: "text-primary",
        },
        {
            label: "Tasks Completed",
            value: data?.tasksCompleted ?? 0,
            delta: `${tasksValue} this week`,
            icon: CheckCircleIcon,
            color: "text-emerald-500",
        },
        {
            label: "In Progress",
            value: data?.inProgress ?? 0,
            delta: `${data?.tasksDueToday} due today`,
            icon: SpinnerIcon,
            color: "text-amber-500",
        },
        {
            label: "Overdue",
            value: data?.overdue ?? 0,
            delta: data?.overdue === 0 ? "no overdue" : "needs attention",
            icon: WarningCircleIcon,
            color: "text-destructive",
        },
    ]

    return STATS
}
