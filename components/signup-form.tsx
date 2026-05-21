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
import Link from "next/link"
import { useProgress } from "@bprogress/next"

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { start, stop } = useProgress()
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
                start()
                toast.success("Đăng ký thành công!")
                router.push("/")
                stop()
                return
            } else {
                toast.error("Đăng ký thất bại")
                return
            }
        })
    }

    return (
        <div className={cn("flex flex-col gap-4", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">
                        Duelist Unite
                    </CardTitle>
                    <CardDescription>
                        Điền đầy đủ thông tin để tạo tài khoản mới
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
                                            placeholder="Nhập email của bạn"
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
                                            Tên hiển thị
                                        </FieldLabel>
                                        <Input
                                            id="displayName"
                                            type="text"
                                            placeholder="Nhập tên hiển thị"
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
                                            Mật khẩu
                                        </FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Nhập mật khẩu"
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
                                            Nhập lại mật khẩu
                                        </FieldLabel>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Nhập lại mật khẩu"
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
                                    {isPending ? "Đang tạo..." : "Đăng ký"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Đã có tài khoản?{" "}
                                    <Link href="/signin">Đăng nhập ngay</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
