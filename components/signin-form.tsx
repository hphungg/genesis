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
import { signInSchema, type SignInSchema } from "@/lib/validation/signin"
import { useTransition } from "react"
import { signIn } from "@/app/api/auth"
import { useRouter } from "next/navigation"
import { useProgress } from "@bprogress/next"
import Link from "next/link"

export function SignInForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const { start, stop } = useProgress()

    const onSubmit = (values: SignInSchema) => {
        startTransition(async () => {
            const formData = new FormData()
            formData.set("email", values.email)
            formData.set("password", values.password)

            const response = await signIn(formData)

            if (response.success) {
                start()
                toast.success("Đăng nhập thành công!")
                router.push("/")
                stop()
                return
            } else {
                toast.error("Email hoặc mật khẩu không chính xác.")
                return
            }
        })
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">
                        Duelist Unite
                    </CardTitle>
                    <CardDescription>Đăng nhập vào hệ thống</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Nhập email của bạn"
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">
                                            Mật khẩu
                                        </FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Nhập mật khẩu của bạn"
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Field>
                                <Button type="submit" disabled={isPending}>
                                    {isPending
                                        ? "Đang đăng nhập..."
                                        : "Đăng nhập"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Chưa có tài khoản?{" "}
                                    <Link href="/signup">Đăng ký ngay</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
