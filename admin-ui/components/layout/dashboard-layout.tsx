"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { userService } from "@/services/user.service"
import { canAccessPath } from "@/lib/navigation-access"
import { useToast } from "@/components/ui/use-toast"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const denialToastShownForPath = useRef<string | null>(null)

  useEffect(() => {
    const token = userService.getToken()
    if (!token) {
      router.replace("/login")
      return
    }

    const perms = userService.getEffectivePermissions()

    if (!userService.getCurrentUser()) {
      userService.logout()
      denialToastShownForPath.current = null
      toast({
        title: "Please sign in",
        description: "Your profile could not be loaded for this session.",
        variant: "destructive",
      })
      router.replace("/login")
      return
    }

    if (!canAccessPath(pathname, perms)) {
      if (pathname !== "/dashboard") {
        if (denialToastShownForPath.current !== pathname) {
          denialToastShownForPath.current = pathname
          toast({
            title: "Access denied",
            description: "Your role doesn't include permission for this page.",
            variant: "destructive",
          })
          router.replace("/dashboard")
        }
      }
      return
    }

    denialToastShownForPath.current = null
  }, [pathname, router, toast])

  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <main className="mesh-bg flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
