import {
   CheckCircleIcon,
   EyeIcon,
   EyeSlashIcon,
   LockKeyIcon,
} from "@phosphor-icons/react"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { getStrength } from "@/utilis/getStrength"
import { useState, type Dispatch, type SetStateAction } from "react"
import { cn } from "@/lib/utils"
import getRequirements from "@/utilis/getRequirements"
import { useMain } from "@/context/mainContext"

interface PasswordFieldsProps {

}
export default function PasswordFields({

}: PasswordFieldsProps) {
   const { validateField, setError, isPasswordInvalid, setForm } = useMain()
   const [password, setPassword] = useState("")
   const [showPassword, setShowPassword] = useState(false)
   const [confirmPassword, setConfirmPassword] = useState("")
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const requirements = getRequirements(password)
   const passedCount = requirements.filter((r) => r.met).length
   const strength = getStrength(passedCount, password)
   return (
      <div className="space-y-4">
         <Field data-invalid={isPasswordInvalid}>
            <FieldLabel htmlFor="password">Enter new password</FieldLabel>
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
                  value={password}
                  onChange={(e) => {
                     const error = validateField("/password", e.target.value)
                     setError((prev) => ({ ...prev, password: error }))
                     setPassword(e.target.value)
                     if (confirmPassword !== e.target.value) {
                        setError((prev) => ({ ...prev, password: "Confirm password should match" }))
                     }
                  }}
                  aria-invalid={isPasswordInvalid}
               />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
               >
                  {showPassword ? (
                     <EyeSlashIcon weight="duotone" className="size-4" />
                  ) : (
                     <EyeIcon weight="duotone" className="size-4" />
                  )}
               </button>
            </div>
         </Field>

         <div className="space-y-2.5 pt-0.5">
            <div className="flex items-center justify-between text-xs">
               <span className="text-muted-foreground">Password strength</span>
               <span
                  className={cn("font-medium transition-colors", strength.textColor)}
               >
                  {strength.label || "Too weak"}
               </span>
            </div>

            <div
               className="grid grid-cols-4 gap-1.5"
               role="progressbar"
               aria-valuenow={(strength.bars / 4) * 100}
               aria-valuemin={0}
               aria-valuemax={100}
               aria-label="Password strength"
            >
               {[1, 2, 3, 4].map((index) => (
                  <div
                     key={index}
                     className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index <= strength.bars ? strength.color : "bg-muted"
                     )}
                  />
               ))}
            </div>

            <div className="rounded-lg border bg-muted/20 p-3">
               <p className="mb-2 text-[11px] font-medium text-muted-foreground">
                  Your password must contain:
               </p>
               <ul
                  className="space-y-1.5 text-xs"
                  aria-label="Password requirements"
               >
                  {requirements.map((req) => (
                     <li
                        key={req.id}
                        className={cn(
                           "flex items-center gap-2 transition-colors",
                           req.met
                              ? "font-medium text-foreground"
                              : "text-muted-foreground"
                        )}
                     >
                        <CheckCircleIcon
                           weight={req.met ? "fill" : "regular"}
                           className={cn(
                              "size-3.5 shrink-0 transition-colors",
                              req.met ? "text-emerald-500" : "text-muted-foreground/35"
                           )}
                        />
                        <span>{req.label}</span>
                     </li>
                  ))}
               </ul>
            </div>
         </div>

         <Field data-invalid={isPasswordInvalid}>
            <FieldLabel htmlFor="confirmPassword">Re-enter new password</FieldLabel>
            <div className="relative">
               <LockKeyIcon
                  weight="duotone"
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
               />
               <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-9 pl-9"
                  value={confirmPassword}
                  aria-invalid={isPasswordInvalid}
                  onChange={(e) => {
                     const error = validateField("/password", e.target.value)
                     setError((prev) => ({ ...prev, password: error }))
                     setConfirmPassword(e.target.value)
                     if (password === e.target.value)
                        setForm((prev) => ({
                           ...prev,
                           password: e.target.value,
                        }))
                  }}
               />
               <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
               >
                  {showConfirmPassword ? (
                     <EyeSlashIcon weight="duotone" className="size-4" />
                  ) : (
                     <EyeIcon weight="duotone" className="size-4" />
                  )}
               </button>
            </div>
            {confirmPassword.length > 0 && (
               <p
                  className={cn(
                     "pt-1 text-xs font-medium",
                     password === confirmPassword
                        ? "text-emerald-500"
                        : "text-destructive"
                  )}
               >
                  {password === confirmPassword
                     ? "Passwords match"
                     : "Passwords do not match"}
               </p>
            )}
         </Field>
      </div>
   )
}
