"use client"

import { RedirectType, redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { FormSignIn } from "@/components/auth/form-sign-in"
import LoadingCircle from "@/components/loading-circle"
import { authClient, type ServerError } from "@/lib/auth-client"

export default function Page() {
  const [serverError, setServerError] = useState<ServerError | null>(null)
  const [loading, setLoading] = useState({
    auth: false,
    session: false,
  })

  useEffect(() => {
    ;(async () => {
      setLoading(prev => ({ ...prev, session: true }))
      const session = await authClient.getSession()

      if (session.data?.session) {
        redirect("/dashboard", RedirectType.replace)
      }

      setLoading(prev => ({ ...prev, session: false }))
    })()
  }, [])

  async function handleSignIn(data: { username: string; password: string }) {
    setLoading(prev => ({ ...prev, auth: true }))
    const { error } = await authClient.signIn.username(data)

    if (error) {
      setServerError(error)
      setLoading(prev => ({ ...prev, auth: false }))
      return
    }

    setLoading(prev => ({ ...prev, session: false }))
    redirect("/dashboard/analytics", RedirectType.replace)
  }

  if (loading.session) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingCircle className="w-8 h-8 border-2" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <FormSignIn
        onSubmit={handleSignIn}
        serverError={serverError}
        isLoading={loading.auth}
      />
    </div>
  )
}
