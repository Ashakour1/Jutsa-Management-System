"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { memberService, Member } from "@/services/member.service"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PageHeader } from "@/components/layout/page-header"

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const data = await memberService.getAll()
      setMembers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch members",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedMember) return

    try {
      await memberService.delete(selectedMember.id)
      toast({
        title: "Success",
        description: "Member deleted successfully",
      })
      fetchMembers()
      setDeleteDialogOpen(false)
      setSelectedMember(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "studentId", header: "Student ID" },
    { key: "semester", header: "Semester" },
    { key: "year", header: "Year" },
    {
      key: "position.title",
      header: "Position",
      render: (_: any, row: Member) => row.position?.title || "N/A",
    },
    {
      key: "createdAt",
      header: "Created",
      render: (value: string) => formatDate(value),
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Members"
          description="Manage team members and their information."
          actions={
            <Button onClick={() => router.push("/members/new")} className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add member
            </Button>
          }
        />

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">Directory</CardTitle>
            <CardDescription>All registered team members</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={members}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/members/${row.id}/detail`)}
              onEdit={(row) => router.push(`/members/${row.id}`)}
              onDelete={(row) => {
                setSelectedMember(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Member</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this member? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
