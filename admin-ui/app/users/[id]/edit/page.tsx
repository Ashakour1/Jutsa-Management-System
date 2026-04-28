"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { userService, User, RoleCatalogItem, PermissionDto } from "@/services/user.service"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

function groupPermissions(perms: PermissionDto[]) {
  const m = new Map<string, PermissionDto[]>()
  for (const p of perms) {
    const mod = p.module || "other"
    if (!m.has(mod)) m.set(mod, [])
    m.get(mod)!.push(p)
  }
  return Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0]))
}

export default function EditUserPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [rolesCatalog, setRolesCatalog] = useState<RoleCatalogItem[]>([])
  const [permissionsCatalog, setPermissionsCatalog] = useState<PermissionDto[]>([])

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE")
  const [selectedRoleIds, setSelectedRoleIds] = useState<Set<string>>(new Set())
  const [createNewRole, setCreateNewRole] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDescription, setNewRoleDescription] = useState("")
  const [newRolePermissionIds, setNewRolePermissionIds] = useState<Set<string>>(new Set())

  const permissionGroups = useMemo(
    () => groupPermissions(permissionsCatalog),
    [permissionsCatalog]
  )

  const load = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      const [u, roles, perms] = await Promise.all([
        userService.getUser(id),
        userService.getRolesCatalog(),
        userService.getPermissionsCatalog(),
      ])
      setUser(u)
      setEmail(u.email)
      setName(u.name ?? "")
      setUsername(u.username)
      setStatus(u.status === "INACTIVE" ? "INACTIVE" : "ACTIVE")
      setSelectedRoleIds(new Set(u.roles?.map((r) => r.id) ?? []))
      setRolesCatalog(roles)
      setPermissionsCatalog(perms)
    } catch (e) {
      toast({
        title: "Couldn't load user",
        description: e instanceof Error ? e.message : "",
        variant: "destructive",
      })
      router.replace("/users")
    } finally {
      setLoading(false)
    }
  }, [id, router, toast])

  useEffect(() => {
    void load()
  }, [load])

  const toggleExistingRole = (rid: string) => {
    setSelectedRoleIds((prev) => {
      const next = new Set(prev)
      if (next.has(rid)) next.delete(rid)
      else next.add(rid)
      return next
    })
  }

  const toggleNewRolePermission = (pid: string) => {
    setNewRolePermissionIds((prev) => {
      const next = new Set(prev)
      if (next.has(pid)) next.delete(pid)
      else next.add(pid)
      return next
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    if (selectedRoleIds.size === 0) {
      toast({
        title: "Roles",
        description: "Select at least one role.",
        variant: "destructive",
      })
      return
    }

    if (createNewRole) {
      if (!newRoleName.trim()) {
        toast({
          title: "New role",
          description: "Enter a role name.",
          variant: "destructive",
        })
        return
      }
      if (newRolePermissionIds.size === 0) {
        toast({
          title: "New role",
          description: "Pick at least one permission.",
          variant: "destructive",
        })
        return
      }
    }

    setSaving(true)
    try {
      let newRoleId: string | null = null
      if (createNewRole && newRoleName.trim() && newRolePermissionIds.size > 0) {
        const nr = await userService.createRole({
          name: newRoleName.trim(),
          description: newRoleDescription.trim() || undefined,
          permissionIds: [...newRolePermissionIds],
        })
        newRoleId = nr.id
      }

      const mergedRoleIds = [...selectedRoleIds]
      if (newRoleId && !mergedRoleIds.includes(newRoleId)) {
        mergedRoleIds.push(newRoleId)
      }

      await userService.updateUser(id, {
        email,
        name,
        username,
        ...(password.trim() ? { password } : {}),
        status,
        roleIds: mergedRoleIds,
      })

      toast({ title: "User updated", description: "Changes saved." })
      router.push("/users")
    } catch (err) {
      toast({
        title: "Update failed",
        description: err instanceof Error ? err.message : "",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (!id) {
    return (
      <DashboardLayout>
        <p className="text-sm text-muted-foreground">Invalid user id.</p>
      </DashboardLayout>
    )
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
          <div className="h-96 animate-pulse rounded-xl bg-muted" />
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Edit user"
          description={user?.email ?? ""}
          actions={
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href="/users">
                <ArrowLeft className="h-4 w-4" />
                Back to directory
              </Link>
            </Button>
          }
        />

        <form onSubmit={handleSave}>
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Profile & access</CardTitle>
              <CardDescription>
                Email, credentials, roles, and account status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="e-email">Email *</Label>
                  <Input
                    id="e-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="e-name">Full name</Label>
                  <Input
                    id="e-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="e-user">Username *</Label>
                  <Input
                    id="e-user"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="e-pw">New password</Label>
                  <Input
                    id="e-pw"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Leave blank to keep current"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="e-status">Status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as "ACTIVE" | "INACTIVE")}>
                    <SelectTrigger id="e-status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Inactive users cannot sign in.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Roles *</p>
                <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-border/80 bg-muted/20 p-3">
                  {rolesCatalog.map((r) => (
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
                          <span className="block text-xs text-muted-foreground">{r.description}</span>
                        ) : null}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-muted/10 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Create new role and assign</p>
                    <p className="text-xs text-muted-foreground">
                      Optional — creates another role before saving the user update.
                    </p>
                  </div>
                  <Switch checked={createNewRole} onCheckedChange={setCreateNewRole} />
                </div>
                {createNewRole ? (
                  <div className="mt-6 space-y-4 border-t border-border/60 pt-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nrn">Role name *</Label>
                        <Input
                          id="nrn"
                          value={newRoleName}
                          onChange={(e) => setNewRoleName(e.target.value)}
                          placeholder="e.g. Outreach lead"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nrd">Description</Label>
                        <Input
                          id="nrd"
                          value={newRoleDescription}
                          onChange={(e) => setNewRoleDescription(e.target.value)}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="max-h-64 space-y-4 overflow-y-auto rounded-md border border-border/60 bg-background p-3">
                      {permissionGroups.map(([mod, plist]) => (
                        <div key={mod}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {mod}
                          </p>
                          <div className="space-y-1.5 pl-1">
                            {plist.map((p) => (
                              <label key={p.id} className="flex cursor-pointer gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  className="mt-0.5 h-4 w-4"
                                  checked={newRolePermissionIds.has(p.id)}
                                  onChange={() => toggleNewRolePermission(p.id)}
                                />
                                <span>{p.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t border-border bg-muted/15 py-5">
              <Button type="button" variant="outline" onClick={() => router.push("/users")}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
