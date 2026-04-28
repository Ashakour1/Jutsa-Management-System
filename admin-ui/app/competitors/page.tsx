"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { competitorService, Competitor } from "@/services/competitor.service"
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

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCompetitors()
  }, [])

  const fetchCompetitors = async () => {
    try {
      setLoading(true)
      const data = await competitorService.getAll()
      setCompetitors(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch competitors",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedCompetitor) return

    try {
      await competitorService.delete(selectedCompetitor.id)
      toast({
        title: "Success",
        description: "Competitor deleted successfully",
      })
      fetchCompetitors()
      setDeleteDialogOpen(false)
      setSelectedCompetitor(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete competitor",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "projectName", header: "Project" },
    { key: "type", header: "Type" },
    { key: "status", header: "Status" },
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
          title="Competitors"
          description="Manage IT Day competitors."
          actions={
            <Button onClick={() => router.push("/competitors/new")} className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add competitor
            </Button>
          }
        />

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">Directory</CardTitle>
            <CardDescription>All registered competitors</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={competitors}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/competitors/${row.id}/detail`)}
              onEdit={(row) => router.push(`/competitors/${row.id}`)}
              onDelete={(row) => {
                setSelectedCompetitor(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Competitor</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this competitor? This action
                cannot be undone.
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
