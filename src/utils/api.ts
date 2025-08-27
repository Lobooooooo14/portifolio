import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export async function safeParseBody(req: NextRequest) {
  try {
    return await req.json()
  } catch (_) {
    return {}
  }
}

export async function getSession(headers: Headers) {
  const session = await auth.api.getSession({
    headers,
  })

  if (!session) {
    return
  }

  return session
}
