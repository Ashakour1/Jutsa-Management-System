"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { caawiyeService, Caawiye } from "@/services/caawiye.service"
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

export default function CaawiyePage() {
  const [caawiye, setCaawiye] = useState<Caawiye[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCaawiye, setSelectedCaawiye] = useState<Caawiye | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCaawiye()
  }, [])

  const fetchCaawiye = async () => {
    try {
      setLoading(true)
      const data = await caawiyeService.getAll()
      setCaawiye(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch caawiye",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedCaawiye) return

    try {
      await caawiyeService.delete(selectedCaawiye.id)
      toast({
        title: "Success",
        description: "Caawiye deleted successfully",
      })
      fetchCaawiye()
      setDeleteDialogOpen(false)
      setSelectedCaawiye(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete caawiye",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "number", header: "Number" },
    { key: "semester", header: "Semester" },
    { key: "className", header: "Class" },
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
          title="Caawiye"
          description="Manage support requests."
          actions={
            <Button onClick={() => router.push("/caawiye/new")} className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add entry
            </Button>
          }
        />

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">Directory</CardTitle>
            <CardDescription>All support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={caawiye}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/caawiye/${row.id}/detail`)}
              onEdit={(row) => router.push(`/caawiye/${row.id}`)}
              onDelete={(row) => {
                setSelectedCaawiye(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Caawiye</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this caawiye? This action
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
