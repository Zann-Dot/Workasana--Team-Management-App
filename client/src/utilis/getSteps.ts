import type { Item } from "@/pages/Landing";
import { ClipboardTextIcon, PlusCircleIcon, RocketLaunchIcon } from "@phosphor-icons/react";

export const steps: Item[] = [
    {
        icon: ClipboardTextIcon,
        title: "Create your workspace",
        description:
            "Sign up, then set up your teams and projects so everyone knows where work lives.",
    },
    {
        icon: PlusCircleIcon,
        title: "Add and assign tasks",
        description:
            "Break projects into tasks, assign owners, add tags and estimate the days needed.",
    },
    {
        icon: RocketLaunchIcon,
        title: "Track progress together",
        description:
            "Move tasks from To Do to Completed, filter your views and review reports.",
    },
]