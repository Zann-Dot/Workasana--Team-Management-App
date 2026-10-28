import {
   CheckCircleIcon,
   EnvelopeSimpleIcon,
   GithubLogoIcon,
   LinkedinLogoIcon,
} from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Link } from "react-router"

export default function Footer() {
   return (
      <footer className="border-t">
         <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
               <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                     <CheckCircleIcon weight="bold" className="size-4" />
                  </div>
                  <span className="font-semibold">Workasana</span>
               </div>
               <div className="flex items-center gap-1">
                  <a
                     href="https://github.com/Zann-Dot"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Button variant="ghost" size="icon" aria-label="GitHub">
                        <GithubLogoIcon className="size-5" />
                     </Button>
                  </a>

                  <a
                     href="https://linkedin.com/in/anaykarn"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Button variant="ghost" size="icon" aria-label="LinkedIn">
                        <LinkedinLogoIcon className="size-5" />
                     </Button>
                  </a>

                  <a
                     href="https://mail.google.com/mail/?view=cm&fs=1&to=anaykarn234@gmail.com"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Button variant="ghost" size="icon" aria-label="Email">
                        <EnvelopeSimpleIcon className="size-5" />
                     </Button>
                  </a>
               </div>
            </div>
            <Separator className="my-6" />
            <p className="text-center text-sm text-muted-foreground">
               © 2026 — built by Anay Karn. All rights reserved.
            </p>
         </div>
      </footer>
   )
}
