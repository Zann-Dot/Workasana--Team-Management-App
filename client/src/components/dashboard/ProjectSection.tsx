import {
   ArrowUpRightIcon,
   CalendarBlankIcon,
   CheckCircleIcon,
   CircleDashedIcon,
   ClockCountdownIcon,
   PlusIcon,
   SpinnerIcon,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import {
   Avatar,
   AvatarFallback,
   AvatarGroup,
   AvatarGroupCount,
} from '@/components/ui/avatar'

export const PROJECTS = [
   {
      id: 1,
      name: "Workasana Redesign",
      team: "Design",
      progress: 72,
      status: "In Progress",
      dueDate: "Nov 15",
      members: ["AJ", "SK", "LM"],
      priority: "High",
   },
   {
      id: 2,
      name: "API Integration",
      team: "Dev",
      progress: 45,
      status: "In Progress",
      dueDate: "Nov 28",
      members: ["RK", "PN"],
      priority: "Medium",
   },
   {
      id: 3,
      name: "Q4 Marketing Campaign",
      team: "Marketing",
      progress: 90,
      status: "In Review",
      dueDate: "Nov 05",
      members: ["TW", "AJ", "MR", "SL"],
      priority: "High",
   },
   {
      id: 4,
      name: "Mobile App MVP",
      team: "Dev",
      progress: 20,
      status: "In Progress",
      dueDate: "Dec 10",
      members: ["RK", "NV"],
      priority: "Low",
   },
]

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

export default function ProjectSection() {
   return (
      <Card>
         <CardHeader className="flex items-center justify-between border-b pb-4">
            <div>
               <CardTitle className="text-base">Active Projects</CardTitle>
               <CardDescription>Your team's ongoing work</CardDescription>
            </div>
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="sm" type="button" className="gap-1 text-xs">
                  View all
                  <ArrowUpRightIcon weight="bold" className="size-3" />
               </Button>
               <Button size="sm" type="button" className="gap-1.5">
                  <PlusIcon weight="bold" className="size-4" />
                  New Project
               </Button>
            </div>
         </CardHeader>
         <CardContent className="pt-4">
            <div className="grid grid-cols-4 space-x-4">
               {PROJECTS.map((project) => (
                  <div
                     key={project.id}
                     className="group flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                  >
                     <div className="flex flex-col flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                           <PriorityDot priority={project.priority} />
                           <span className="font-medium text-sm">{project.name}</span>
                           <Badge variant="secondary" className="text-xs">{project.team}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                           <StatusBadge status={project.status} />
                           <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CalendarBlankIcon weight="duotone" className="size-3.5" />
                              {project.dueDate}
                           </span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <AvatarGroup>
                           {project.members.slice(0, 3).map((m) => (
                              <Avatar key={m} size="sm">
                                 <AvatarFallback className="text-[10px]">{m}</AvatarFallback>
                              </Avatar>
                           ))}
                           {project.members.length > 3 && (
                              <AvatarGroupCount className="text-[10px]">
                                 +{project.members.length - 3}
                              </AvatarGroupCount>
                           )}
                        </AvatarGroup>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   )
}
