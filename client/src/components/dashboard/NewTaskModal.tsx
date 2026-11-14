import { useState, type MouseEvent } from "react"
import {
   BuildingsIcon,
   CaretDownIcon,
   CheckCircleIcon,
   CheckIcon,
   CheckSquareOffsetIcon,
   CircleDashedIcon,
   ClockCountdownIcon,
   FlagIcon,
   FolderIcon,
   ProhibitIcon,
   SpinnerIcon,
   TextTIcon,
} from "@phosphor-icons/react"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import OwnersMultiSelect, { DEMO_OWNERS } from "./task/OwnersMultiSelect"
import TagsMultiSelect from "./task/TagsMultiSelect"
import { useCreateTask, type Tasks } from "@/hooks/useTasks"
import { Toaster } from "../ui/toast"
import { useProjects } from "@/hooks/useProjects"
import { useTeams } from "@/hooks/useTeams"

const PRIORITY_OPTIONS = [
   {
      value: "low",
      label: "Low",
      color: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500",
   },
   {
      value: "medium",
      label: "Medium",
      color: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500",
   },
   {
      value: "high",
      label: "High",
      color: "text-destructive",
      dot: "bg-destructive",
   },
]

const STATUS_OPTIONS = [
   {
      value: "todo",
      label: "To Do",
      icon: CircleDashedIcon,
      color: "text-muted-foreground",
   },
   {
      value: "inprogress",
      label: "In Progress",
      icon: SpinnerIcon,
      color: "text-amber-500",
   },
   {
      value: "completed",
      label: "Completed",
      icon: CheckCircleIcon,
      color: "text-emerald-500",
   },
   {
      value: "blocked",
      label: "Blocked",
      icon: ProhibitIcon,
      color: "text-destructive",
   },
]


interface NewTaskModalProps {
   open: boolean
   onOpenChange: (open: boolean) => void
}


export default function NewTaskModal({ open, onOpenChange }: NewTaskModalProps) {
   const { mutate: createTask, isSuccess } = useCreateTask();
   const { data: teams } = useTeams()
   const { data: projects } = useProjects();

   const [taskName, setTaskName] = useState("")
   const [projectId, setProjectId] = useState<string | null>(null)
   const [teamId, setTeamId] = useState<string | null>(null)
   const [owners, setOwners] = useState<string[]>([])
   const [priority, setPriority] = useState("medium")
   const [status, setStatus] = useState("todo")
   const [timeToComplete, setTimeToComplete] = useState<number | string>(3)
   const [selectedTags, setSelectedTags] = useState<string[]>(["Feature", "Dev"])


   const handleClose = () => {
      onOpenChange(false)
   }

   function reset() {
      setTaskName("");
      setProjectId(null)
      setTeamId(null)
      setOwners([])
      setPriority("medium")
      setStatus("todo")
      setTimeToComplete(3)
      setSelectedTags(["Feature", "Dev"])
   }

   function handleTaskSubmit() {
      const taskPayload: Tasks = {
         name: taskName,
         project: projectId || "",
         team: teamId || "",
         owners,
         priority,
         status,
         timeToComplete,
         tags: selectedTags
      }

      createTask(taskPayload, {
         onSuccess: () => onOpenChange(false),
         onSettled: () => reset()
      })
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent
            className="max-h-[92vh] overflow-y-auto scrollbar-none sm:max-w-xl"
            showCloseButton
         >
            {!isSuccess && <Toaster />}
            <div className="flex flex-col gap-6">
               <DialogHeader>
                  <div className="flex items-center gap-3">
                     <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <CheckSquareOffsetIcon
                           weight="duotone"
                           className="size-5 text-primary"
                        />
                     </div>
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <DialogTitle>Create New Task</DialogTitle>
                        </div>
                        <DialogDescription>
                           Set task details, assign team members, and track completion timelines.
                        </DialogDescription>
                     </div>
                  </div>
               </DialogHeader>

               <div className="-mx-6 h-px bg-border" />

               <FieldGroup className="gap-5">

                  <Field className="gap-1.5">
                     <FieldLabel htmlFor="task-name">Task Name</FieldLabel>
                     <div className="relative">
                        <TextTIcon
                           weight="duotone"
                           className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                           id="task-name"
                           type="text"
                           value={taskName ?? ""}
                           onChange={(e) => setTaskName(e.target.value)}
                           placeholder="e.g. Implement OAuth2 login flow with refresh tokens"
                           className="pl-8"
                           required
                        />
                     </div>
                  </Field>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                     <Field className="gap-1.5">
                        <FieldLabel htmlFor="task-project">Project Name</FieldLabel>
                        <div className="relative">
                           <FolderIcon
                              weight="duotone"
                              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                           />
                           <select
                              id="task-project"
                              value={projectId ?? ""}
                              required
                              onChange={(e) => setProjectId(e.target.value)}
                              className={cn(
                                 "h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-8 pr-8 text-sm shadow-xs transition-[color,box-shadow] outline-none",
                                 "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                                 "text-foreground dark:bg-input/30"
                              )}
                           >
                              <option value="" hidden>Select project</option>
                              {projects?.map((proj) => (
                                 <option
                                    key={proj._id}
                                    value={proj._id}
                                    className="bg-popover text-foreground"
                                 >
                                    {proj.name}
                                 </option>
                              ))}
                           </select>
                           <CaretDownIcon
                              weight="bold"
                              className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
                           />
                        </div>
                     </Field>

                     <Field className="gap-1.5">
                        <FieldLabel htmlFor="task-team">Team</FieldLabel>
                        <div className="relative">
                           <BuildingsIcon
                              weight="duotone"
                              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                           />
                           <select
                              id="task-team"
                              value={teamId ?? ""}
                              required
                              onChange={(e) => setTeamId(e.target.value)}
                              className={cn(
                                 "h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-8 pr-8 text-sm shadow-xs transition-[color,box-shadow] outline-none",
                                 "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                                 "text-foreground dark:bg-input/30"
                              )}
                           >
                              <option value="" hidden>Select team</option>
                              {teams?.map((team) => (
                                 <option
                                    key={team._id}
                                    value={team._id}
                                    className="bg-popover text-foreground"
                                 >
                                    {team.name}
                                 </option>
                              ))}
                           </select>
                           <CaretDownIcon
                              weight="bold"
                              className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
                           />
                        </div>
                     </Field>
                  </div>

                  <Field className="gap-1.5">
                     <div className="flex items-center justify-between">
                        <FieldLabel>Owners (Team Members)</FieldLabel>
                        <span className="text-[11px] text-muted-foreground">
                           {owners.length} assigned
                        </span>
                     </div>
                     <OwnersMultiSelect selected={owners} onChange={setOwners} />
                  </Field>


                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                     <Field className="gap-1.5">
                        <FieldLabel htmlFor="task-priority">Priority</FieldLabel>
                        <div className="relative">
                           <FlagIcon
                              weight="duotone"
                              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                           />
                           <select
                              id="task-priority"
                              value={priority}
                              required
                              onChange={(e) => setPriority(e.target.value)}
                              className={cn(
                                 "h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-8 pr-8 text-sm shadow-xs transition-[color,box-shadow] outline-none",
                                 "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                                 "text-foreground dark:bg-input/30"
                              )}
                           >
                              {PRIORITY_OPTIONS.map((p) => (
                                 <option
                                    key={p.value}
                                    value={p.value}
                                    className="bg-popover text-foreground"
                                 >
                                    {p.label} Priority
                                 </option>
                              ))}
                           </select>
                           <CaretDownIcon
                              weight="bold"
                              className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
                           />
                        </div>
                     </Field>

                     <Field className="gap-1.5">
                        <FieldLabel htmlFor="task-status">Status</FieldLabel>
                        <div className="relative">
                           <CircleDashedIcon
                              weight="bold"
                              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                           />
                           <select
                              id="task-status"
                              value={status}
                              required
                              onChange={(e) => setStatus(e.target.value)}
                              className={cn(
                                 "h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-8 pr-8 text-sm shadow-xs transition-[color,box-shadow] outline-none",
                                 "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                                 "text-foreground dark:bg-input/30"
                              )}
                           >
                              {STATUS_OPTIONS.map((s) => (
                                 <option
                                    key={s.value}
                                    value={s.value}
                                    className="bg-popover text-foreground"
                                 >
                                    {s.label}
                                 </option>
                              ))}
                           </select>
                           <CaretDownIcon
                              weight="bold"
                              className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
                           />
                        </div>
                     </Field>
                  </div>

                  <Field className="gap-1.5">
                     <FieldLabel htmlFor="task-time">Time to Complete (days)</FieldLabel>
                     <div className="relative">
                        <ClockCountdownIcon
                           weight="duotone"
                           className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                           id="task-time"
                           type="number"
                           min={1}
                           max={180}
                           required
                           value={timeToComplete ?? ""}
                           onChange={(e) => setTimeToComplete(Number(e.target.value))}
                           placeholder="3"
                           className="pl-8 pr-16"
                        />
                        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                           days
                        </span>
                     </div>
                  </Field>

                  <Field className="gap-1.5">
                     <div className="flex items-center justify-between">
                        <FieldLabel>Tags</FieldLabel>
                        <span className="text-[11px] text-muted-foreground">
                           Click to toggle or type below
                        </span>
                     </div>
                     <TagsMultiSelect tags={selectedTags} onChange={setSelectedTags} />
                  </Field>
               </FieldGroup>

               <div className="-mx-6 h-px bg-border" />
               <DialogFooter>
                  <Button
                     variant="outline"
                     size="sm"
                     type="button"
                     onClick={handleClose}
                  >
                     Cancel
                  </Button>
                  <Button
                     size="sm"
                     type="button"
                     onClick={handleTaskSubmit}
                     className="gap-1.5"
                  >
                     <CheckIcon weight="bold" className="size-4" />
                     Create Task
                  </Button>
               </DialogFooter>
            </div>
         </DialogContent>
      </Dialog>
   )
}

