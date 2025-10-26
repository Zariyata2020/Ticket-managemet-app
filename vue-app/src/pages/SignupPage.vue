<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="space-y-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-foreground">Create Account</h1>
          <p class="text-muted-foreground mt-2">Join TicketFlow and start managing tickets</p>
        </div>

        <div class="bg-card p-6 border border-border rounded-lg">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="John Doe"
                :disabled="isLoading"
                class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                :disabled="isLoading"
                class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="••••••••"
                :disabled="isLoading"
                class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                placeholder="••••••••"
                :disabled="isLoading"
                class="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div v-if="error" class="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {{ error }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition disabled:opacity-50 font-medium"
            >
              {{ isLoading ? 'Creating account...' : 'Sign Up' }}
            </button>
          </form>
        </div>

        <p class="text-center text-sm text-muted-foreground">
          Already have an account?
          <router-link to="/auth/login" class="text-primary hover:underline font-semibold">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields'
    isLoading.value = false
    return
  }

  if (!email.value.includes('@')) {
    error.value = 'Please enter a valid email'
    isLoading.value = false
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    isLoading.value = false
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    isLoading.value = false
    return
  }

  try {
    const user = {
      email: email.value,
      id: Math.random().toString(36).substr(2, 9),
      name: name.value,
    }
    localStorage.setItem('ticketapp_session', JSON.stringify(user))
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Signup failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
