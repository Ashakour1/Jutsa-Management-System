"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { userService } from "@/services/user.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { LayoutDashboard } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (userService.getToken()) {
      router.replace("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await userService.login({ email, password })
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background lg:flex-row">
      <div className="mesh-bg relative hidden flex-1 flex-col justify-between p-10 text-primary-foreground lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-[hsl(239_84%_38%)]" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 shadow-lg backdrop-blur">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">Justa Admin</p>
            <p className="text-sm text-white/80">Management console</p>
          </div>
        </div>
        <div className="relative z-10 max-w-md space-y-4">
          <p className="text-3xl font-semibold leading-tight tracking-tight">
            Operate with clarity.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Secure access to finance, members, activities, and system settings in one place.
          </p>
        </div>
        <p className="relative z-10 text-xs text-white/50">© {new Date().getFullYear()}</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md border border-border bg-transparent shadow-sm">
          <CardHeader className="space-y-1 border-b border-border pb-6">
            <CardTitle className="text-2xl font-semibold tracking-tight">Sign in</CardTitle>
            <CardDescription>Use your admin email and password to continue.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@organization.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 border-t border-border pt-6">
              <Button type="submit" className="w-full shadow-sm" disabled={loading} size="lg">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
