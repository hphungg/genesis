import * as z from "zod"

export const signInSchema = z.object({
    email: z
        .string()
        .email("Enter a valid email address")
        .min(1, "Email is required"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
})

export type SignInSchema = z.infer<typeof signInSchema>
