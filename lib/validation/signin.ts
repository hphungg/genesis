import * as z from "zod"

export const signInSchema = z.object({
    email: z.string().email("Email không hợp lệ").min(1, "Bạn phải nhập email"),
    password: z
        .string()
        .min(1, "Bạn phải nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})

export type SignInSchema = z.infer<typeof signInSchema>
