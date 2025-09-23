"use client"

import type { ColumnDef } from "@tanstack/react-table"
import VisibilityBadge from "@/components/visibility-badge"
import type { ProjectType } from "@/utils/db"
import Actions from "./cells/actions"
import Title from "./cells/title"
import Header from "./columns/header"

export type ColumnType = Pick<
  ProjectType,
  "id" | "title" | "shortDescription" | "visibility" | "slug"
>

export const tableColumns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <Header column={column}>Title</Header>
    },
    cell: ({ row }) => {
      return <Title row={row} />
    },
  },
  {
    accessorKey: "shortDescription",
    header: ({ column }) => {
      return <Header column={column}>Description</Header>
    },
    cell: ({ row }) => {
      const description = row.original.shortDescription

      return <div className="line-clamp-2">{description || "-"}</div>
    },
  },
  {
    accessorKey: "visibility",
    header: ({ column }) => {
      return <Header column={column}>Visibility</Header>
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-start">
          <VisibilityBadge visibility={row.original.visibility} />
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions row={row} />,
  },
]
