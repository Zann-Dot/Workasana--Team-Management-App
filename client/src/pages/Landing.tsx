import {
   ArrowRightIcon,
   CheckCircleIcon,
   EnvelopeSimpleIcon,
   GithubLogoIcon,
   LinkedinLogoIcon,
   MoonIcon,
   SunIcon,
   type Icon,
} from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import { useTheme } from "@/components/theme-provider"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export type Item = {
   icon: Icon
   title: string
   description: string
}

export default function LandingPage() {
   const { theme, setTheme } = useTheme()
   const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() =>
      typeof window !== "undefined" &&
         window.matchMedia("(prefers-color-scheme: dark)").matches
         ? "dark"
         : "light"
   )

   useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = (e: MediaQueryListEvent) => {
         setSystemTheme(e.matches ? "dark" : "light")
      }
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
   }, [])

   const isDark =
      theme === "dark" || (theme === "system" && systemTheme === "dark")

   const toggleTheme = () => {
      setTheme(isDark ? "light" : "dark")
   }

   return (
      <div className="min-h-screen bg-background text-foreground">
         {/* Header */}
         <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
               <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                     <CheckCircleIcon weight="bold" className="size-5" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">Workasana</span>
               </div>
               <div className="flex items-center gap-2">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={toggleTheme}
                     aria-label={
                        isDark ? "Switch to light mode" : "Switch to dark mode"
                     }
                     title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                     {isDark ? (
                        <SunIcon weight="bold" className="size-5 text-amber-400" />
                     ) : (
                        <MoonIcon weight="bold" className="size-5" />
                     )}
                  </Button>
                  <Button variant="ghost">Login</Button>
                  <Button>Sign Up</Button>
               </div>
            </div>
         </header>

         <main>
            {/* Hero */}
            <section className="relative overflow-hidden">
               <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/60 to-background" />
               <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
                  <Badge variant="secondary" className="mb-6">
                     Simple. Organized. Collaborative.
                  </Badge>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                     Where teams turn plans into{" "}
                     <span className="text-primary">finished work</span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                     Workasana brings your projects, teams and tasks into one clear
                     workspace, so everyone knows what to do next and how far you have
                     come.
                  </p>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                     <Button size="lg">
                        Get Started
                        <ArrowRightIcon weight="bold" />
                     </Button>
                     <Button size="lg" variant="outline">
                        Explore Features
                     </Button>
                  </div>
               </div>
            </section>

            {/* How it works */}
            <section className="border-y bg-muted/30">
               <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
                  <div className="mx-auto max-w-2xl text-center">
                     <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        How it works
                     </h2>
                     <p className="mt-4 text-muted-foreground">
                        Get from idea to done in three easy steps.
                     </p>
                  </div>
                  <div className="mt-12 grid gap-6 md:grid-cols-3">
                     {steps.map((step, index) => (
                        <Card key={step.title} className="text-center">
                           <CardHeader className="items-center">
                              <div className="relative mb-2 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                 <step.icon weight="duotone" className="size-7" />
                                 <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                    {index + 1}
                                 </span>
                              </div>
                              <CardTitle className="text-lg">{step.title}</CardTitle>
                              <CardDescription>{step.description}</CardDescription>
                           </CardHeader>
                        </Card>
                     ))}
                  </div>
               </div>
            </section>

            {/* Features */}
            <section id="features">
               <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
                  <div className="mx-auto max-w-2xl text-center">
                     <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Everything you need to manage work
                     </h2>
                     <p className="mt-4 text-muted-foreground">
                        Powerful features designed to keep your team aligned and
                        productive.
                     </p>
                  </div>
                  <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                     {features.map((feature) => (
                        <Card
                           key={feature.title}
                           className="transition-shadow hover:shadow-md"
                        >
                           <CardHeader>
                              <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                 <feature.icon weight="duotone" className="size-6" />
                              </div>
                              <CardTitle className="text-lg">{feature.title}</CardTitle>
                              <CardDescription>{feature.description}</CardDescription>
                           </CardHeader>
                        </Card>
                     ))}
                  </div>
               </div>
            </section>
         </main>

         {/* Footer */}
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
                     <Button variant="ghost" size="icon" aria-label="GitHub">
                        <GithubLogoIcon className="size-5" />
                     </Button>
                     <Button variant="ghost" size="icon" aria-label="LinkedIn">
                        <LinkedinLogoIcon className="size-5" />
                     </Button>
                     <Button variant="ghost" size="icon" aria-label="Email">
                        <EnvelopeSimpleIcon className="size-5" />
                     </Button>
                  </div>
               </div>
               <Separator className="my-6" />
               <p className="text-center text-sm text-muted-foreground">
                  © 2026 — built by Anay Karn. All rights reserved.
               </p>
            </div>
         </footer>
      </div>
   )
}
