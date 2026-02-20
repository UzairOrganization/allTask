"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminAuth")

    // Allow access to login page
    if (pathname === "/admin/admin-login") return

    // Redirect if not logged in
    if (!isLoggedIn) {
      router.push("/admin/admin-login")
    }
  }, [pathname, router])

  return children
}