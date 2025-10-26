"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TicketList } from "@/components/tickets/ticket-list"
import { CreateTicketModal } from "@/components/tickets/create-ticket-modal"
import { EditTicketModal } from "@/components/tickets/edit-ticket-modal"

export interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [filter, setFilter] = useState<"all" | "open" | "in-progress" | "closed">("all")
  const [isLoading, setIsLoading] = useState(true)

  // Load tickets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tickets")
    if (stored) {
      setTickets(JSON.parse(stored))
    } else {
      // Initialize with sample data
      const sampleTickets: Ticket[] = [
        {
          id: "1",
          title: "Fix login bug",
          description: "Users unable to login with special characters",
          status: "open",
          priority: "high",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Add dark mode",
          description: "Implement dark mode theme",
          status: "in-progress",
          priority: "medium",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Update documentation",
          description: "Update API documentation",
          status: "closed",
          priority: "low",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      setTickets(sampleTickets)
      localStorage.setItem("tickets", JSON.stringify(sampleTickets))
    }
    setIsLoading(false)
  }, [])

  // Save tickets to localStorage
  const saveTickets = (updatedTickets: Ticket[]) => {
    setTickets(updatedTickets)
    localStorage.setItem("tickets", JSON.stringify(updatedTickets))
  }

  const handleCreateTicket = (newTicket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => {
    const ticket: Ticket = {
      ...newTicket,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveTickets([...tickets, ticket])
    setIsCreateOpen(false)
  }

  const handleUpdateTicket = (updatedTicket: Ticket) => {
    const updated = tickets.map((t) =>
      t.id === updatedTicket.id ? { ...updatedTicket, updatedAt: new Date().toISOString() } : t,
    )
    saveTickets(updated)
    setIsEditOpen(false)
    setSelectedTicket(null)
  }

  const handleDeleteTicket = (id: string) => {
    saveTickets(tickets.filter((t) => t.id !== id))
  }

  const filteredTickets = filter === "all" ? tickets : tickets.filter((t) => t.status === filter)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading tickets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Tickets</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage and track all your support tickets</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
          Create Ticket
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "open", "in-progress", "closed"] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            className="capitalize text-sm"
          >
            {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tickets List */}
      {filteredTickets.length > 0 ? (
        <TicketList
          tickets={filteredTickets}
          onEdit={(ticket) => {
            setSelectedTicket(ticket)
            setIsEditOpen(true)
          }}
          onDelete={handleDeleteTicket}
        />
      ) : (
        <Card className="p-8 sm:p-12 text-center border border-border">
          <p className="text-muted-foreground">No tickets found</p>
        </Card>
      )}

      {/* Modals */}
      <CreateTicketModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreate={handleCreateTicket} />
      {selectedTicket && (
        <EditTicketModal
          isOpen={isEditOpen}
          ticket={selectedTicket}
          onClose={() => {
            setIsEditOpen(false)
            setSelectedTicket(null)
          }}
          onUpdate={handleUpdateTicket}
        />
      )}
    </div>
  )
}
