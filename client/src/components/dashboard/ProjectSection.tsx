import { useState } from "react"
import {
   ArrowUpRightIcon,
   CalendarBlankIcon,
   CheckCircleIcon,
   CircleDashedIcon,
   ClockCountdownIcon,
   PlusIcon,
   SpinnerIcon,
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Avatar,
   AvatarFallback,
   AvatarGroup,
   AvatarGroupCount,
} from "@/components/ui/avatar"
import NewProjectModal from "./NewProjectModal"
import { useProjects } from "@/hooks/useProjects"
import { Skeleton } from "../ui/skeleton"
import { Link } from "react-router"

const status = ["In Progress", "In Review", "Completed"]

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

export default function ProjectSection() {
   const [modalOpen, setModalOpen] = useState(false)
   const { data: PROJECTS, isFetching, isLoading } = useProjects()
   const isProjectLoading = isFetching || isLoading
   return (
      <>
         <NewProjectModal open={modalOpen} onOpenChange={setModalOpen} />
         <Card>
            <CardHeader className="flex items-center justify-between border-b pb-4">
               <div>
                  <CardTitle className="text-base text-nowrap">Active Projects</CardTitle>
                  <CardDescription>Your team's ongoing work</CardDescription>
               </div>
               <div className="flex flex-wrap justify-end items-center gap-2">
                  <Link to="/projects">
                     <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="gap-1 text-xs"
                     >
                        View all
                        <ArrowUpRightIcon weight="bold" className="size-3" />
                     </Button>
                  </Link>
                  <Button
                     size="sm"
                     type="button"
                     className="gap-1.5"
                     onClick={() => setModalOpen(true)}
                  >
                     <PlusIcon weight="bold" className="size-4" />
                     New Project
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="pt-4">
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 space-4">
                  {isLoading
                     ? Array.from({ length: 4 }, (_, i) => (
                        <div
                           key={i}
                           className="group flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                        >
                           <div className="flex flex-col flex-wrap items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                 <Skeleton className="h-4 w-40" />
                                 <Skeleton className="h-4 w-10" />
                              </div>
                              <div className="flex items-center gap-2">
                                 <Skeleton className="h-4 w-20" />
                                 <Skeleton className="h-4 w-10" />
                              </div>
                           </div>
                        </div>
                     ))
                     : PROJECTS?.map((project) => (
                        <div
                           key={project._id}
                           className="group flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                        >
                           <div className="flex flex-col flex-wrap items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                 {isProjectLoading ? (
                                    <>
                                       <Skeleton className="h-4 w-40" />
                                       <Skeleton className="h-4 w-10" />
                                    </>
                                 ) : (
                                    <>
                                       <PriorityDot priority={project.priority} />
                                       <span className="text-sm font-medium">
                                          {project.name}
                                       </span>
                                       <Badge variant="secondary" className="text-xs">
                                          {/* {project.teamId} */}
                                       </Badge>
                                    </>
                                 )}
                              </div>
                              <div className="flex items-center gap-2">
                                 {isProjectLoading ? (
                                    <>
                                       <Skeleton className="h-4 w-20" />
                                       <Skeleton className="h-4 w-10" />
                                    </>
                                 ) : (
                                    <>
                                       <StatusBadge
                                          status={
                                             status.find(
                                                (s) =>
                                                   s.split(" ").join("").toLowerCase() ===
                                                   project.status
                                             ) as string
                                          }
                                       />
                                       <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                          <CalendarBlankIcon
                                             weight="duotone"
                                             className="size-3.5"
                                          />
                                          {project.dueDate}
                                       </span>
                                    </>
                                 )}
                              </div>
                           </div>
                           {/* <div className="flex items-center gap-3">
                           <AvatarGroup>
                              {project.members.slice(0, 3).map((m) => (
                                 <Avatar key={m} size="sm">
                                    <AvatarFallback className="text-[10px]">
                                       {m}
                                    </AvatarFallback>
                                 </Avatar>
                              ))}
                              {project.members.length > 3 && (
                                 <AvatarGroupCount className="text-[10px]">
                                    +{project.members.length - 3}
                                 </AvatarGroupCount>
                              )}
                           </AvatarGroup>
                        </div> */}
                        </div>
                     ))}
               </div>
            </CardContent>
         </Card>
      </>
   )
}
