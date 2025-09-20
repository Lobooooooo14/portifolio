"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { improveIconColorVisibility, oklchToRGBA } from "@/utils/tools"
import { Skeleton } from "./ui/skeleton"

export default function FetchSimpleIcon({
  slug,
  style,
  className,
  ...props
}: { slug: string } & React.SVGProps<SVGSVGElement>) {
  const { resolvedTheme } = useTheme()
  const [path, setPath] = useState<string>()
  const [color, setColor] = useState<string>()

  useEffect(() => {
    ;(async () => {
      if (!slug.trim().length) {
        return
      }

      const res = await fetch(`https://simpleicons.org/icons/${slug}.svg`)

      if (res.ok) {
        const svg = await res.text()

        const path = svg.match(/<path[^>]*d="([^"]*)"/)?.[1]

        if (path) {
          setPath(path)

          const backgroundColorRaw = getComputedStyle(
            document.body
          ).getPropertyValue("--background")

          const backgroundColor = oklchToRGBA(backgroundColorRaw)

          const improvedColor = improveIconColorVisibility(
            style?.fill || (resolvedTheme === "dark" ? "#fff" : "#000"),
            `rgb(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`,
            resolvedTheme || "light"
          )

          setColor(improvedColor)
        }
      }
    })()
  }, [slug])

  return (
    <span>
      {path ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={color}
          className={cn("h-4 w-4", className)}
          {...props}
        >
          <title>{slug}</title>
          <path d={path} />
        </svg>
      ) : (
        <Skeleton className="h-4 w-4" />
      )}
    </span>
  )
}
