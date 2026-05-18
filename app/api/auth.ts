"use server"

import { createClient } from "@/lib/supabase/server"
import { signInSchema } from "@/lib/validation/signin"
import { signUpSchema } from "@/lib/validation/signup"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
    const raw = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const parsed = signInSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.errors[0].message }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword(parsed.data)

    if (error) {
        return { error: error.message }
    }

    redirect("/")
}

export async function signUp(formData: FormData) {
    const raw = {
        email: formData.get("email") as string,
        displayName: formData.get("displayName") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    }

    const parsed = signUpSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.errors[0].message }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
            data: {
                display_name: parsed.data.displayName,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    redirect("/")
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()

    redirect("/signin")
}
