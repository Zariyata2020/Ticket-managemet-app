<template>
  <div class="min-h-screen bg-background text-foreground">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Initialize theme
  const isDark = localStorage.getItem('theme') === 'dark'
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
:root {
  --background: oklch(0.98 0 0);
  --foreground: oklch(0.15 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0 0);
  --primary: oklch(0.45 0.22 262);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.95 0.05 262);
  --secondary-foreground: oklch(0.15 0 0);
  --muted: oklch(0.92 0 0);
  --muted-foreground: oklch(0.55 0 0);
  --accent: oklch(0.55 0.22 262);
  --accent-foreground: oklch(0.98 0 0);
  --destructive: oklch(0.58 0.25 27);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.92 0 0);
  --input: oklch(0.95 0 0);
  --ring: oklch(0.45 0.22 262);
  --status-open: oklch(0.65 0.22 142);
  --status-in-progress: oklch(0.75 0.18 70);
  --status-closed: oklch(0.6 0 0);
}

.dark {
  --background: oklch(0.12 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.95 0 0);
  --primary: oklch(0.65 0.22 262);
  --primary-foreground: oklch(0.12 0 0);
  --secondary: oklch(0.25 0.05 262);
  --secondary-foreground: oklch(0.95 0 0);
  --muted: oklch(0.25 0 0);
  --muted-foreground: oklch(0.7 0 0);
  --accent: oklch(0.7 0.22 262);
  --accent-foreground: oklch(0.12 0 0);
  --destructive: oklch(0.4 0.14 26);
  --destructive-foreground: oklch(0.64 0.24 25);
  --border: oklch(0.25 0 0);
  --input: oklch(0.25 0 0);
  --ring: oklch(0.65 0.22 262);
  --status-open: oklch(0.75 0.22 142);
  --status-in-progress: oklch(0.85 0.18 70);
  --status-closed: oklch(0.7 0 0);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(var(--background));
  color: rgb(var(--foreground));
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
