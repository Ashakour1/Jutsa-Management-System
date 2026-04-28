"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  userService,
  PermissionDto,
  RoleCatalogItem,
  RegisterData,
} from "@/services/user.service"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { canAccessPath } from "@/lib/navigation-access"

function groupPermissions(perms: PermissionDto[]) {
  const m = new Map<string, PermissionDto[]>()
  for (const p of perms) {
    const mod = p.module || "other"
    if (!m.has(mod)) m.set(mod, [])
    m.get(mod)!.push(p)
  }
  return Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0]))
}

export default function CreateUserPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [catalogLoading, setCatalogLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [rolesCatalog, setRolesCatalog] = useState<RoleCatalogItem[]>([])
  const [permissionsCatalog, setPermissionsCatalog] = useState<PermissionDto[]>([])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [selectedRoleIds, setSelectedRoleIds] = useState<Set<string>>(new Set())
  const [createNewRole, setCreateNewRole] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDescription, setNewRoleDescription] = useState("")
  const [newRolePermissionIds, setNewRolePermissionIds] = useState<Set<string>>(new Set())

  const loadCatalogs = useCallback(async () => {
    try {
      setCatalogLoading(true)
      const [roles, perms] = await Promise.all([
        userService.getRolesCatalog(),
        userService.getPermissionsCatalog(),
      ])
      setRolesCatalog(roles)
      setPermissionsCatalog(perms)
    } catch {
      toast({
        title: "Error",
        description: "Could not load roles or permissions",
        variant: "destructive",
      })
    } finally {
      setCatalogLoading(false)
    }
  }, [toast])

  useEffect(() => {
    const perms = userService.getEffectivePermissions()
    if (!canAccessPath("/users/create", perms)) return
    void loadCatalogs()
  }, [loadCatalogs])

  const permissionGroups = useMemo(
    () => groupPermissions(permissionsCatalog),
    [permissionsCatalog]
  )

  const toggleExistingRole = (id: string) => {
    setSelectedRoleIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleNewRolePermission = (id: string) => {
    setNewRolePermissionIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (createNewRole) {
      if (!newRoleName.trim()) {
        toast({
          title: "New role",
          description: "Enter a name for the new role.",
          variant: "destructive",
        })
        return
      }
      if (newRolePermissionIds.size === 0) {
        toast({
          title: "New role",
          description: "Pick at least one permission for the new role.",
          variant: "destructive",
        })
        return
      }
    }

    setSubmitLoading(true)
    try {
      const payload: RegisterData = {
        email: email.trim(),
        password,
        name: name.trim() || undefined,
        username: username.trim() || undefined,
      }

      const rids = [...selectedRoleIds]
      if (rids.length > 0) {
        payload.roleIds = rids
      }

      if (createNewRole && newRoleName.trim() && newRolePermissionIds.size > 0) {
        payload.newRole = {
          name: newRoleName.trim(),
          description: newRoleDescription.trim() || undefined,
          permissionIds: [...newRolePermissionIds],
        }
      }

      await userService.register(payload)
      toast({
        title: "User created",
        description: "They can sign in with the email and password you set.",
      })
      router.push("/users")
    } catch (err) {
      toast({
        title: "Could not create user",
        description: err instanceof Error ? err.message : "Request failed",
        variant: "destructive",
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Create user"
          description="Assign roles and optionally create a new role with permissions for this account."
          actions={
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href="/users">
                <ArrowLeft className="h-4 w-4" />
                Back to directory
              </Link>
            </Button>
          }
        />

        <form onSubmit={handleSubmit}>
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Account details</CardTitle>
              <CardDescription>Credentials and profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cu-email">Email *</Label>
                  <Input
                    id="cu-email"
                    type="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cu-password">Password *</Label>
                  <Input
                    id="cu-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cu-name">Full name *</Label>
                  <Input
                    id="cu-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cu-user">Username</Label>
                  <Input
                    id="cu-user"
                    placeholder="Defaults from email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Existing roles</p>
                <p className="text-xs text-muted-foreground">
                  Optional. If you leave this and the new-role section off, the user gets the default{" "}
                  <span className="font-medium">USER</span> role.
                </p>
                <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-border/80 bg-muted/20 p-3">
                  {catalogLoading ? (
                    <p className="text-xs text-muted-foreground">Loading roles…</p>
                  ) : (
                    rolesCatalog.map((r) => (
                      <label
                        key={r.id}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted/60"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border"
                          checked={selectedRoleIds.has(r.id)}
                          onChange={() => toggleExistingRole(r.id)}
                        />
                        <span>
                          <span className="font-medium">{r.name}</span>
                          {r.description ? (
                            <span className="block text-xs text-muted-foreground">
                              {r.description}
                            </span>
                          ) : null}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-muted/10 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Create new role</p>
                    <p className="text-xs text-muted-foreground">
                      Define a new role and permissions. It will be assigned to this user along with
                      any roles you checked above.
                    </p>
                  </div>
                  <Switch checked={createNewRole} onCheckedChange={setCreateNewRole} />
                </div>
                {createNewRole ? (
                  <div className="mt-6 space-y-4 border-t border-border/60 pt-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nr-name">New role name *</Label>
                        <Input
                          id="nr-name"
                          value={newRoleName}
                          onChange={(e) => setNewRoleName(e.target.value)}
                          placeholder="e.g. Events coordinator"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nr-desc">Description</Label>
                        <Input
                          id="nr-desc"
                          value={newRoleDescription}
                          onChange={(e) => setNewRoleDescription(e.target.value)}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Permissions</Label>
                      <div className="max-h-[min(360px,calc(100vh-24rem))] space-y-4 overflow-y-auto rounded-md border border-border/60 bg-background p-4">
                        {catalogLoading ? (
                          <p className="text-xs text-muted-foreground">Loading permissions…</p>
                        ) : permissionGroups.length === 0 ? (
                          <p className="text-xs text-muted-foreground">No permissions found.</p>
                        ) : (
                          permissionGroups.map(([mod, plist]) => (
                            <div key={mod}>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                {mod}
                              </p>
                              <div className="space-y-1.5 pl-1">
                                {plist.map((p) => (
                                  <label
                                    key={p.id}
                                    className="flex cursor-pointer items-start gap-2 text-sm"
                                  >
                                    <input
                                      type="checkbox"
                                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border"
                                      checked={newRolePermissionIds.has(p.id)}
                                      onChange={() => toggleNewRolePermission(p.id)}
                                    />
                                    <span>
                                      <span className="text-foreground">{p.name}</span>
                                      {p.description ? (
                                        <span className="ml-1 text-xs text-muted-foreground">
                                          — {p.description}
                                        </span>
                                      ) : null}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t border-border bg-muted/15 py-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={submitLoading}
                onClick={() => router.push("/users")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitLoading || catalogLoading}>
                {submitLoading ? "Creating…" : "Create user"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
