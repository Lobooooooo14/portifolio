"use client"

import type { Column } from "@tanstack/react-table"
import { LucideArrowDown, LucideArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ColumnType } from "../table-columns"

export default function Header({
  children,
  column,
}: {
  children: React.ReactNode
  column: Column<ColumnType, unknown>
}) {
  return (
    <Button
      variant="link"
      className="font-semibold cursor-pointer p-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      {column.getIsSorted() === "asc" ? (
        <LucideArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <LucideArrowDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}
