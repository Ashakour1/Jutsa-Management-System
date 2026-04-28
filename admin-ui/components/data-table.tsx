"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onView?: (row: T) => void
  loading?: boolean
}

function rowKey(row: object, index: number): string {
  const r = row as Record<string, unknown>
  const id = r["id"]
  if (typeof id === "string") return id
  const studentID = r["studentID"]
  if (typeof studentID === "string") return studentID
  return `row-${index}`
}

export function DataTable<T extends object>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  loading = false,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.header}</TableHead>
              ))}
              {(onEdit || onDelete || onView) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                ))}
                {(onEdit || onDelete || onView) && <TableCell />}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.key)}>{col.header}</TableHead>
            ))}
            {(onEdit || onDelete || onView) && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)}
                className="text-center text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={rowKey(row, index)} className="transition-colors hover:bg-muted/50">
                {columns.map((col) => {
                  const keyStr = String(col.key)
                  const value = keyStr.includes(".")
                    ? keyStr.split(".").reduce((obj: any, key) => obj?.[key], row)
                    : row[col.key as keyof T]
                  return (
                    <TableCell key={String(col.key)}>
                      {col.render ? col.render(value, row) : String(value ?? "")}
                    </TableCell>
                  )
                })}
                {(onEdit || onDelete || onView) && (
                  <TableCell>
                    <div className="flex gap-2">
                      {onView && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(row)}
                          className="transition-all hover:scale-110"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(row)}
                          className="transition-all hover:scale-110"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(row)}
                          className="transition-all hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
