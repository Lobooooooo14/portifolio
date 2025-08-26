"use client"

import { EllipsisVerticalIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import type { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { NavUserMenu } from "./nav-user-menu"

type Session = typeof auth.$Infer.Session

export default function SidebarNavUser({
  ...props
}: React.ComponentProps<typeof SidebarMenu>) {
  const [user, setUser] = useState<Session["user"] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const session = await authClient.getSession()

      if (session.data?.user) {
        setUser(session.data.user)
      }

      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <Skeleton className="flex w-full min-w-0 h-12 rounded-lg" />
  }

  if (!user) {
    return null
  }

  return (
    <SidebarMenu {...props}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.image && <AvatarImage src={user.image} alt="Lobo" />}
                <AvatarFallback className="rounded-lg">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate">{user.name}</span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="right"
            sideOffset={4}
            className="min-w-[250px]"
          >
            <NavUserMenu user={user} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
