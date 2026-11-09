import { CalendarBlankIcon } from "@phosphor-icons/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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

export default function Dashboard() {
   const STATS = getStats();

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
                                 <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                                 <p className="mt-0.5 text-xs text-muted-foreground">
                                    {stat.delta}
                                 </p>
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
                        <CardTitle className="text-base">Team Activity</CardTitle>
                        <CardDescription>
                           Recent actions by your teammates
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="pt-4">
                        <ul className="space-y-3">
                           {[
                              {
                                 user: "SK",
                                 name: "Sara Kim",
                                 action: "completed",
                                 item: "Brand Audit report",
                                 time: "2m ago",
                              },
                              {
                                 user: "RK",
                                 name: "Raj Kumar",
                                 action: "commented on",
                                 item: "API auth task",
                                 time: "18m ago",
                              },
                              {
                                 user: "LM",
                                 name: "Leo Martinez",
                                 action: "moved",
                                 item: "Mockup v3 to In Review",
                                 time: "1h ago",
                              },
                              {
                                 user: "AJ",
                                 name: "Alex Johnson",
                                 action: "created",
                                 item: "Mobile push notification task",
                                 time: "3h ago",
                              },
                           ].map((a) => (
                              <li key={a.time} className="flex items-start gap-2.5">
                                 <Avatar size="sm" className="mt-0.5 shrink-0">
                                    <AvatarFallback className="text-[10px]">
                                       {a.user}
                                    </AvatarFallback>
                                 </Avatar>
                                 <p className="text-xs leading-relaxed">
                                    <span className="font-semibold">{a.name}</span>{" "}
                                    {a.action}{" "}
                                    <span className="text-muted-foreground">
                                       "{a.item}"
                                    </span>
                                 </p>
                                 <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                                    {a.time}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader className="border-b pb-4">
                        <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                        <CardDescription>Tasks and projects due soon</CardDescription>
                     </CardHeader>
                     <CardContent className="pt-4">
                        <ul className="space-y-3">
                           {[
                              {
                                 name: "Q4 Marketing Campaign",
                                 date: "Nov 05",
                                 type: "Project",
                                 urgency: "High",
                              },
                              {
                                 name: "Set up Axios interceptors",
                                 date: "Nov 08",
                                 type: "Task",
                                 urgency: "High",
                              },
                              {
                                 name: "Write unit tests for auth",
                                 date: "Nov 12",
                                 type: "Task",
                                 urgency: "Medium",
                              },
                              {
                                 name: "Draft onboarding email copy",
                                 date: "Nov 14",
                                 type: "Task",
                                 urgency: "Low",
                              },
                              {
                                 name: "Workasana Redesign",
                                 date: "Nov 15",
                                 type: "Project",
                                 urgency: "High",
                              },
                           ].map((d) => (
                              <li key={d.name} className="flex items-center gap-2.5">
                                 <PriorityDot priority={d.urgency} />
                                 <span className="flex-1 truncate text-xs font-medium">
                                    {d.name}
                                 </span>
                                 <Badge variant="outline" className="shrink-0 text-[10px]">
                                    {d.type}
                                 </Badge>
                                 <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                    <CalendarBlankIcon
                                       weight="duotone"
                                       className="size-3.5"
                                    />
                                    {d.date}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </>
   )
}
