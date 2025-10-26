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
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-foreground">Tickets</h1>
            <p class="text-muted-foreground mt-1 text-sm sm:text-base">Manage and track all your support tickets</p>
          </div>
          <button
            @click="isCreateOpen = true"
            class="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition font-medium"
          >
            Create Ticket
          </button>
        </div>

        <!-- Filter Buttons -->
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="status in ['all', 'open', 'in-progress', 'closed']"
            :key="status"
            @click="filter = status"
            :class="[
              'px-4 py-2 rounded-md transition font-medium text-sm',
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-foreground hover:bg-secondary'
            ]"
          >
            {{ status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1) }}
          </button>
        </div>

        <!-- Tickets List -->
        <div v-if="filteredTickets.length > 0" class="space-y-3">
          <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="p-4 border border-border rounded-lg bg-card hover:shadow-md transition"
          >
            <div class="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
              <div class="flex-1 min-w-0 w-full">
                <h3 class="font-semibold text-foreground truncate text-sm sm:text-base">{{ ticket.title }}</h3>
                <p class="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{{ ticket.description }}</p>
                <div class="flex gap-2 mt-3 flex-wrap">
                  <span :class="['px-2 py-1 rounded text-xs font-medium', getStatusClass(ticket.status)]">
                    {{ ticket.status === 'in-progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1) }}
                  </span>
                  <span :class="['px-2 py-1 rounded text-xs font-medium', getPriorityClass(ticket.priority)]">
                    {{ ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1) }} Priority
                  </span>
                </div>
              </div>
              <div class="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                <button
                  @click="editTicket(ticket)"
                  class="flex-1 sm:flex-none px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  @click="deleteTicket(ticket.id)"
                  class="flex-1 sm:flex-none px-4 py-2 border border-border text-destructive rounded-md hover:bg-destructive/10 transition text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-8 sm:p-12 text-center border border-border rounded-lg bg-card">
          <p class="text-muted-foreground">No tickets found</p>
        </div>
      </div>
    </div>

    <!-- Create Ticket Modal -->
    <div v-if="isCreateOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-card border border-border rounded-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Create Ticket</h2>
        <form @submit.prevent="handleCreateTicket" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              v-model="newTicket.title"
              type="text"
              placeholder="Ticket title"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              v-model="newTicket.description"
              placeholder="Ticket description"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              v-model="newTicket.status"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Priority</label>
            <select
              v-model="newTicket.priority"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition font-medium"
            >
              Create
            </button>
            <button
              type="button"
              @click="isCreateOpen = false"
              class="flex-1 px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Ticket Modal -->
    <div v-if="isEditOpen && selectedTicket" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-card border border-border rounded-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Edit Ticket</h2>
        <form @submit.prevent="handleUpdateTicket" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              v-model="selectedTicket.title"
              type="text"
              placeholder="Ticket title"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              v-model="selectedTicket.description"
              placeholder="Ticket description"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              v-model="selectedTicket.status"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Priority</label>
            <select
              v-model="selectedTicket.priority"
              class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition font-medium"
            >
              Update
            </button>
            <button
              type="button"
              @click="isEditOpen = false"
              class="flex-1 px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('')
const tickets = ref([])
const filter = ref('all')
const isCreateOpen = ref(false)
const isEditOpen = ref(false)
const selectedTicket = ref(null)
const newTicket = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
})

const filteredTickets = computed(() => {
  return filter.value === 'all' ? tickets.value : tickets.value.filter(t => t.status === filter.value)
})

onMounted(() => {
  const session = localStorage.getItem('ticketapp_session')
  if (session) {
    const user = JSON.parse(session)
    userName.value = user.name
  }

  const stored = localStorage.getItem('tickets')
  if (stored) {
    tickets.value = JSON.parse(stored)
  } else {
    tickets.value = [
      {
        id: '1',
        title: 'Fix login bug',
        description: 'Users unable to login with special characters',
        status: 'open',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Add dark mode',
        description: 'Implement dark mode theme',
        status: 'in-progress',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Update documentation',
        description: 'Update API documentation',
        status: 'closed',
        priority: 'low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem('tickets', JSON.stringify(tickets.value))
  }
})

const handleCreateTicket = () => {
  if (!newTicket.value.title || !newTicket.value.description) {
    alert('Please fill in all fields')
    return
  }

  const ticket = {
    id: Math.random().toString(36).substr(2, 9),
    ...newTicket.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  tickets.value.push(ticket)
  localStorage.setItem('tickets', JSON.stringify(tickets.value))
  isCreateOpen.value = false
  newTicket.value = { title: '', description: '', status: 'open', priority: 'medium' }
}

const handleUpdateTicket = () => {
  if (!selectedTicket.value.title || !selectedTicket.value.description) {
    alert('Please fill in all fields')
    return
  }

  const index = tickets.value.findIndex(t => t.id === selectedTicket.value.id)
  if (index !== -1) {
    tickets.value[index] = { ...selectedTicket.value, updatedAt: new Date().toISOString() }
    localStorage.setItem('tickets', JSON.stringify(tickets.value))
  }

  isEditOpen.value = false
  selectedTicket.value = null
}

const editTicket = (ticket) => {
  selectedTicket.value = { ...ticket }
  isEditOpen.value = true
}

const deleteTicket = (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    tickets.value = tickets.value.filter(t => t.id !== id)
    localStorage.setItem('tickets', JSON.stringify(tickets.value))
  }
}

const getStatusClass = (status) => {
  const classes = {
    'open': 'bg-status-open/10 text-status-open',
    'in-progress': 'bg-status-in-progress/10 text-status-in-progress',
    'closed': 'bg-status-closed/10 text-status-closed',
  }
  return classes[status] || ''
}

const getPriorityClass = (priority) => {
  const classes = {
    'low': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'high': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }
  return classes[priority] || ''
}

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session')
  router.push('/')
}
</script>
