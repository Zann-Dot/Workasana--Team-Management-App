import { cn } from "@/lib/utils"
import { CheckIcon } from "@phosphor-icons/react";
import type { Dispatch, SetStateAction } from "react";

interface StepperProps {
   STEPS: {
      id: number;
      title: string;
      label: string;
   }[],
   currentStep: number,
   setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function Stepper({ STEPS, currentStep, setCurrentStep }: StepperProps) {
   return (
      <ol className="flex items-center w-full">
         {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id
            const isActive = currentStep === step.id

            return (
               <li
                  key={step.id}
                  className={cn(
                     "flex items-center",
                     index < STEPS.length - 1 ? "flex-1" : ""
                  )}
               >
                  <div className="flex items-center gap-2">
                     <button
                        type="button"
                        onClick={() => {
                           if (isCompleted) setCurrentStep(step.id)
                        }}
                        disabled={!isCompleted}
                        className={cn(
                           "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all select-none",
                           isCompleted
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                              : isActive
                                 ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                 : "border border-border bg-muted/60 text-muted-foreground cursor-default"
                        )}
                        aria-current={isActive ? "step" : undefined}
                        aria-label={`${step.title}: ${step.label}`}
                     >
                        {isCompleted ? (
                           <CheckIcon weight="bold" className="size-3.5" />
                        ) : (
                           step.id
                        )}
                     </button>
                     <div className="hidden sm:block text-start">
                        <span
                           className={cn(
                              "block text-xs font-medium leading-tight",
                              isActive
                                 ? "text-foreground font-semibold"
                                 : isCompleted
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                           )}
                        >
                           {step.label}
                        </span>
                     </div>
                  </div>

                  {index < STEPS.length - 1 && (
                     <div
                        className={cn(
                           "h-0.5 flex-1 mx-2 sm:mx-3 transition-colors duration-200",
                           isCompleted ? "bg-primary" : "bg-border"
                        )}
                     />
                  )}
               </li>
            )
         })}
      </ol>
   )
}
