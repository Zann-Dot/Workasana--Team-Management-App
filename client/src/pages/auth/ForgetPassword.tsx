import { useState } from "react"
import {
   ArrowLeftIcon,
   ArrowRightIcon,
   CheckCircleIcon,
   CheckIcon,
   EnvelopeSimpleIcon,
   SparkleIcon,
   WarningCircleIcon,
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from "react-router"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Stepper from "@/components/auth/Stepper"
import PasswordFields from "@/components/auth/PasswordFields"
import axios from "axios"
import { useResetPassword } from "@/hooks/useUser"
import { useMain } from "@/context/mainContext"

const STEPS = [
   { id: 1, title: "Step 1", label: "Email" },
   { id: 2, title: "Step 2", label: "Password" },
   { id: 3, title: "Step 3", label: "Save" },
]

export default function ForgetPassword() {
   const { setForm, form, error, setError, resetAuthStates } = useMain()
   const [currentStep, setCurrentStep] = useState(1)
   const { mutate: resetPassword } = useResetPassword()

   async function validateEmail() {
      try {
         const res = await axios.post("/api/auth/validate-user", {
            email: form.email,
         })
         return res?.data?.success
      } catch (error) {
         setError((prev) => ({ ...prev, email: "Please provide a valid email." }))
      }
   }

   const handleNext = async () => {
      const isSuccess = await validateEmail()
      if (isSuccess) {
         setError({ email: "" })
         setForm((prev) => ({ ...prev, email: form.email }))
         if (currentStep < STEPS.length) {
            setCurrentStep((prev) => prev + 1)
         }
      }
   }

   const handleSave = async () => {
      const payload = { email: form.email, password: form.password }
      resetPassword(payload, {
         onSuccess: () => {
            resetAuthStates()
            if (currentStep < STEPS.length) {
               setCurrentStep((prev) => prev + 1)
            }
         },
         onError: (err) =>
            setError((prev) => ({ ...prev, password: err.message })),
      })
   }

   const handlePrev = () => {
      if (currentStep > 1) {
         setCurrentStep((prev) => prev - 1)
      }
   }

   return (
      <main className="relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
         <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/60 to-background" />
         <div className="w-full max-w-md">
            <div className="mb-6 flex flex-col items-center text-center">
               <Badge variant="secondary" className="mb-3 gap-1.5 px-3 py-1 text-xs">
                  <SparkleIcon weight="fill" className="size-3.5 text-primary" />
                  <span>Reset your password</span>
               </Badge>
               <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
                  <CheckCircleIcon weight="duotone" className="size-7" />
               </div>

               <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Create a new <span className="text-primary">password</span>
               </h1>
               <p className="mt-1 text-sm text-muted-foreground">
                  Follow the steps to recover access to your account
               </p>
            </div>

            <Card className="border-border/80 shadow-md">
               <CardContent className="space-y-6 pt-6">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                     <nav aria-label="Progress">
                        <Stepper
                           STEPS={STEPS}
                           currentStep={currentStep}
                           setCurrentStep={setCurrentStep}
                        />
                     </nav>

                     <div className="mb-3">
                        {currentStep === 1 && (
                           <Field>
                              <FieldLabel htmlFor="email">Enter email address</FieldLabel>
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
                                    value={form.email}
                                    onChange={(e) =>
                                       setForm((prev) => ({
                                          ...prev,
                                          email: e.target.value,
                                       }))
                                    }
                                 />
                              </div>
                           </Field>
                        )}

                        {currentStep === 2 && <PasswordFields />}

                        {currentStep === 3 && (
                           <div className="flex flex-col items-center justify-center py-6 text-center">
                              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                 <CheckCircleIcon weight="fill" className="size-7" />
                              </div>
                              <h2 className="text-lg font-semibold">
                                 Password updated successfully!
                              </h2>
                              <p className="mt-1 text-xs text-muted-foreground">
                                 You can now use your new password to sign in.
                              </p>
                              <Link to="/login" className="mt-5 w-full">
                                 <Button className="w-full">Proceed to Sign In</Button>
                              </Link>
                           </div>
                        )}
                     </div>
                     {error.email && (
                        <div className="mb-2 flex items-center gap-1 text-destructive">
                           <WarningCircleIcon /> {error.email}
                        </div>
                     )}
                     <div
                        className="flex items-center justify-between gap-2 pt-1"
                        hidden={currentStep === 3}
                     >
                        <Button
                           type="button"
                           variant="outline"
                           size="sm"
                           onClick={handlePrev}
                           hidden={currentStep === 1}
                           className="gap-1.5"
                        >
                           <ArrowLeftIcon weight="bold" className="size-3.5" />
                           <span>Back</span>
                        </Button>

                        {currentStep === STEPS.length - 1 ? (
                           <div className="flex items-center gap-1.5">
                              <Button
                                 type="button"
                                 size="sm"
                                 onClick={handleSave}
                                 className="gap-1.5"
                              >
                                 <span>Save</span>
                                 <CheckIcon weight="bold" className="size-3.5" />
                              </Button>
                           </div>
                        ) : (
                           <Button
                              type="button"
                              size="sm"
                              onClick={handleNext}
                              className="gap-1.5"
                              hidden={currentStep === 3}
                           >
                              <span>Next</span>
                              <ArrowRightIcon weight="bold" className="size-3.5" />
                           </Button>
                        )}
                     </div>
                  </form>
               </CardContent>

               <CardFooter className="flex justify-center border-t py-4">
                  <Link
                     to="/login"
                     className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                     <ArrowLeftIcon weight="bold" className="size-3.5" />
                     <span>Back to login</span>
                  </Link>
               </CardFooter>
            </Card>
         </div>
      </main>
   )
}
