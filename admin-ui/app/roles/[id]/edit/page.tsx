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
import {
  userService,
  PermissionDto,
  RoleCatalogItem,
} from "@/services/user.service"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

function groupPermissions(perms: PermissionDto[]) {
  const m = new Map<string, PermissionDto[]>()
  for (const p of perms) {
    const mod = p.module || "other"
    if (!m.has(mod)) m.set(mod, [])
    m.get(mod)!.push(p)
  }
  return Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0]))
}

const BUILTIN = new Set(["SUPER_ADMIN", "ADMIN", "USER"])

export default function EditRolePage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [role, setRole] = useState<
    (RoleCatalogItem & { assignedUserCount: number }) | null
  >(null)
  const [permissionsCatalog, setPermissionsCatalog] = useState<PermissionDto[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(
    new Set()
  )

  const permissionGroups = useMemo(
    () => groupPermissions(permissionsCatalog),
    [permissionsCatalog]
  )

  const isBuiltin = role?.name ? BUILTIN.has(role.name) : false

  const load = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      const [r, perms] = await Promise.all([
        userService.getRole(id),
        userService.getPermissionsCatalog(),
      ])
      setRole(r)
      setName(r.name)
      setDescription(r.description ?? "")
      setSelectedPermissionIds(new Set(r.permissionIds ?? []))
      setPermissionsCatalog(perms)
    } catch (e) {
      toast({
        title: "Could not load role",
        description: e instanceof Error ? e.message : "",
        variant: "destructive",
      })
      router.replace("/roles")
    } finally {
      setLoading(false)
    }
  }, [id, router, toast])

  useEffect(() => {
    void load()
  }, [load])

  const togglePermission = (pid: string) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev)
      if (next.has(pid)) next.delete(pid)
      else next.add(pid)
      return next
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Enter a role name.",
        variant: "destructive",
      })
      return
    }
    if (selectedPermissionIds.size === 0) {
      toast({
        title: "Permissions",
        description: "Pick at least one permission.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      await userService.updateRole(id, {
        name: name.trim(),
        description: description.trim() || null,
        permissionIds: [...selectedPermissionIds],
      })
      toast({ title: "Role updated", description: "Changes saved." })
      router.push("/roles")
    } catch (err) {
      toast({
        title: "Could not save",
        description: err instanceof Error ? err.message : "Request failed",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading || !role) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border bg-muted/30" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Edit role"
          description={`${role.name}${isBuiltin ? " (built-in)" : ""}${
            role.assignedUserCount > 0
              ? ` — ${role.assignedUserCount} user(s) assigned`
              : ""
          }`}
          actions={
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href="/roles">
                <ArrowLeft className="h-4 w-4" />
                Back to roles
              </Link>
            </Button>
          }
        />

        <form onSubmit={handleSave}>
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">{role.name}</CardTitle>
              <CardDescription>
                {isBuiltin
                  ? "Built-in roles cannot be renamed. You may still edit description and permissions."
                  : "Update name, description, and capability set"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="er-name">Name *</Label>
                  <Input
                    id="er-name"
                    value={name}
                    disabled={isBuiltin}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {isBuiltin ? (
                    <p className="text-xs text-muted-foreground">
                      System roles keep a fixed identifier.
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="er-desc">Description</Label>
                  <Input
                    id="er-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-base font-medium">Permissions *</Label>
                <div className="max-h-[min(420px,calc(100vh-22rem))] space-y-4 overflow-y-auto rounded-md border border-border/60 bg-background p-4">
                  {permissionGroups.length === 0 ? (
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
                                checked={selectedPermissionIds.has(p.id)}
                                onChange={() => togglePermission(p.id)}
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
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t border-border bg-muted/15 py-5 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" disabled={saving} asChild>
                <Link href="/roles">Cancel</Link>
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
