import { usernameClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  plugins: [usernameClient()],
})

export type ServerError = {
  code?: string | undefined
  message?: string | undefined
  status: number
  statusText: string
}
