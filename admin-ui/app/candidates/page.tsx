"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { candidateService, Candidate } from "@/services/candidate.service"
import { useToast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const data = await candidateService.getAll()
      setCandidates(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch candidates. The endpoint may not be available.",
        variant: "destructive",
      })
      setCandidates([])
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "studentID", header: "Student ID" },
    { key: "gpa", header: "GPA" },
    { key: "department", header: "Department" },
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
          title="Candidates"
          description="Review candidate applications submitted to the system."
        />

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">Directory</CardTitle>
            <CardDescription>All candidate applications</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={candidates}
              columns={columns}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
