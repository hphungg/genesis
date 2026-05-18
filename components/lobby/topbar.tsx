"use client"

import { signOut } from "@/app/api/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

interface TopBarProps {
    displayName?: string
}

export default function TopBar({ displayName }: TopBarProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentView = searchParams.get("view") || "sets"
    const [isPending, startTransition] = useTransition()

    const handleSignOut = () => {
        startTransition(async () => {
            const result = await signOut()

            if (result.success) {
                toast.success("Signed out successfully!")
                router.push("/signin")
            } else {
                toast.error(`Failed to sign out: ${result.error}`)
            }
        })
    }

    return (
        <header className="relative flex w-full items-center justify-between px-4 py-4">
            <Button variant="outline">Format Rules</Button>

            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                {displayName}&apos;s lobby
            </h1>

            <div className="flex items-center gap-4">
                <Button asChild className="border-none shadow-md">
                    <Link
                        href={
                            currentView === "decks"
                                ? "?view=sets"
                                : "?view=decks"
                        }
                    >
                        {currentView === "decks" ? "Back to Lobby" : "My Decks"}
                    </Link>
                </Button>
                <Button
                    variant="destructive"
                    className="border-none shadow-md"
                    disabled={isPending}
                    onClick={handleSignOut}
                >
                    {isPending ? "Signing out..." : "Sign Out"}
                </Button>
            </div>
        </header>
    )
}
