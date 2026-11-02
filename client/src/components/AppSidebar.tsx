import {
   ChartBarIcon,
   FolderSimpleIcon,
   GearSixIcon,
   HouseSimpleIcon,
   UserCircleIcon,
   UsersThreeIcon,
} from "@phosphor-icons/react"
import { Separator } from "./ui/separator"
import { NavLink } from "react-router"

const NAV_ITEMS = [
   { icon: HouseSimpleIcon, label: "Overview", id: "dashboard" },
   { icon: FolderSimpleIcon, label: "Projects", id: "projects" },
   { icon: UsersThreeIcon, label: "Teams", id: "teams" },
   { icon: ChartBarIcon, label: "Reports", id: "reports" },
   { icon: GearSixIcon, label: "Settings", id: "settings" },
]

export default function AppSidebar() {
   return (
      <aside className="fixed left-0 z-1 hidden h-screen w-56 shrink-0 border-r bg-card/52 lg:flex lg:flex-col">
         <div className="flex flex-1 flex-col gap-1 px-3 py-5">
            <NavLink
               to="/account"
               className={({ isActive }) =>
                  `mb-4 flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors duration-150 ease-in-out hover:bg-primary/5 dark:hover:bg-primary/12 ${isActive ? "border border-primary/50 bg-primary/5" : "bg-transparent"}`
               }
            >
               <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserCircleIcon weight="duotone" className="size-5" />
               </div>
               <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Alex Johnson</p>
                  <p className="truncate text-xs text-muted-foreground">
                     Product Manager
                  </p>
               </div>
            </NavLink>

            <Separator className="mb-3" />

            {NAV_ITEMS.map((item) => (
               <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                     `flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                     }`
                  }
               >
                  <item.icon weight="duotone" className="size-4 shrink-0" />
                  {item.label}
               </NavLink>
            ))}
         </div>
      </aside>
   )
}
