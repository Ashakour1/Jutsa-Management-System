"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
interface DetailField {
  label: string
  value: string | number | null | undefined
  render?: (value: any) => React.ReactNode
}

interface DetailViewProps {
  title: string
  fields: DetailField[]
  onEdit?: () => void
  onDelete?: () => void
  editPath?: string
  backPath: string
}

export function DetailView({
  title,
  fields,
  onEdit,
  onDelete,
  editPath,
  backPath,
}: DetailViewProps) {
  const router = useRouter()

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <Button
            variant="outline"
            size="icon"
            className="mt-1 shrink-0 rounded-lg shadow-sm"
            onClick={() => router.push(backPath)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Detail
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {onEdit && (
            <Button onClick={onEdit} className="shadow-sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {editPath && (
            <Button onClick={() => router.push(editPath)} className="shadow-sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" onClick={onDelete} className="shadow-sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden border-border/80">
        <CardHeader className="border-b border-border py-5">
          <h2 className="text-lg font-semibold tracking-tight">Information</h2>
        </CardHeader>
        <CardContent className="divide-y divide-border/60 p-0">
          {fields.map(({ label, value, render }, idx) => (
            <div
              key={`${label}-${idx}`} className="grid gap-1 px-6 py-4 sm:grid-cols-[minmax(140px,1fr)_2fr] sm:gap-8 sm:py-5">
              <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
              <dd className="text-sm leading-relaxed text-foreground wrap-break-word">
                {render ? render(value) : value ?? "—"}
              </dd>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
