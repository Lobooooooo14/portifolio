"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const [_queryClient] = useState(() => queryClient)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={_queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
