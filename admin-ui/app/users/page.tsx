"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { userService, User } from "@/services/user.service"
import { useToast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [perms, setPerms] = useState<string[]>([])
  const { toast } = useToast()

  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    setPerms(userService.getEffectivePermissions())
  }, [])

  const canCreateUsers = useMemo(
    () => perms.includes("users.write"),
    [perms]
  )
  const canEditUsers = useMemo(() => perms.includes("users.write"), [perms])
  const canDeleteUsers = useMemo(() => perms.includes("users.delete"), [perms])

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await userService.getUsers()
      setUsers(data)
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const currentUserId = userService.getCurrentUser()?.id

  const handleEdit = (row: User) => {
    router.push(`/users/${row.id}/edit`)
  }

  const handleDeleteClick = (row: User) => {
    if (row.id === currentUserId) {
      toast({
        title: "Not allowed",
        description: "You cannot delete your own account here.",
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
      await userService.deleteUser(deleteTarget.id)
      toast({ title: "User deleted", description: `${deleteTarget.email}` })
      setDeleteTarget(null)
      await fetchUsers()
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
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "username", header: "Username" },
    { key: "status", header: "Status" },
    {
      key: "roles",
      header: "Roles",
      render: (value: { name: string }[]) =>
        Array.isArray(value) ? value.map((r) => r.name).join(", ") : "—",
    },
    {
      key: "createdAt",
      header: "Created",
      render: (value: string) => formatDate(value),
    },
  ]

  const showActions = canEditUsers || canDeleteUsers

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Users"
          description="Administrators and accounts that can access this workspace."
          actions={
            canCreateUsers ? (
              <Button size="sm" className="gap-2 shadow-sm" asChild>
                <Link href="/users/create">
                  <UserPlus className="h-4 w-4" />
                  Create user
                </Link>
              </Button>
            ) : null
          }
        />

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">Directory</CardTitle>
            <CardDescription>All system users</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={users}
              columns={columns}
              loading={loading}
              {...(showActions
                ? {
                    ...(canEditUsers && {
                      onEdit: (row: User) => handleEdit(row),
                    }),
                    ...(canDeleteUsers && {
                      onDelete: (row: User) => handleDeleteClick(row),
                    }),
                  }
                : {})}
            />
          </CardContent>
        </Card>

        <Dialog open={Boolean(deleteTarget)} onOpenChange={(o) => !o && setDeleteTarget(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete user?</DialogTitle>
              <DialogDescription>
                This will permanently remove{" "}
                <span className="font-medium text-foreground">{deleteTarget?.email}</span> from the
                system. This cannot be undone.
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
                {deleteLoading ? "Deleting…" : "Delete user"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
