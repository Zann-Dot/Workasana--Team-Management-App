import { useState } from "react"
import {
   CaretDownIcon,
   CheckIcon,
   UserPlusIcon,
   XIcon,
} from "@phosphor-icons/react"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export interface OwnerMember {
   id: string
   name: string
   initials: string
   role: string
}

export const DEMO_OWNERS: OwnerMember[] = [
   { id: "user-1", name: "Alex Johnson", initials: "AJ", role: "Frontend Lead" },
   { id: "user-2", name: "Sarah Kim", initials: "SK", role: "Product Designer" },
   { id: "user-3", name: "Liam Miller", initials: "LM", role: "Fullstack Dev" },
   { id: "user-4", name: "Rachel Kumar", initials: "RK", role: "Backend Dev" },
   { id: "user-5", name: "Paul Nygard", initials: "PN", role: "DevOps Engineer" },
   { id: "user-6", name: "Taylor Swift", initials: "TS", role: "Marketing Lead" },
]

export interface OwnersMultiSelectProps {
   selected: string[]
   onChange: (ids: string[]) => void
   members?: OwnerMember[]
}

/** Multi-select dropdown UI for Team Members / Owners */
export default function OwnersMultiSelect({
   selected,
   onChange,
   members = DEMO_OWNERS,
}: OwnersMultiSelectProps) {
   const [openDropdown, setOpenDropdown] = useState(false)

   const toggleMember = (id: string) => {
      if (selected.includes(id)) {
         onChange(selected.filter((item) => item !== id))
      } else {
         onChange([...selected, id])
      }
   }

   const selectedMembers = members.filter((m) => selected.includes(m.id))

   return (
      <div className="relative">
         {/* Trigger Button */}
         <button
            type="button"
            onClick={() => setOpenDropdown((prev) => !prev)}
            className={cn(
               "flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] outline-none",
               "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
               "text-foreground dark:bg-input/30 hover:bg-muted/30"
            )}
         >
            <div className="flex flex-1 flex-wrap items-center gap-1.5">
               {selectedMembers.length === 0 ? (
                  <span className="flex items-center gap-2 text-muted-foreground">
                     <UserPlusIcon weight="duotone" className="size-4" />
                     Assign team members...
                  </span>
               ) : (
                  selectedMembers.map((member) => (
                     <span
                        key={member.id}
                        className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                     >
                        <Avatar className="size-4 text-[9px]">
                           <AvatarFallback className="text-[9px]">
                              {member.initials}
                           </AvatarFallback>
                        </Avatar>
                        <span>{member.name.split(" ")[0]}</span>
                        <span
                           role="button"
                           tabIndex={0}
                           aria-label={`Remove ${member.name}`}
                           onClick={(e) => {
                              e.stopPropagation()
                              toggleMember(member.id)
                           }}
                           onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                 e.stopPropagation()
                                 e.preventDefault()
                                 toggleMember(member.id)
                              }
                           }}
                           className="ml-0.5 cursor-pointer rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                           <XIcon weight="bold" className="size-2.5" />
                        </span>
                     </span>
                  ))
               )}
            </div>
            <CaretDownIcon
               weight="bold"
               className={cn(
                  "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                  openDropdown && "rotate-180"
               )}
            />
         </button>

         {/* Dropdown Popover */}
         {openDropdown && (
            <>
               <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenDropdown(false)}
               />
               <div className="absolute top-full left-0 z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                     Select assignees
                  </div>
                  <div className="space-y-0.5">
                     {members.map((member) => {
                        const isSelected = selected.includes(member.id)
                        return (
                           <div
                              key={member.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => toggleMember(member.id)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault()
                                    toggleMember(member.id)
                                 }
                              }}
                              className={cn(
                                 "flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-muted/60",
                                 isSelected && "bg-primary/5 font-medium text-primary"
                              )}
                           >
                              <div className="flex items-center gap-2">
                                 <Avatar className="size-6 text-[10px]">
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                 </Avatar>
                                 <div className="flex flex-col text-left">
                                    <span className="text-foreground">{member.name}</span>
                                    <span className="text-[10px] text-muted-foreground">
                                       {member.role}
                                    </span>
                                 </div>
                              </div>
                              <div
                                 className={cn(
                                    "flex size-4 items-center justify-center rounded border transition-colors",
                                    isSelected
                                       ? "border-primary bg-primary text-primary-foreground"
                                       : "border-muted-foreground/30"
                                 )}
                              >
                                 {isSelected && (
                                    <CheckIcon weight="bold" className="size-2.5" />
                                 )}
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </>
         )}
      </div>
   )
}

