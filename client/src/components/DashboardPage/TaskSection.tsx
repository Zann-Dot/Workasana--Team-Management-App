import { useState } from "react"
import {
   ArrowUpRightIcon,
   CalendarBlankIcon,
   CheckCircleIcon,
   CircleDashedIcon,
   ClockCountdownIcon,
   PlusIcon,
   SpinnerIcon,
   TagIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

export const TASKS = [
   {
      id: 1,
      title: "Finalize login page design",
      project: "Workasana Redesign",
      status: "Completed",
      dueDate: "Oct 30",
      priority: "High",
      tag: "Design",
   },
   {
      id: 2,
      title: "Set up Axios interceptors",
      project: "API Integration",
      status: "In Progress",
      dueDate: "Nov 08",
      priority: "High",
      tag: "Dev",
   },
   {
      id: 3,
      title: "Write unit tests for auth",
      project: "API Integration",
      status: "In Progress",
      dueDate: "Nov 12",
      priority: "Medium",
      tag: "Dev",
   },
   {
      id: 4,
      title: "Create social media assets",
      project: "Q4 Marketing Campaign",
      status: "Completed",
      dueDate: "Nov 01",
      priority: "Medium",
      tag: "Marketing",
   },
   {
      id: 5,
      title: "Draft onboarding email copy",
      project: "Q4 Marketing Campaign",
      status: "Todo",
      dueDate: "Nov 14",
      priority: "Low",
      tag: "Marketing",
   },
   {
      id: 6,
      title: "Set up push notifications",
      project: "Mobile App MVP",
      status: "Todo",
      dueDate: "Dec 05",
      priority: "Medium",
      tag: "Dev",
   },
]

type TaskFilter = "All" | "In Progress" | "Completed" | "Todo"

function StatusBadge({ status }: { status: string }) {
   const map: Record<string, string> = {
      "In Progress": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      "In Review": "bg-primary/10 text-primary",
      Todo: "bg-muted text-muted-foreground",
   }
   const icon: Record<string, React.ReactNode> = {
      "In Progress": <SpinnerIcon weight="bold" className="size-3" />,
      Completed: <CheckCircleIcon weight="bold" className="size-3" />,
      "In Review": <ClockCountdownIcon weight="bold" className="size-3" />,
      Todo: <CircleDashedIcon weight="bold" className="size-3" />,
   }
   return (
      <span
         className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}
      >
         {icon[status]}
         {status}
      </span>
   )
}

function PriorityDot({ priority }: { priority: string }) {
   const colors: Record<string, string> = {
      High: "bg-destructive",
      Medium: "bg-amber-500",
      Low: "bg-emerald-500",
   }
   return (
      <span
         title={`${priority} priority`}
         className={`inline-block size-2 rounded-full ${colors[priority] ?? "bg-muted"}`}
      />
   )
}

export default function TaskSection() {
   const [taskFilter, setTaskFilter] = useState<TaskFilter>("All")

   const filteredTasks =
      taskFilter === "All" ? TASKS : TASKS.filter((t) => t.status === taskFilter)

   const FILTERS: TaskFilter[] = ["All", "In Progress", "Completed", "Todo"]

   return (
      <Card>
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 border-b pb-4">
            <div>
               <div>
                  <CardTitle className="text-base">My Tasks</CardTitle>
                  <CardDescription>Tasks assigned to you across all projects</CardDescription>
               </div>
               <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  {FILTERS.map((f) => (
                     <button
                        key={f}
                        type="button"
                        onClick={() => setTaskFilter(f)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${taskFilter === f
                           ? "bg-primary text-primary-foreground"
                           : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                           }`}
                     >
                        {f}
                     </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="sm" type="button" className="gap-1 text-xs">
                  View all
                  <ArrowUpRightIcon weight="bold" className="size-3" />
               </Button>
               <Button size="sm" type="button" className="gap-1.5">
                  <PlusIcon weight="bold" className="size-4" />
                  New Task
               </Button>
            </div>
         </CardHeader>
         <CardContent className="pt-4">
            {filteredTasks.length === 0 ? (
               <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
                  <CheckCircleIcon weight="duotone" className="size-10 text-primary/40" />
                  <p className="text-sm font-medium">All clear — no tasks here!</p>
               </div>
            ) : (
               <div className="divide-y">
                  {filteredTasks.map((task) => (
                     <div
                        key={task.id}
                        className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
                     >
                        <div
                           className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${task.status === "Completed"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-muted-foreground/40"
                              }`}
                        >
                           {task.status === "Completed" && (
                              <CheckCircleIcon weight="fill" className="size-3" />
                           )}
                        </div>

                        <span
                           className={`flex-1 text-sm font-medium ${task.status === "Completed"
                              ? "line-through text-muted-foreground"
                              : ""
                              }`}
                        >
                           {task.title}
                        </span>

                        <div className="flex items-center gap-2 flex-wrap">
                           <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <TagIcon weight="duotone" className="size-3.5" />
                              {task.tag}
                           </span>
                           <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CalendarBlankIcon weight="duotone" className="size-3.5" />
                              {task.dueDate}
                           </span>
                           <PriorityDot priority={task.priority} />
                           <StatusBadge status={task.status} />
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </CardContent>
      </Card>
   )
}
