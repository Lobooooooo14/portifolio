"use client"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function SessionCountdown() {
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)
  const [timeLeft, setTimeLeft] = useState("--")

  async function fetchSession() {
    const session = await authClient.getSession()
    const exp = session?.data?.session?.expiresAt
    if (exp) setExpiresAt(new Date(exp))
  }

  useEffect(() => {
    fetchSession()
  }, [])

  useEffect(() => {
    function updateTime() {
      if (!expiresAt) return

      const diff = expiresAt.getTime() - Date.now()

      if (diff <= 0) {
        setTimeLeft("0s")
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      const days = Math.floor(totalSeconds / 86400)
      const hours = Math.floor((totalSeconds % 86400) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      let str = ""
      if (days > 0) str += `${days}d `
      if (hours > 0) str += `${hours}h `
      if (minutes > 0) str += `${minutes}m `
      str += `${seconds}s`

      setTimeLeft(str.trim())
    }

    updateTime()
    const interval = setInterval(updateTime, 1_000)

    return () => clearInterval(interval)
  }, [expiresAt])

  useEffect(() => {
    const interval = setInterval(fetchSession, 60_000)
    return () => clearInterval(interval)
  }, [])

  if (!expiresAt) return <span>--</span>

  return <span>{timeLeft}</span>
}
