<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav class="bg-card border-b border-border sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-primary">TicketFlow</div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-muted-foreground">{{ userName }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-8">
        <!-- Page Header -->
        <div>
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground">Dashboard</h1>
          <p class="text-muted-foreground mt-2">Welcome back! Here's your ticket overview.</p>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-6 border border-border rounded-lg bg-card">
            <div class="space-y-2">
              <p class="text-sm font-medium text-muted-foreground">Total Tickets</p>
              <p class="text-2xl sm:text-3xl font-bold text-foreground">100</p>
              <p class="text-xs text-muted-foreground">+5 this week</p>
            </div>
          </div>

          <div class="p-6 border border-border rounded-lg bg-card">
            <div class="space-y-2">
              <p class="text-sm font-medium text-muted-foreground">Open Tickets</p>
              <p class="text-2xl sm:text-3xl font-bold text-status-open">24</p>
              <p class="text-xs text-muted-foreground">Awaiting action</p>
            </div>
          </div>

          <div class="p-6 border border-border rounded-lg bg-card">
            <div class="space-y-2">
              <p class="text-sm font-medium text-muted-foreground">In Progress</p>
              <p class="text-2xl sm:text-3xl font-bold text-status-in-progress">18</p>
              <p class="text-xs text-muted-foreground">Being worked on</p>
            </div>
          </div>

          <div class="p-6 border border-border rounded-lg bg-card">
            <div class="space-y-2">
              <p class="text-sm font-medium text-muted-foreground">Resolved</p>
              <p class="text-2xl sm:text-3xl font-bold text-status-closed">58</p>
              <p class="text-xs text-muted-foreground">This month</p>
            </div>
          </div>
        </div>

        <!-- Navigation to Tickets -->
        <div class="p-6 border border-border rounded-lg bg-card text-center">
          <h2 class="text-xl font-semibold mb-4">Manage Your Tickets</h2>
          <router-link to="/dashboard/tickets">
            <button class="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition font-medium">
              Go to Ticket Management
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('')

onMounted(() => {
  const session = localStorage.getItem('ticketapp_session')
  if (session) {
    const user = JSON.parse(session)
    userName.value = user.name
  }
})

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session')
  router.push('/')
}
</script>
