"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (type === "signup" && password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]")

      if (type === "login") {
        const user = users.find((u: any) => u.email === email && u.password === password)
        if (!user) {
          setError("Invalid email or password")
          setLoading(false)
          return
        }
        localStorage.setItem("ticketapp_session", JSON.stringify({ email, id: user.id }))
      } else {
        if (users.some((u: any) => u.email === email)) {
          setError("Email already registered")
          setLoading(false)
          return
        }
        const newUser = { id: Date.now(), email, password }
        users.push(newUser)
        localStorage.setItem("ticketapp_users", JSON.stringify(users))
        localStorage.setItem("ticketapp_session", JSON.stringify({ email, id: newUser.id }))
      }

      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="text-3xl font-bold mb-2">{type === "login" ? "Welcome Back" : "Create Account"}</h1>
      <p className="text-muted-foreground mb-6">
        {type === "login" ? "Sign in to your account" : "Join TicketFlow today"}
      </p>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {type === "signup" && (
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : type === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-muted-foreground mt-6">
        {type === "login" ? "Don't have an account? " : "Already have an account? "}
        <a href={type === "login" ? "/auth/signup" : "/auth/login"} className="text-primary hover:underline">
          {type === "login" ? "Sign up" : "Sign in"}
        </a>
      </p>
    </Card>
  )
}
