import { useState, type ChangeEvent } from "react"
import {
   ArrowRightIcon,
   CheckCircleIcon,
   EnvelopeSimpleIcon,
   SparkleIcon,
   UserIcon,
   WarningCircleIcon,
} from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignup } from "@/hooks/useUser"
import { Field } from "@/components/ui/field"
import PasswordFields from "@/components/auth/PasswordFields"
import { useMain } from "@/context/mainContext"
import AlertDialog from "@/components/AlertDialog"

export default function SignupPage() {
   const {
      validateField,
      form,
      setError,
      error: errorMessage,
      handleChange,
      isNameInvalid,
      isEmailInvalid,
      isPasswordInvalid,
      setAlert,
   } = useMain()
   const { mutate: signup } = useSignup()
   const navigate = useNavigate()

   function handleSubmit() {
      if (!errorMessage.email && !errorMessage.password && !errorMessage.name) {
         setAlert({ type: "loading", open: true })
      }
      const name = validateField("name", form.name)
      const email = validateField("email", form.email)
      const password = validateField("password", form.password)

      setError({
         name,
         email,
         password,
      })
      const payload = form
      signup(payload, {
         onSuccess: (data: any) => {
            setAlert({ open: true, type: "success", message: data?.message })
            setTimeout(() => {
               navigate("/login")
            }, 1500)
         },
         onError: (err) => {
            setAlert({ open: false, type: "error" })
            if (err.message.includes("Email already"))
               setError((prev) => ({ ...prev, email: err.message }))
         },
      })
   }

   return (
      <main className="relative mb-20 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
         <AlertDialog />

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
               <CardContent className="space-y-0">
                  <form action={handleSubmit}>
                     <div className="space-y-4">
                        <Field data-invalid={isNameInvalid}>
                           <Label htmlFor="name">Full name</Label>
                           <div className="relative">
                              <UserIcon
                                 weight="duotone"
                                 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                 id="name"
                                 name="name"
                                 type="text"
                                 placeholder="Alex Johnson"
                                 className="pl-9"
                                 value={form.name ?? ""}
                                 onChange={handleChange}
                                 aria-invalid={isNameInvalid}
                              />
                           </div>
                        </Field>

                        <Field data-invalid={isEmailInvalid}>
                           <Label htmlFor="email">Email address</Label>
                           <div className="relative">
                              <EnvelopeSimpleIcon
                                 weight="duotone"
                                 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                 id="email"
                                 type="email"
                                 name="email"
                                 placeholder="name@company.com"
                                 className="pl-9"
                                 value={form.email ?? ""}
                                 onChange={handleChange}
                                 aria-invalid={isEmailInvalid}
                              />
                           </div>
                        </Field>

                        <PasswordFields />

                        <Button
                           size="lg"
                           type="submit"
                           className="w-full gap-2 font-semibold"
                        >
                           <span>Sign Up</span>
                           <ArrowRightIcon weight="bold" className="size-4" />
                        </Button>
                     </div>
                  </form>
                  {isNameInvalid && (
                     <div className="mb-0 grid grid-cols-30 items-center text-destructive">
                        <WarningCircleIcon weight="bold" size={16} />
                        <p className="col-span-29 px-2 font-medium text-wrap">
                           {errorMessage.name}
                        </p>
                     </div>
                  )}

                  {isEmailInvalid && (
                     <div className="mb-0 grid grid-cols-30 items-center text-destructive">
                        <WarningCircleIcon weight="bold" size={16} />
                        <p className="col-span-29 px-2 font-medium text-wrap">
                           {errorMessage.email}
                        </p>
                     </div>
                  )}
                  {isPasswordInvalid && (
                     <div className="mb-0 grid grid-cols-30 items-center text-destructive">
                        <WarningCircleIcon weight="bold" size={16} />
                        <p className="col-span-29 px-2 font-medium text-wrap">
                           {errorMessage.password}
                        </p>
                     </div>
                  )}
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
