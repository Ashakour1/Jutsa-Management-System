"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { financeService } from "@/services/finance.service"
import { memberService } from "@/services/member.service"
import { activityService } from "@/services/activity.service"
import { competitorService } from "@/services/competitor.service"
import { DollarSign, Users, Activity, Trophy } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalFinance: 0,
    totalMembers: 0,
    totalActivities: 0,
    totalCompetitors: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [finances, members, activities, competitors] = await Promise.all([
          financeService.getAll().catch(() => []),
          memberService.getAll().catch(() => []),
          activityService.getAll().catch(() => []),
          competitorService.getAll().catch(() => []),
        ])

        const totalFinance = finances.reduce((sum, f) => sum + f.amount, 0)

        setStats({
          totalFinance,
          totalMembers: members.length,
          totalActivities: activities.length,
          totalCompetitors: competitors.length,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total finance",
      value: formatCurrency(stats.totalFinance),
      icon: DollarSign,
      hint: "Recorded transactions",
      accent: "from-emerald-500/15 to-emerald-600/5 text-emerald-700 dark:text-emerald-400",
    },
    {
      title: "Members",
      value: stats.totalMembers,
      icon: Users,
      hint: "Active records",
      accent: "from-sky-500/15 to-sky-600/5 text-sky-700 dark:text-sky-400",
    },
    {
      title: "Activities",
      value: stats.totalActivities,
      icon: Activity,
      hint: "Events & sessions",
      accent: "from-violet-500/15 to-violet-600/5 text-violet-700 dark:text-violet-400",
    },
    {
      title: "Competitors",
      value: stats.totalCompetitors,
      icon: Trophy,
      hint: "Tracked entries",
      accent: "from-amber-500/15 to-amber-600/5 text-amber-800 dark:text-amber-400",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in duration-500">
        <PageHeader
          title="Dashboard"
          description="High-level metrics across your organization."
        />

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-border/80">
                <CardContent className="p-6">
                  <div className="h-24 animate-pulse rounded-lg bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <Card
                  key={stat.title}
                  className="group overflow-hidden border-border/80 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{stat.hint}</p>
                      </div>
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br",
                          stat.accent
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
