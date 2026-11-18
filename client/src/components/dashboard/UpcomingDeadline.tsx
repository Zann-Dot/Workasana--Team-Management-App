import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { CalendarBlankIcon } from "@phosphor-icons/react"
import { useUpcomingDeadlines } from "@/hooks/useReports"
import { format } from "date-fns"
import { Skeleton } from "../ui/skeleton"

function PriorityDot({ priority }: { priority: string }) {
    const colors: Record<string, string> = {
        high: "bg-destructive",
        medium: "bg-amber-500",
        low: "bg-emerald-500",
    }
    return (
        <span
            title={`${priority} priority`}
            className={`inline-block size-2 rounded-full ${colors[priority] ?? "bg-muted"}`}
        />
    )
}

export default function UpcomingDeadline() {
    const { data, isLoading } = useUpcomingDeadlines()
    const capitalizeFirst = (str: string) =>
        str.slice(0, 1).toUpperCase().concat(str.slice(1))

    return (
        <Card>
            <CardHeader className="border-b pb-4">
                <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks and projects due soon</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <ul className="space-y-3">
                    {isLoading ? (
                        <>
                            {Array.from({ length: 3 }, (_, i) => (
                                <li key={i} className="flex items-center gap-2.5 mb-4">
                                    <Skeleton className="size-2" />
                                    <Skeleton className="h-3 w-24 lg:w-74" />
                                    <Skeleton className="ms-auto h-3 w-10" />
                                    <Skeleton className="h-3 w-10" />
                                </li>
                            ))}
                        </>
                    ) : (
                        <>
                            {data?.map((d, i) => (
                                <li key={i} className="flex items-center gap-2.5">
                                    <PriorityDot priority={d.priority} />
                                    <span className="flex-1 truncate text-xs font-medium">
                                        {capitalizeFirst(d.name)}
                                    </span>
                                    <Badge variant="outline" className="shrink-0 text-[10px]">
                                        {capitalizeFirst(d.type)}
                                    </Badge>
                                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                        <CalendarBlankIcon weight="duotone" className="size-3.5" />
                                        {format(d.dueDate, "MMM dd")}
                                    </span>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </CardContent>
        </Card >
    )
}
