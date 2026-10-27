import type { Item } from "@/pages/Landing"
import {
    ChartBarIcon,
    FunnelIcon,
    KanbanIcon,
    LinkIcon,
    ListChecksIcon,
    PlusCircleIcon,
    ShieldCheckIcon,
    TagIcon,
    UsersThreeIcon,
} from "@phosphor-icons/react"

export const features: Item[] = [
    {
        icon: ShieldCheckIcon,
        title: "Secure Authentication",
        description: "JWT-based login and signup keep your workspace protected.",
    },
    {
        icon: PlusCircleIcon,
        title: "Task Creation",
        description: "Create tasks with project, team, owners, tags and status.",
    },
    {
        icon: ListChecksIcon,
        title: "Task List & Sorting",
        description: "Browse every task and sort by completion date or priority.",
    },
    {
        icon: KanbanIcon,
        title: "Project View",
        description: "See tasks grouped by project with key details at a glance.",
    },
    {
        icon: UsersThreeIcon,
        title: "Team View",
        description: "Group work by Sales, Marketing, Development and Finance.",
    },
    {
        icon: TagIcon,
        title: "Tags & Labels",
        description: "Categorize tasks with custom tags like Urgent or Bug.",
    },
    {
        icon: FunnelIcon,
        title: "Smart Filtering",
        description: "Filter by owner, team, tags, project and status.",
    },
    {
        icon: LinkIcon,
        title: "URL-based Filters",
        description: "Share filtered task views through simple, combinable links.",
    },
    {
        icon: ChartBarIcon,
        title: "Reports & Charts",
        description: "Visualize work done, pending days and closed tasks.",
    },
]
