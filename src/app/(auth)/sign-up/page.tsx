"use client"

import { RedirectType, redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { FormSignUp } from "@/components/auth/form-sign-up"
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
        setLoading(prev => ({ ...prev, session: false }))
        redirect("/dashboard", RedirectType.replace)
      }

      setLoading(prev => ({ ...prev, session: false }))
    })()
  }, [])

  async function handleSignUp(data: {
    username: string
    password: string
    email: string
    name: string
    displayUsername: string
  }) {
    setLoading(prev => ({ ...prev, session: true }))

    const { error } = await authClient.signUp.email(data)

    if (error) {
      setServerError(error)
      setLoading(prev => ({ ...prev, session: false }))
      return
    }

    setLoading(prev => ({ ...prev, session: false }))
    redirect("/sign-in")
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
      <FormSignUp
        onSubmit={handleSignUp}
        serverError={serverError}
        isLoading={loading.auth}
      />
    </div>
  )
}
