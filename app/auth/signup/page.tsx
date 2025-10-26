import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground mt-2">Join TicketFlow and start managing tickets</p>
      </div>
      <SignupForm />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  )
}
