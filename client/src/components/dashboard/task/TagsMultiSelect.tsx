import { useState } from "react"
import { CheckIcon, PlusIcon, TagIcon, XIcon } from "@phosphor-icons/react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const DEFAULT_TAG_PRESETS = [
   "Urgent",
   "Bug",
   "Feature",
   "Design",
   "Dev",
   "Backend",
   "Research",
]

export interface TagsMultiSelectProps {
   tags: string[]
   onChange: (tags: string[]) => void
   presets?: string[]
}

/** Multi-select Tag UI with quick presets and custom tag input */
export default function TagsMultiSelect({
   tags,
   onChange,
   presets = DEFAULT_TAG_PRESETS,
}: TagsMultiSelectProps) {
   const [customTagInput, setCustomTagInput] = useState("")

   const toggleTag = (tag: string) => {
      if (tags.includes(tag)) {
         onChange(tags.filter((t) => t !== tag))
      } else {
         onChange([...tags, tag])
      }
   }

   const addCustomTag = () => {
      const trimmed = customTagInput.trim()
      if (trimmed && !tags.includes(trimmed)) {
         onChange([...tags, trimmed])
         setCustomTagInput("")
      }
   }

   return (
      <div className="space-y-2">
         {/* Tag pills list */}
         <div className="flex flex-wrap items-center gap-1.5">
            {presets.map((preset) => {
               const active = tags.includes(preset)
               return (
                  <button
                     key={preset}
                     type="button"
                     onClick={() => toggleTag(preset)}
                     className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all",
                        active
                           ? "border-primary/40 bg-primary/10 text-primary shadow-xs"
                           : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                     )}
                  >
                     <TagIcon weight={active ? "fill" : "regular"} className="size-3" />
                     {preset}
                     {active ? (
                        <CheckIcon weight="bold" className="size-2.5" />
                     ) : (
                        <PlusIcon weight="bold" className="size-2.5 opacity-60" />
                     )}
                  </button>
               )
            })}

            {/* Custom tags added that aren't in presets */}
            {tags
               .filter((t) => !presets.includes(t))
               .map((custom) => (
                  <span
                     key={custom}
                     className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary shadow-xs"
                  >
                     <TagIcon weight="fill" className="size-3" />
                     {custom}
                     <button
                        type="button"
                        onClick={() => toggleTag(custom)}
                        className="rounded-full p-0.5 hover:bg-primary/20"
                     >
                        <XIcon weight="bold" className="size-2.5" />
                     </button>
                  </span>
               ))}
         </div>

         {/* Custom Tag Input */}
         <div className="flex items-center gap-2 pt-0.5">
            <div className="relative flex-1">
               <TagIcon
                  weight="duotone"
                  className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
               />
               <Input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        e.preventDefault()
                        addCustomTag()
                     }
                  }}
                  placeholder="Or type a custom tag and press Enter..."
                  className="h-8 pl-8 text-xs"
               />
            </div>
            <Button
               type="button"
               variant="outline"
               size="sm"
               onClick={addCustomTag}
               disabled={!customTagInput.trim()}
               className="h-8 text-xs"
            >
               Add Tag
            </Button>
         </div>
      </div>
   )
}

