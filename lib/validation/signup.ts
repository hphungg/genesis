import * as z from "zod"

export const signUpSchema = z
    .object({
        email: z
            .string()
            .email("Email không hợp lệ")
            .min(1, "Bạn phải nhập email"),
        displayName: z
            .string()
            .min(1, "Bạn chưa đặt tên hiển thị")
            .max(50, "Tên hiển thị không được dài hơn 50 ký tự"),
        password: z
            .string()
            .min(1, "Bạn phải nhập mật khẩu")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string().min(1, "Hãy xác nhận mật khẩu của bạn"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khảu không khớp",
        path: ["confirmPassword"],
    })

export type SignUpSchema = z.infer<typeof signUpSchema>
