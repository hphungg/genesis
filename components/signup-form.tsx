"use client"

import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { signUpSchema, type SignUpSchema } from "@/lib/validation/signup"
import { useTransition } from "react"
import { signUp } from "@/app/api/auth"
import { useRouter } from "next/navigation"

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            displayName: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (values: SignUpSchema) => {
        startTransition(async () => {
            const formData = new FormData()
            formData.set("email", values.email)
            formData.set("displayName", values.displayName)
            formData.set("password", values.password)
            formData.set("confirmPassword", values.confirmPassword)

            const response = await signUp(formData)

            if (response.success) {
                toast.success("Signed up successfully!")
                router.push("/")
                return
            } else {
                toast.error(`Failed to sign up: ${response.error}`)
                return
            }
        })
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create new account, Duelist!</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                        {fieldState.error && (
                                            <FieldError>
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="displayName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="displayName">
                                            Display name
                                        </FieldLabel>
                                        <Input
                                            id="displayName"
                                            type="text"
                                            placeholder="Enter your display name"
                                            {...field}
                                        />
                                        {fieldState.error && (
                                            <FieldError>
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                        {fieldState.error && (
                                            <FieldError>
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">
                                            Confirm password
                                        </FieldLabel>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            {...field}
                                        />
                                        {fieldState.error && (
                                            <FieldError>
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    {isPending
                                        ? "Creating account…"
                                        : "Create account"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <a href="/signin">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
