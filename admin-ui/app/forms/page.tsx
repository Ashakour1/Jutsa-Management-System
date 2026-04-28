"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formService, FormVisibility } from "@/services/form.service"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ClipboardList,
  Dumbbell,
  GraduationCap,
  Shield,
  Sparkles,
  UserCircle,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type FormMeta = {
  title: string
  description: string
  Icon: LucideIcon
  accent: string
}

const FORM_REGISTRY: Record<string, FormMeta> = {
  sportsForm: {
    title: "Sports form",
    description: "Athletics and sports committee sign-ups",
    Icon: Dumbbell,
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  presidentForm: {
    title: "President form",
    description: "Election or president role applications",
    Icon: UserCircle,
    accent: "text-violet-600 dark:text-violet-400",
  },
  facultyForm: {
    title: "Faculty form",
    description: "Faculty registration and submissions",
    Icon: GraduationCap,
    accent: "text-sky-700 dark:text-sky-400",
  },
}

function defaultMeta(key: string): FormMeta {
  return {
    title: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim(),
    description: "External form endpoint",
    Icon: ClipboardList,
    accent: "text-foreground",
  }
}

export default function FormsPage() {
  const [forms, setForms] = useState<FormVisibility>({})
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      setLoading(true)
      const data = await formService.getAll()
      setForms(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch forms",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (formName: string, currentValue: boolean) => {
    try {
      await formService.update(formName, !currentValue)
      setForms((prev) => ({
        ...prev,
        [formName]: !currentValue,
      }))
      toast({
        title: "Saved",
        description: "Form visibility was updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update form visibility",
        variant: "destructive",
      })
    }
  }

  const entries = Object.entries(forms)

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Form management"
          description="Turn public registration forms on or off. When hidden, visitors won’t see them on your public site."
        />

        <Card className="overflow-hidden border-border shadow-sm bg-transparent">
          <CardHeader className="border-b border-border px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <Sparkles className="h-5 w-5 shrink-0 text-primary" />
                  Public visibility
                </CardTitle>
                <CardDescription className="max-w-xl text-[15px] leading-relaxed">
                  Each toggle controls the API flag for that form. Changes apply immediately after a successful save.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 shrink-0" />
                <span>Authenticated admin only</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-4 sm:p-6">
            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center gap-4 rounded-xl border border-border p-4 sm:p-5"
                  >
                    <div className="h-12 w-12 shrink-0 rounded-2xl border border-border bg-transparent" />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="h-4 w-40 rounded bg-muted" />
                      <div className="h-3 w-64 max-w-full rounded bg-muted/80" />
                    </div>
                    <div className="hidden h-6 w-24 rounded-full border border-border sm:block" />
                  </div>
                ))}
              </div>
            ) : entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-16 text-center">
                <ClipboardList className="mb-4 h-10 w-10 text-muted-foreground/60" />
                <p className="font-medium text-foreground">No forms configured</p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Forms will appear here once your API returns form keys from the `/form` endpoint.
                </p>
              </div>
            ) : (
              entries.map(([formName, isVisible]) => {
                const meta = FORM_REGISTRY[formName] ?? defaultMeta(formName)
                const Icon = meta.Icon
                const visible = Boolean(isVisible)
                return (
                  <article
                    key={formName}
                    className="flex flex-col gap-5 rounded-xl border border-border p-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-transparent",
                          meta.accent
                        )}
                        aria-hidden
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Label
                            htmlFor={formName}
                            className="cursor-pointer text-base font-semibold leading-tight text-foreground"
                          >
                            {meta.title}
                          </Label>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                              visible
                                ? "border-emerald-500/50 text-emerald-800 dark:text-emerald-400"
                                : "border-border text-muted-foreground"
                            )}
                          >
                            {visible ? "Live" : "Hidden"}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {meta.description}
                        </p>
                        <p className="font-mono text-[11px] text-muted-foreground/80">
                          {formName}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border pt-4 sm:border-t-0 sm:pt-0">
                      <span className="text-sm text-muted-foreground sm:hidden">
                        {visible ? "Public can access" : "Not listed publicly"}
                      </span>
                      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                        <span className="hidden text-right text-xs text-muted-foreground sm:block">
                          {visible ? "Visible on site" : "Hidden from site"}
                        </span>
                        <Switch
                          id={formName}
                          checked={visible}
                          onCheckedChange={() => handleToggle(formName, isVisible ?? false)}
                        />
                      </div>
                    </div>
                  </article>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
