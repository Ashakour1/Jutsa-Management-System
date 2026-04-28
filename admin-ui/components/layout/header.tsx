"use client"

import { useState, useEffect } from "react"
import { userService } from "@/services/user.service"
import { User } from "@/services/user.service"
import { hasElevatedAdminRole } from "@/lib/navigation-access"

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(userService.getCurrentUser())
  }, [])

  const displayName = user?.name || user?.email || "Guest"
  const initials = displayName
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("")

  const roleNamesList = user?.roles?.map((r) => r.name) ?? []
  const elevated = hasElevatedAdminRole(roleNamesList)

  if (!mounted) {
    return (
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/80 bg-background/80 px-6 backdrop-blur-md">
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-32 animate-pulse rounded-full bg-muted" />
      </header>
    )
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border/80 bg-background/95 px-6 backdrop-blur-sm">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 gap-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Overview
          </p>
          {elevated ? (
            <span className="inline-flex rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              Administrator
            </span>
          ) : (
            <span className="inline-flex rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Operator
            </span>
          )}
        </div>
        <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">
          Welcome, {displayName}
        </h2>
      </div>
      <div className="flex shrink-0 items-center gap-3 rounded-full border border-border/70 bg-muted/60 py-1.5 pl-1.5 pr-4">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground shadow-sm ring-2 ring-background"
          aria-hidden
        >
          {initials || "?"}
        </div>
        <div className="hidden text-right sm:block">
          <p className="truncate text-xs font-semibold leading-tight">{displayName}</p>
          <p className="text-[11px] text-muted-foreground">
            {user?.roles?.length
              ? user.roles.map((r) => r.name.replace(/_/g, " ")).join(", ")
              : "—"}
          </p>
        </div>
      </div>
    </header>
  )
}
