"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card } from "@/components/ui/card"

const chartData = [
  { name: "Mon", tickets: 12, resolved: 8 },
  { name: "Tue", tickets: 19, resolved: 12 },
  { name: "Wed", tickets: 15, resolved: 10 },
  { name: "Thu", tickets: 25, resolved: 18 },
  { name: "Fri", tickets: 22, resolved: 16 },
  { name: "Sat", tickets: 8, resolved: 6 },
  { name: "Sun", tickets: 5, resolved: 4 },
]

const statusData = [
  { name: "Open", value: 24, color: "hsl(var(--status-open))" },
  { name: "In Progress", value: 18, color: "hsl(var(--status-in-progress))" },
  { name: "Closed", value: 58, color: "hsl(var(--status-closed))" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your ticket overview.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">100</p>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
            <p className="text-2xl sm:text-3xl font-bold text-status-open">24</p>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
            <p className="text-2xl sm:text-3xl font-bold text-status-in-progress">18</p>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Resolved</p>
            <p className="text-2xl sm:text-3xl font-bold text-status-closed">58</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <Card className="p-4 sm:p-6 border border-border lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Tickets Over Time</h2>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Line type="monotone" dataKey="tickets" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="p-4 sm:p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Status Distribution</h2>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card className="p-4 sm:p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Activity</h2>
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <Bar dataKey="tickets" fill="hsl(var(--primary))" />
              <Bar dataKey="resolved" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
