"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { userService, RoleCatalogItem } from "@/services/user.service"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ShieldPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const BUILTIN = new Set(["SUPER_ADMIN", "ADMIN", "USER"])

export default function RolesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [roles, setRoles] = useState<RoleCatalogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [perms, setPerms] = useState<string[]>([])

  const [deleteTarget, setDeleteTarget] = useState<RoleCatalogItem | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    setPerms(userService.getEffectivePermissions())
  }, [])

  const canWrite = useMemo(() => perms.includes("users.write"), [perms])
  const canDelete = useMemo(() => perms.includes("users.delete"), [perms])

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true)
      const data = await userService.getRolesCatalog()
      setRoles(data)
    } catch {
      toast({
        title: "Error",
        description: "Failed to load roles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    void fetchRoles()
  }, [fetchRoles])

  const handleEdit = (row: RoleCatalogItem) => {
    router.push(`/roles/${row.id}/edit`)
  }

  const handleDeleteClick = (row: RoleCatalogItem) => {
    if (BUILTIN.has(row.name)) {
      toast({
        title: "Not allowed",
        description: "Built-in roles cannot be removed.",
        variant: "destructive",
      })
      return
    }
    if ((row.assignedUserCount ?? 0) > 0) {
      toast({
        title: "Role in use",
        description:
          "Remove this role from all users before deleting it.",
        variant: "destructive",
      })
      return
    }
    setDeleteTarget(row)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    try {
      setDeleteLoading(true)
      await userService.deleteRole(deleteTarget.id)
      toast({
        title: "Role deleted",
        description: `“${deleteTarget.name}” has been removed.`,
      })
      setDeleteTarget(null)
      await fetchRoles()
    } catch (e) {
      toast({
        title: "Could not delete",
        description: e instanceof Error ? e.message : "",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  const columns = [
    { key: "name", header: "Role" },
    {
      key: "description",
      header: "Description",
      render: (v: string | null | undefined) =>
        v ? <span className="text-muted-foreground">{v}</span> : "—",
    },
    {
      key: "permissions",
      header: "Permissions",
      render: (_: unknown, row: RoleCatalogItem) => row.permissions?.length ?? 0,
    },
    {
      key: "assignedUserCount",
      header: "Assigned users",
      render: (_: unknown, row: RoleCatalogItem) => row.assignedUserCount ?? "—",
    },
  ]

  const showActions = canWrite || canDelete

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Roles"
          description="Define who can access which areas of the admin panel."
          actions={
            canWrite ? (
              <Button size="sm" className="gap-2 shadow-sm" asChild>
                <Link href="/roles/create">
                  <ShieldPlus className="h-4 w-4" />
                  Create role
                </Link>
              </Button>
            ) : null
          }
        />

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">Catalog</CardTitle>
            <CardDescription>All roles and their permission sets</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={roles}
              columns={columns}
              loading={loading}
              {...(showActions
                ? {
                    ...(canWrite && {
                      onEdit: (row: RoleCatalogItem) => handleEdit(row),
                    }),
                    ...(canDelete && {
                      onDelete: (row: RoleCatalogItem) => handleDeleteClick(row),
                    }),
                  }
                : {})}
            />
          </CardContent>
        </Card>

        <Dialog open={Boolean(deleteTarget)} onOpenChange={(o) => !o && setDeleteTarget(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete role?</DialogTitle>
              <DialogDescription>
                Permanently remove{" "}
                <span className="font-medium text-foreground">{deleteTarget?.name}</span>. Users
                will no longer be able to be assigned this role.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={deleteLoading}
                onClick={() => void handleDeleteConfirm()}
              >
                {deleteLoading ? "Deleting…" : "Delete role"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
