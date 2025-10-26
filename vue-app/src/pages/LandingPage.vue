<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav :class="['fixed top-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-background/95 backdrop-blur border-b border-border' : 'bg-transparent']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-primary">TicketFlow</div>
        <div class="flex gap-4">
          <router-link to="/auth/login">
            <button class="px-4 py-2 text-foreground hover:bg-secondary rounded-md transition">Login</button>
          </router-link>
          <router-link to="/auth/signup">
            <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition">Get Started</button>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <!-- Decorative circles -->
        <div class="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

        <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Manage Your <span class="text-primary">Tickets</span> Effortlessly
            </h1>
            <p class="text-xl text-muted-foreground mb-8 leading-relaxed">
              TicketFlow is a modern ticket management system designed to streamline your workflow, improve team collaboration, and boost productivity.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/auth/signup">
                <button class="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition font-medium">
                  Start Free Trial
                </button>
              </router-link>
              <router-link to="/auth/login">
                <button class="w-full sm:w-auto px-6 py-3 border border-border text-foreground rounded-md hover:bg-secondary transition font-medium">
                  Sign In
                </button>
              </router-link>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 border border-border">
              <div class="space-y-4">
                <div class="h-3 bg-primary/30 rounded w-3/4"></div>
                <div class="h-3 bg-primary/20 rounded w-1/2"></div>
                <div class="space-y-2 mt-6">
                  <div class="h-2 bg-muted rounded w-full"></div>
                  <div class="h-2 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave SVG -->
      <svg class="absolute bottom-0 left-0 w-full h-24 text-primary/5" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M0,50 Q250,0 500,50 T1000,50 L1000,100 L0,100 Z" fill="currentColor" />
      </svg>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">Why Choose TicketFlow?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="p-8 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold mb-3">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-muted-foreground mb-8">
          Join thousands of teams using TicketFlow to manage their tickets efficiently.
        </p>
        <router-link to="/auth/signup">
          <button class="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition font-medium text-lg">
            Create Your Account Now
          </button>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-secondary/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="font-bold text-lg mb-4">TicketFlow</h3>
            <p class="text-muted-foreground">Modern ticket management for teams.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Product</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li><a href="#" class="hover:text-foreground">Features</a></li>
              <li><a href="#" class="hover:text-foreground">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li><a href="#" class="hover:text-foreground">About</a></li>
              <li><a href="#" class="hover:text-foreground">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li><a href="#" class="hover:text-foreground">Privacy</a></li>
              <li><a href="#" class="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const features = [
  {
    title: 'Easy to Use',
    description: 'Intuitive interface that requires no training. Start managing tickets in minutes.',
    icon: '✨',
  },
  {
    title: 'Real-time Updates',
    description: 'See ticket changes instantly. Stay synchronized with your team in real-time.',
    icon: '⚡',
  },
  {
    title: 'Secure & Reliable',
    description: 'Your data is protected with industry-standard security measures.',
    icon: '🔒',
  },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
