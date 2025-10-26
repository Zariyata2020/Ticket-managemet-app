import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import LandingPage from "./pages/LandingPage.vue"
import LoginPage from "./pages/LoginPage.vue"
import SignupPage from "./pages/SignupPage.vue"
import DashboardPage from "./pages/DashboardPage.vue"
import TicketsPage from "./pages/TicketsPage.vue"

const routes = [
  { path: "/", component: LandingPage },
  { path: "/auth/login", component: LoginPage },
  { path: "/auth/signup", component: SignupPage },
  { path: "/dashboard", component: DashboardPage, meta: { requiresAuth: true } },
  { path: "/dashboard/tickets", component: TicketsPage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("ticketapp_session")
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth/login")
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount("#app")
