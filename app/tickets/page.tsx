"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProtectedRoute } from "@/components/protected-route"

interface Ticket {
  id: number
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
}

export default function TicketsPage() {
  const router = useRouter()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open" as const,
    priority: "medium" as const,
  })

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]")
    setTickets(savedTickets)
  }, [])

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required")
      return false
    }
    if (formData.title.length > 100) {
      setError("Title must be less than 100 characters")
      return false
    }
    if (!["open", "in_progress", "closed"].includes(formData.status)) {
      setError("Invalid status")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) return

    if (editingId) {
      const updated = tickets.map((t) => (t.id === editingId ? { ...t, ...formData } : t))
      setTickets(updated)
      localStorage.setItem("ticketapp_tickets", JSON.stringify(updated))
      setSuccess("Ticket updated successfully!")
    } else {
      const newTicket: Ticket = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toLocaleDateString(),
      }
      const updated = [...tickets, newTicket]
      setTickets(updated)
      localStorage.setItem("ticketapp_tickets", JSON.stringify(updated))
      setSuccess("Ticket created successfully!")
    }

    setFormData({ title: "", description: "", status: "open", priority: "medium" })
    setEditingId(null)
    setShowForm(false)

    setTimeout(() => setSuccess(""), 3000)
  }

  const handleEdit = (ticket: Ticket) => {
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    })
    setEditingId(ticket.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id)
      setTickets(updated)
      localStorage.setItem("ticketapp_tickets", JSON.stringify(updated))
      setSuccess("Ticket deleted successfully!")
      setTimeout(() => setSuccess(""), 3000)
    }
  }

  const handleCancel = () => {
    setFormData({ title: "", description: "", status: "open", priority: "medium" })
    setEditingId(null)
    setShowForm(false)
    setError("")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">TicketFlow</h1>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ticket Management</h2>
              <p className="text-muted-foreground">Create, view, edit, and delete tickets</p>
            </div>
            {!showForm && <Button onClick={() => setShowForm(true)}>Create Ticket</Button>}
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-status-open/10 border-status-open text-status-open">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          {showForm && (
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">{editingId ? "Edit Ticket" : "Create New Ticket"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Ticket title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    placeholder="Ticket description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">{editingId ? "Update Ticket" : "Create Ticket"}</Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Tickets Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length === 0 ? (
              <Card className="col-span-full p-12 text-center">
                <p className="text-muted-foreground text-lg">No tickets yet. Create one to get started!</p>
              </Card>
            ) : (
              tickets.map((ticket) => (
                <Card key={ticket.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg flex-1">{ticket.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                        ticket.status === "open"
                          ? "bg-status-open/20 text-status-open"
                          : ticket.status === "in_progress"
                            ? "bg-status-in-progress/20 text-status-in-progress"
                            : "bg-status-closed/20 text-status-closed"
                      }`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>

                  {ticket.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{ticket.description}</p>
                  )}

                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-muted-foreground">{ticket.createdAt}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        ticket.priority === "high"
                          ? "bg-destructive/20 text-destructive"
                          : ticket.priority === "medium"
                            ? "bg-accent/20 text-accent"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(ticket)} className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(ticket.id)} className="flex-1">
                      Delete
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
