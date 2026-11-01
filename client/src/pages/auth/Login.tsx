import { useEffect, useState, type ChangeEvent } from "react"
import {
   ArrowRightIcon,
   CheckCircleIcon,
   EnvelopeSimpleIcon,
   EyeIcon,
   EyeSlashIcon,
   LockKeyIcon,
   SparkleIcon,
   WarningCircleIcon,
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import { useLoginAuth } from "@/hooks/useUser"
import AlertDialog from "@/components/AlertDialog"
import { Field, FieldLabel } from "@/components/ui/field"

export interface Alert {
   type: "success" | "error" | "loading" | ""
   message?: string
}

interface ErrorMessage {
   email?: string
   password?: string
}
export default function LoginPage() {
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)
   const [open, setOpen] = useState(false)
   const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
      email: "",
      password: "",
   })
   const [alert, setAlert] = useState<Alert>({ type: "", message: "" })
   const { mutate: login, isPending, isSuccess } = useLoginAuth()

   useEffect(() => {
      if (isPending && (!errorMessage.email || !errorMessage.password)) {
         setOpen(true)
         setAlert({ type: "loading" })
      }

      if (isSuccess) {
         setTimeout(() => {
            navigate("/dashboard")
         }, 1500)
      }
   }, [isPending, isSuccess])

   function validateField(name: string, value: string) {
      if (name === "email") {
         if (!value.trim()) return "Email is required"
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Please enter a valid email address"
      } else {
         if (!value.trim()) return "Password is required"
      }
   }

   function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const { value, name } = e.target
      if (errorMessage.email || errorMessage.password) {
         const message = validateField(name, value)
         setErrorMessage((prev) => ({ ...prev, [name]: message ?? "" }))
      }
   }

   function handleSubmit(formData: FormData) {
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      const emailError = validateField("email", email)
      const passwordError = validateField("password", password)

      setErrorMessage({
         email: emailError,
         password: passwordError,
      })
      login(
         { email, password },
         {
            onSuccess: (data) => {
               setOpen(true)
               setAlert({ type: "success", message: data?.message })
            },
            onError: (err) => {
               setOpen(false)
               if (err.message.includes("Invalid email or password"))
                  setErrorMessage((prev) => ({ ...prev, password: err.message }))

               if (err.message.includes("Cannot find account"))
                  setErrorMessage((prev) => ({ ...prev, password: err.message }))
            },
         }
      )
   }

   const isEmailInvalid = Boolean(errorMessage.email)
   const isPasswordInvalid = Boolean(errorMessage.password)

   return (
      <main className="relative mb-20 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
         <AlertDialog open={open} setOpen={setOpen} alert={alert} />
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
                  Welcome <span className="text-primary">back</span>
               </h1>
               <p className="mt-1 text-sm text-muted-foreground">
                  Where teams turn plans into finished work
               </p>
            </div>

            <Card className="border-border/80 shadow-md">
               <CardContent className="space-y-4">
                  <form className="space-y-4" action={handleSubmit}>
                     <Field data-invalid={isEmailInvalid}>
                        <FieldLabel htmlFor="email">Email address</FieldLabel>
                        <div className="relative">
                           <EnvelopeSimpleIcon
                              weight="duotone"
                              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                           />
                           <Input
                              id="email"
                              type="text"
                              name="email"
                              placeholder="name@company.com"
                              className="pl-9"
                              onChange={handleChange}
                              aria-invalid={isEmailInvalid}
                           />
                        </div>
                     </Field>

                     <Field data-invalid={isPasswordInvalid}>
                        <div className="flex items-center justify-between">
                           <Label htmlFor="password">Password</Label>
                           <a
                              href="#forgot-password"
                              className="text-xs font-medium text-primary hover:underline"
                           >
                              Forgot password?
                           </a>
                        </div>
                        <div className="relative">
                           <LockKeyIcon
                              weight="duotone"
                              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                           />
                           <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pr-9 pl-9"
                              onChange={handleChange}
                              aria-invalid={isPasswordInvalid}
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
                     </Field>

                     <div className="flex items-center gap-2">
                        <Checkbox id="remember-me" />
                        <Label
                           htmlFor="remember-me"
                           className="cursor-pointer text-sm font-normal text-muted-foreground"
                        >
                           Remember me on this device
                        </Label>
                     </div>

                     {isEmailInvalid && (
                        <div className="grid grid-cols-30 items-center text-destructive">
                           <WarningCircleIcon weight="bold" size={16} />
                           <p className="col-span-29 px-2 font-medium text-wrap">
                              {errorMessage.email}
                           </p>
                        </div>
                     )}
                     {isPasswordInvalid && (
                        <div className="grid grid-cols-30 items-center text-destructive">
                           <WarningCircleIcon weight="bold" size={16} />
                           <p className="col-span-29 px-2 font-medium text-wrap">
                              {errorMessage.password}
                           </p>
                        </div>
                     )}

                     <Button
                        size="lg"
                        type="submit"
                        className="w-full gap-2 font-semibold"
                     >
                        <span>Sign In</span>
                        <ArrowRightIcon weight="bold" className="size-4" />
                     </Button>
                  </form>
               </CardContent>

               <CardFooter className="flex flex-col gap-3 border-t pt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                     Don&apos;t have an account?{" "}
                     <Link
                        to="/signup"
                        className="font-semibold text-primary transition-colors hover:underline"
                     >
                        Create an account
                     </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">
                     By signing in, you agree to our{" "}
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
