"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { positionService, Position } from "@/services/position.service"
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

export default function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchPositions()
  }, [])

  const fetchPositions = async () => {
    try {
      setLoading(true)
      const data = await positionService.getAll()
      setPositions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch positions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedPosition) return

    try {
      await positionService.delete(selectedPosition.id)
      toast({
        title: "Success",
        description: "Position deleted successfully",
      })
      fetchPositions()
      setDeleteDialogOpen(false)
      setSelectedPosition(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete position",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
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
          title="Positions"
          description="Manage team positions and roles."
          actions={
            <Button onClick={() => router.push("/positions/new")} className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add position
            </Button>
          }
        />

        <Card className="rounded-xl border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">Directory</CardTitle>
            <CardDescription>All available positions</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={positions}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/positions/${row.id}/detail`)}
              onEdit={(row) => router.push(`/positions/${row.id}`)}
              onDelete={(row) => {
                setSelectedPosition(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Position</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this position? This action
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
