"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user")
    if (!userStr) {
      router.push("/auth/login")
      return
    }
    setUser(JSON.parse(userStr))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/dashboard" className="text-xl sm:text-2xl font-bold text-primary">
              TicketFlow
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block text-sm">
              <p className="font-medium text-foreground">{user?.name}</p>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative w-64 h-[calc(100vh-73px)] bg-card border-r border-border transition-transform duration-300 z-30 overflow-y-auto`}
        >
          <nav className="p-4 space-y-2">
            <Link href="/dashboard">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground font-medium">
                Dashboard
              </button>
            </Link>
            <Link href="/dashboard/tickets">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground font-medium">
                Tickets
              </button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden z-20" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  )
}
