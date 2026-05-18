import * as z from "zod"

export const signUpSchema = z
    .object({
        email: z
            .string()
            .email("Enter a valid email address")
            .min(1, "Email is required"),
        displayName: z
            .string()
            .min(1, "Display name is required")
            .max(50, "Display name must be less than 50 characters"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z.string().min(1, "You have to confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export type SignUpSchema = z.infer<typeof signUpSchema>
