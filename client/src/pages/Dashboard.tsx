import { UsersThreeIcon, WarningIcon } from "@phosphor-icons/react"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card"
import ProjectSection from "@/components/dashboard/ProjectSection"
import TaskSection from "@/components/dashboard/TaskSection"
import { getStats } from "@/utilis/getDashboardStats"
import { useDashboard, useOverdues } from "@/hooks/useReports"
import { Skeleton } from "@/components/ui/skeleton"
import UpcomingDeadline from "@/components/dashboard/UpcomingDeadline"
import { Badge } from "@/components/ui/badge"



export default function Dashboard() {
   const { isLoading, isFetching } = useDashboard()
   const { data: overdues, isLoading: isOverdueLoading } = useOverdues()
   const isStatsLoading = isFetching || isLoading
   const STATS = getStats()

   return (
      <>
         <div className="flex min-h-[calc(100vh-4rem-81px)] flex-1 flex-col overflow-auto">
            <div className="flex h-14 items-center justify-between border-b bg-background/80 px-5 backdrop-blur">
               <div>
                  <h1 className="text-base font-semibold">
                     Overview{" "}
                     <span className="font-normal text-muted-foreground">
                        / Dashboard
                     </span>
                  </h1>
               </div>
            </div>

            <div className="flex-1 space-y-6 p-5">
               <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {STATS.map((stat) => (
                     <Card key={stat.label} className="gap-3">
                        <CardContent className="pt-5">
                           <div className="flex items-start justify-between">
                              <div>
                                 <p className="text-xs font-medium text-muted-foreground">
                                    {stat.label}
                                 </p>
                                 {isStatsLoading ? (
                                    <>
                                       <Skeleton className="h-8 w-10 my-2" />
                                       <Skeleton className="h-3 w-10 my-2" />
                                    </>
                                 ) : (
                                    <>
                                       <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                                       <p className="mt-0.5 text-xs text-muted-foreground">
                                          {stat.delta}
                                       </p>
                                    </>
                                 )}
                              </div>
                              <div className={`rounded-lg bg-muted/60 p-2 ${stat.color}`}>
                                 <stat.icon weight="duotone" className="size-5" />
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
               <ProjectSection />
               <TaskSection />

               <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                     <CardHeader className="border-b pb-4">
                        <CardTitle className="text-base">Overdue Tasks</CardTitle>
                        <CardDescription>
                           Needs Attention!
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="pt-4">
                        {isOverdueLoading ? (
                           <ul className="space-y-3">
                              {Array.from({ length: 3 }, (_, i) => (
                                 <li key={i} className="flex items-center justify-between gap-2.5 mb-4">
                                    <Skeleton className="h-3 w-80" />
                                    <span className="flex items-center gap-2.5">
                                       <Skeleton className="h-3 w-10" />
                                       <Skeleton className="h-3 w-10" />
                                    </span>
                                 </li>
                              ))}
                           </ul>
                        ) : (
                           <ul className="space-y-3">
                              {overdues?.map((o) => (
                                 <li key={o._id} className="flex items-center justify-between gap-2.5">
                                    <div className="flex items-center gap-1">
                                       <WarningIcon className="text-destructive" />
                                       {o.name}
                                    </div>
                                    <span className="flex items-center gap-2.5">
                                       <Badge variant="secondary" className="text-xs">
                                          {o.team}
                                       </Badge>
                                       <div className="flex items-center gap-1 text-muted-foreground">
                                          <UsersThreeIcon size={18} weight="duotone" />
                                          <AvatarGroup>
                                             {o.owners.slice(0, 3).map((m, i) => (
                                                <Avatar key={i} size="sm">
                                                   <AvatarFallback className="text-[10px]">
                                                      {m.split(" ").map(s => s.charAt(0).toUpperCase()).join("")}
                                                   </AvatarFallback>
                                                </Avatar>
                                             ))}
                                             {o.owners.length > 3 && (
                                                <AvatarGroupCount className="text-[10px]">
                                                   +{o.owners.length - 3}
                                                </AvatarGroupCount>
                                             )}
                                          </AvatarGroup>
                                       </div>
                                    </span>
                                 </li>
                              ))}
                           </ul>
                        )}
                     </CardContent>
                  </Card>

                  <UpcomingDeadline />
               </div>
            </div>
         </div>
      </>
   )
}
