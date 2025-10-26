"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session")
    if (!session) {
      router.push("/auth/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) return null
  return <>{children}</>
}
