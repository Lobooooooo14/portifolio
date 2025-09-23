import type { Metadata } from "next"
import "./globals.css"

import { Toaster } from "@/components/ui/sonner"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "Portifolio",
  description: "My personal portifolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
