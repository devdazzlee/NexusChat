"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("chatgpt_user_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  return <>{children}</>
}
