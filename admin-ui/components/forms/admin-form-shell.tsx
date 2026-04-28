"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Shared shell for create/edit forms: transparent card, border-only header (no tinted backgrounds).
 */
export function AdminFormSection({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden border border-border bg-transparent shadow-sm",
        className
      )}
    >
      <CardHeader className="border-b border-border px-6 py-5 sm:px-8">
        <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        {description != null && description !== false ? (
          <CardDescription className="text-[15px] leading-relaxed">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="p-6 sm:p-8">{children}</CardContent>
    </Card>
  )
}

/** Primary + cancel row at the bottom of admin forms */
export function FormActions({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 border-t border-border pt-6",
        className
      )}
    >
      {children}
    </div>
  )
}
