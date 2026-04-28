"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import { AdminFormSection, FormActions } from "@/components/forms/admin-form-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { caawiyeService, CaawiyeCreate } from "@/services/caawiye.service"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CaawiyeFormPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isEdit = params.id !== "new"
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CaawiyeCreate>({
    name: "",
    number: 0,
    semester: "",
    className: "",
    password: "",
    problems: "",
    solutions: "",
    status: "",
  })

  useEffect(() => {
    if (isEdit && params.id) {
      fetchCaawiye()
    }
  }, [isEdit, params.id])

  const fetchCaawiye = async () => {
    try {
      setLoading(true)
      const caawiye = await caawiyeService.getById(params.id as string)
      setFormData({
        name: caawiye.name,
        number: caawiye.number,
        semester: caawiye.semester,
        className: caawiye.className,
        password: caawiye.password,
        problems: caawiye.problems,
        solutions: caawiye.solutions,
        status: caawiye.status,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch caawiye",
        variant: "destructive",
      })
      router.push("/caawiye")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit) {
        await caawiyeService.update(params.id as string, formData)
        toast({
          title: "Success",
          description: "Caawiye updated successfully",
        })
      } else {
        await caawiyeService.create(formData)
        toast({
          title: "Success",
          description: "Caawiye created successfully",
        })
      }
      router.push("/caawiye")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Operation failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title={isEdit ? "Edit caawiye" : "Add caawiye"}
          description="Support requests: status, problems, and proposed solutions."
        />

        <AdminFormSection title="Caawiye details">
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">Number</Label>
                  <Input
                    id="number"
                    type="number"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    value={formData.className}
                    onChange={(e) =>
                      setFormData({ ...formData, className: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="problems">Problems</Label>
                <Input
                  id="problems"
                  value={formData.problems}
                  onChange={(e) =>
                    setFormData({ ...formData, problems: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solutions">Solutions</Label>
                <Input
                  id="solutions"
                  value={formData.solutions}
                  onChange={(e) =>
                    setFormData({ ...formData, solutions: e.target.value })
                  }
                  required
                />
              </div>

            <FormActions>
              <Button type="submit" disabled={loading}>
                {loading ? (isEdit ? "Updating…" : "Creating…") : isEdit ? "Update" : "Create"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </FormActions>
          </form>
        </AdminFormSection>
      </div>
    </DashboardLayout>
  )
}
