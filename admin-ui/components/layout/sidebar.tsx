"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import {
  LayoutDashboard,
  DollarSign,
  Users,
  UserCog,
  Trophy,
  Activity,
  HelpCircle,
  FileText,
  Settings,
  Shield,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { userService } from "@/services/user.service"
import { canAccessRoute } from "@/lib/navigation-access"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Finance",
    href: "/finance",
    icon: DollarSign,
  },
  {
    title: "Members",
    href: "/members",
    icon: Users,
  },
  {
    title: "Positions",
    href: "/positions",
    icon: UserCog,
  },
  {
    title: "Competitors",
    href: "/competitors",
    icon: Trophy,
  },
  {
    title: "Sports",
    href: "/sports",
    icon: Activity,
  },
  {
    title: "Activities",
    href: "/activities",
    icon: FileText,
  },
  {
    title: "Caawiye",
    href: "/caawiye",
    icon: HelpCircle,
  },
  {
    title: "Candidates",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "Users",
    href: "/users",
    icon: Settings,
  },
  {
    title: "Roles",
    href: "/roles",
    icon: Shield,
  },
  {
    title: "Form Management",
    href: "/forms",
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const visibleItems = useMemo(() => {
    const perms = userService.getEffectivePermissions()
    return menuItems.filter((item) => canAccessRoute(item.href, perms))
  }, [pathname])

  const handleLogout = () => {
    userService.logout()
    router.push("/login")
  }

  return (
    <aside className="flex h-screen w-[17rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-accent text-primary-foreground shadow-sm">
          <LayoutDashboard className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
            Justa Admin
          </p>
          <p className="truncate text-xs text-sidebar-muted">Management</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {visibleItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                  : "text-sidebar-muted hover:bg-white/5 hover:text-sidebar-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-[1.125rem] w-[1.125rem] shrink-0 transition-opacity",
                  isActive ? "text-sidebar-accent" : "opacity-80 group-hover:opacity-100"
                )}
                aria-hidden
              />
              <span className="truncate">{item.title}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          className="h-10 w-full justify-start gap-2 rounded-lg text-sidebar-muted hover:bg-white/5 hover:text-sidebar-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  )
}
