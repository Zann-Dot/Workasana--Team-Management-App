import React, {
   useState,
   type ChangeEvent,
   type Dispatch,
   type SetStateAction,
} from "react"
import {
   CalendarBlankIcon,
   CaretDownIcon,
   FolderSimplePlusIcon,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { toast } from "../ui/toast"
import { useCreateProject } from "@/hooks/useProjects"

interface NewProjectModalProps {
   open: boolean
   onOpenChange: (open: boolean) => void
}

interface ProjectFormType {
   name: string
   teamId: string
   status: "inprogress" | "inreview" | "completed"
   dueOn: string
   priority: "low" | "medium" | "high"
   description?: string
}

interface PRIORITY_OPTIONS_TYPE {
   value: "low" | "medium" | "high"
   label: string;
   color: string;
   border: string;
   activeBg: string;
   activeBorder: string;
   dot: string;
}

const TEAM_OPTIONS = ["Design", "Dev", "Marketing", "Finance", "Sales"]

const STATUS_OPTIONS = ["In Progress", "Completed", "In Review"]

const PRIORITY_OPTIONS: PRIORITY_OPTIONS_TYPE[] = [
   {
      value: "high",
      label: "High",
      color: "text-destructive",
      border: "border-destructive/40",
      activeBg: "bg-destructive/10",
      activeBorder: "border-destructive",
      dot: "bg-destructive",
   },
   {
      value: "medium",
      label: "Medium",
      color: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/40",
      activeBg: "bg-amber-500/10",
      activeBorder: "border-amber-500",
      dot: "bg-amber-500",
   },
   {
      value: "low",
      label: "Low",
      color: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/40",
      activeBg: "bg-emerald-500/10",
      activeBorder: "border-emerald-500",
      dot: "bg-emerald-500",
   },
]

function StyledSelect({
   options,
   placeholder,
   className,
   name,
}: {
   options: string[]
   placeholder: string
   name: string
   className?: string
}) {
   return (
      <div className="relative">
         <select
            defaultValue=""
            name={name}
            required
            className={cn(
               "h-9 w-full appearance-none rounded-md border border-input bg-transparent px-2.5 py-1 pr-8 text-sm shadow-xs transition-[color,box-shadow] outline-none",
               "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
               "text-foreground dark:bg-input/30 [&>option[value='']]:text-muted-foreground",
               className
            )}
         >
            <option value="" disabled className="text-muted-foreground">
               {placeholder}
            </option>
            {options.map((opt) => (
               <option key={opt} value={opt}>
                  {opt}
               </option>
            ))}
         </select>
         <CaretDownIcon
            weight="bold"
            className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
         />
      </div>
   )
}

function StyledDateInput({
   date,
   setDate,
}: {
   date: Date | undefined
   setDate: Dispatch<SetStateAction<Date | undefined>>
}) {
   const [open, setOpen] = useState(false)
   return (
      <div className="relative">
         <Button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex w-full justify-between font-normal text-muted-foreground"
            variant="outline"
         >
            {String(date) !== String(new Date())
               ? format(String(date), "dd MMM yyyy")
               : "Select due date"}
            <CalendarBlankIcon
               opacity={open ? 0 : 100}
               weight="duotone"
               className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
         </Button>
         <div hidden={!open}>
            <Calendar
               mode="single"
               selected={date}
               onSelect={setDate}
               className="mt-4 w-full rounded-lg border"
               captionLayout="dropdown"
            />
         </div>
      </div>
   )
}

function PriorityRadioGroup({
   value,
   onChange,
}: {
   value: string
   onChange: Dispatch<SetStateAction<"low" | "medium" | "high">>
}) {
   return (
      <div className="grid grid-cols-3 gap-2">
         {PRIORITY_OPTIONS.map((opt) => {
            const isActive = value === opt.value
            return (
               <label
                  key={opt.value}
                  className={cn(
                     "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all duration-150",
                     isActive
                        ? `${opt.activeBg} ${opt.activeBorder}`
                        : "border-border bg-muted/20 hover:bg-muted/40"
                  )}
               >
                  <input
                     type="radio"
                     name="priority"
                     value={opt.value}
                     checked={isActive}
                     onChange={() => onChange(opt.value)}
                     className="sr-only"
                     required
                  />

                  <span className={cn("size-2.5 rounded-full", opt.dot)} />
                  <span
                     className={cn(
                        "text-xs font-medium",
                        isActive ? opt.color : "text-muted-foreground"
                     )}
                  >
                     {opt.label}
                  </span>
               </label>
            )
         })}
      </div>
   )
}

export default function NewProjectModal({
   open,
   onOpenChange,
}: NewProjectModalProps) {
   const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
   const [date, setDate] = useState<Date | undefined>(new Date())
   const { mutate: createProject } = useCreateProject()

   function handleProjectSubmit(formData: FormData) {
      const name = formData.get("name") as string
      const teamId = formData.get("teamId") as string
      const status = formData.get("status") as "inprogress" | "inreview" | "completed"
      const description = formData.get("description") as string
      let formPayload: ProjectFormType = {
         name,
         teamId,
         status,
         dueOn: String(date),
         priority,
      }

      if (description) formPayload = { ...formPayload, description }

      createProject(formPayload, {
         onSettled: () => onOpenChange(false)
      })
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent
            className="max-h-[90vh] scrollbar-none overflow-y-auto sm:max-w-lg"
            showCloseButton
         >
            <form action={handleProjectSubmit} className="flex flex-col gap-6">
               <DialogHeader>
                  <div className="flex items-center gap-3">
                     <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <FolderSimplePlusIcon
                           weight="duotone"
                           className="size-5 text-primary"
                        />
                     </div>
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <DialogTitle>New Project</DialogTitle>
                        </div>
                        <DialogDescription>
                           Fill in the details below to create a new project for your
                           team.
                        </DialogDescription>
                     </div>
                  </div>
               </DialogHeader>

               <div className="-mx-6 h-px bg-border" />

               <FieldGroup className="gap-5">
                  <Field className="gap-1.5">
                     <FieldLabel htmlFor="project-name">Project name</FieldLabel>
                     <div className="relative">
                        <Input
                           id="project-name"
                           type="text"
                           name="name"
                           placeholder="e.g. Website Redesign"
                           required
                        />
                     </div>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                     <Field className="gap-1.5">
                        <FieldLabel>Team</FieldLabel>
                        <StyledSelect
                           name="teamId"
                           options={TEAM_OPTIONS}
                           placeholder="Select team"
                        />
                     </Field>
                     <Field className="gap-1.5">
                        <FieldLabel>Status</FieldLabel>
                        <StyledSelect
                           name="status"
                           options={STATUS_OPTIONS}
                           placeholder="Select status"
                        />
                     </Field>
                  </div>

                  <Field className="gap-1.5">
                     <FieldLabel>Due on</FieldLabel>
                     <StyledDateInput date={date} setDate={setDate} />
                  </Field>

                  <Field className="gap-1.5">
                     <FieldLabel>Priority</FieldLabel>
                     <PriorityRadioGroup value={priority} onChange={setPriority} />
                  </Field>

                  <Field className="gap-1.5">
                     <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="project-desc">Description</FieldLabel>
                        <span className="text-xs text-muted-foreground">Optional</span>
                     </div>
                     <textarea
                        id="project-desc"
                        name="description"
                        rows={3}
                        placeholder="Briefly describe the project goals, scope, or any important context..."
                        className={cn(
                           "w-full resize-none rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs",
                           "transition-[color,box-shadow] outline-none placeholder:text-muted-foreground",
                           "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                           "dark:bg-input/30"
                        )}
                     />
                  </Field>
               </FieldGroup>

               <div className="-mx-6 h-px bg-border" />
               <DialogFooter>
                  <Button
                     variant="outline"
                     size="sm"
                     type="button"
                     onClick={() => onOpenChange(false)}
                  >
                     Cancel
                  </Button>
                  <Button size="sm" type="submit">
                     Create Project
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
