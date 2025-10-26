"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Ticket } from "@/app/dashboard/tickets/page"

interface TicketListProps {
  tickets: Ticket[]
  onEdit: (ticket: Ticket) => void
  onDelete: (id: string) => void
}

const statusColors = {
  open: "bg-status-open/10 text-status-open",
  "in-progress": "bg-status-in-progress/10 text-status-in-progress",
  closed: "bg-status-closed/10 text-status-closed",
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function TicketList({ tickets, onEdit, onDelete }: TicketListProps) {
  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="p-4 border border-border hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0 w-full">
              <h3 className="font-semibold text-foreground truncate text-sm sm:text-base">{ticket.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{ticket.description}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[ticket.status]}`}>
                  {ticket.status === "in-progress"
                    ? "In Progress"
                    : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[ticket.priority]}`}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <Button variant="outline" size="sm" onClick={() => onEdit(ticket)} className="flex-1 sm:flex-none">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive bg-transparent flex-1 sm:flex-none"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this ticket?")) {
                    onDelete(ticket.id)
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
