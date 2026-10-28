import { Button } from "@/components/ui/button"
import { CheckCircleIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTheme } from "./theme-provider";

export default function Header() {
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
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
         <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
               <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                     <CheckCircleIcon weight="bold" className="size-5" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">Workasana</span>
               </Link>
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
               <Link to="/login">
                  <Button variant="ghost">Login</Button>
               </Link>
               <Link to="/signup">
                  <Button >Signup</Button>
               </Link>
            </div>
         </div>
      </header>
   )
}
