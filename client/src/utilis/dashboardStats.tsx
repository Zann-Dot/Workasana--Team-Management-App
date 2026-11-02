import { CheckCircleIcon, FolderSimpleIcon, SpinnerIcon, WarningCircleIcon } from "@phosphor-icons/react";

const STATS = [
    {
        label: "Total Projects",
        value: "12",
        delta: "+2 this month",
        icon: FolderSimpleIcon,
        color: "text-primary",
    },
    {
        label: "Tasks Completed",
        value: "47",
        delta: "+8 this week",
        icon: CheckCircleIcon,
        color: "text-emerald-500",
    },
    {
        label: "In Progress",
        value: "18",
        delta: "3 due today",
        icon: SpinnerIcon,
        color: "text-amber-500",
    },
    {
        label: "Overdue",
        value: "3",
        delta: "needs attention",
        icon: WarningCircleIcon,
        color: "text-destructive",
    },
]

export default STATS