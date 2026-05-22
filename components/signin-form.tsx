"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useProgress } from "@bprogress/next"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { signInSchema, type SignInSchema } from "@/lib/validation/signin"
import { signIn } from "@/app/api/auth"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export function SignInForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const { start, stop } = useProgress()

    const onSubmit = async (values: SignInSchema) => {
        setIsPending(true)
        start()
        try {
            const formData = new FormData()
            formData.set("email", values.email)
            formData.set("password", values.password)

            const response = await signIn(formData)

            if (response.success) {
                start()
                toast.success("Đăng nhập thành công!")
                router.push("/")
            } else {
                toast.error("Email hoặc mật khẩu không chính xác.")
            }
        } catch (error) {
            console.error(error)
            toast.error("Đã xảy ra lỗi khi đăng nhập.")
        } finally {
            setIsPending(false)
            stop()
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">
                        Duelists Unite
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
