import { useState } from "react"
import {
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  SparkleIcon,
  UserIcon,
} from "@phosphor-icons/react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="relative mb-20 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/60 to-background" />
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-3 gap-1.5 px-3 py-1 text-xs">
            <SparkleIcon weight="fill" className="size-3.5 text-primary" />
            <span>Welcome to Workasana</span>
          </Badge>

          <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
            <CheckCircleIcon weight="duotone" className="size-7" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create an <span className="text-primary">account</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Where teams turn plans into finished work
          </p>
        </div>

        <Card className="border-border/80 shadow-md">
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <UserIcon
                    weight="duotone"
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Alex Johnson"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <EnvelopeSimpleIcon
                    weight="duotone"
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockKeyIcon
                    weight="duotone"
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pr-9 pl-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeSlashIcon weight="duotone" className="size-4" />
                    ) : (
                      <EyeIcon weight="duotone" className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                size="lg"
                type="button"
                className="w-full gap-2 font-semibold"
              >
                <span>Sign Up</span>
                <ArrowRightIcon weight="bold" className="size-4" />
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary transition-colors hover:underline"
              >
                Sign in
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <a
                href="#terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
