import { AuthForm } from "@/components/auth-form"
import { Navigation } from "@/components/navigation"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm defaultMode="signup" />
      </main>
    </div>
  )
}
