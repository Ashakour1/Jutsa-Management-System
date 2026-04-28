"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { userService, PermissionDto } from "@/services/user.service"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
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

export default function CreateRolePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [catalogLoading, setCatalogLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [permissionsCatalog, setPermissionsCatalog] = useState<PermissionDto[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(new Set())

  const loadPermissions = useCallback(async () => {
    try {
      setCatalogLoading(true)
      const perms = await userService.getPermissionsCatalog()
      setPermissionsCatalog(perms)
    } catch {
      toast({
        title: "Error",
        description: "Could not load permissions",
        variant: "destructive",
      })
    } finally {
      setCatalogLoading(false)
    }
  }, [toast])

  useEffect(() => {
    const effective = userService.getEffectivePermissions()
    if (!canAccessPath("/roles/create", effective)) return
    void loadPermissions()
  }, [loadPermissions])

  const permissionGroups = useMemo(
    () => groupPermissions(permissionsCatalog),
    [permissionsCatalog]
  )

  const togglePermission = (id: string) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

    setSubmitLoading(true)
    try {
      await userService.createRole({
        name: name.trim(),
        description: description.trim() || undefined,
        permissionIds: [...selectedPermissionIds],
      })
      toast({ title: "Role created", description: `"${name.trim()}" is ready to assign.` })
      router.push("/roles")
    } catch (err) {
      toast({
        title: "Could not create role",
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
          title="Create role"
          description="Give the role a name and choose permissions for assignment to users."
          actions={
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href="/roles">
                <ArrowLeft className="h-4 w-4" />
                Back to roles
              </Link>
            </Button>
          }
        />

        <form onSubmit={handleSubmit}>
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Role details</CardTitle>
              <CardDescription>Identifier and capability set</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="role-name">Name *</Label>
                  <Input
                    id="role-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Events coordinator"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="role-desc">Description</Label>
                  <Input
                    id="role-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-base font-medium">Permissions *</Label>
                <p className="mb-4 text-xs text-muted-foreground">
                  At least one permission is required. Modules group related abilities.
                </p>
                <div className="max-h-[min(420px,calc(100vh-22rem))] space-y-4 overflow-y-auto rounded-md border border-border/60 bg-background p-4">
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
              <Button type="button" variant="outline" disabled={submitLoading} asChild>
                <Link href="/roles">Cancel</Link>
              </Button>
              <Button type="submit" disabled={submitLoading || catalogLoading}>
                {submitLoading ? "Creating…" : "Create role"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
