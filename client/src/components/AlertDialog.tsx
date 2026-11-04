import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircleIcon, XIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import type { Dispatch, SetStateAction } from "react"
import type { Alert } from "@/pages/auth/Login"

interface AlertDialogProps {
   open: boolean
   setOpen: Dispatch<SetStateAction<boolean>>
   alert: Alert
}

export default function AlertDialog({
   open,
   setOpen,
   alert,
}: AlertDialogProps) {
   return (
      <Dialog open={open}>
         <DialogContent showCloseButton={false}>
            {alert.type === "error" && (
               <DialogClose
                  render={
                     <Button
                        variant="ghost"
                        className="absolute top-4 right-4"
                        size="icon-sm"
                        onClick={() => setOpen(false)}
                     />
                  }
               >
                  <XIcon />
               </DialogClose>
            )}
            <DialogHeader>
               <DialogTitle className={`flex items-center justify-center`}>
                  {alert.type === "success" && (
                     <div className="flex size-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500 shadow-xs">
                        <CheckCircleIcon weight="duotone" className="size-7" />
                     </div>
                  )}

                  {alert.type === "loading" && (
                     <div
                        className="inline-flex py-10"
                        role="status"
                        aria-label="loading"
                     >
                        <span
                           className="flex h-6 items-center justify-center gap-1"
                           aria-hidden="true"
                        >
                           <span className="h-4.5 w-1.5 origin-bottom animate-[spinner-bars_1s_ease-in-out_infinite_0s] rounded-xs bg-primary/45"></span>
                           <span className="h-4.5 w-1.5 origin-bottom animate-[spinner-bars_1s_ease-in-out_infinite_0.12s] rounded-xs bg-primary/65"></span>
                           <span className="h-4.5 w-1.5 origin-bottom animate-[spinner-bars_1s_ease-in-out_infinite_0.24s] rounded-xs bg-primary/75"></span>
                        </span>
                        <span className="sr-only">Loading...</span>
                     </div>
                  )}
               </DialogTitle>
               {alert.type === "success" && (
                  <DialogDescription className="flex items-center justify-center">
                     {alert.message}
                  </DialogDescription>
               )}
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}
