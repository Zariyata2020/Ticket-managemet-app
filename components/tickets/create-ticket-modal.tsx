"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Ticket } from "@/app/dashboard/tickets/page"

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => void
}

export function CreateTicketModal({ isOpen, onClose, onCreate }: CreateTicketModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert("Please enter a title")
      return
    }
    onCreate({
      title,
      description,
      priority,
      status: "open",
    })
    setTitle("")
    setDescription("")
    setPriority("medium")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border border-border max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Create Ticket</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <Input
                type="text"
                placeholder="Ticket title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                placeholder="Ticket description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end pt-4 flex-col-reverse sm:flex-row">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Create Ticket
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
