"use client"

import { signOut } from "@/app/api/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useTransition } from "react"

interface TopBarProps {
    displayName?: string
}

export default function TopBar({ displayName }: TopBarProps) {
    const searchParams = useSearchParams()
    const currentView = searchParams.get("view") || "sets"
    const [isPending, startTransition] = useTransition()

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
                        {currentView === "decks" ? "Sets" : "My Decks"}
                    </Link>
                </Button>
                <Button
                    variant="destructive"
                    className="border-none shadow-md"
                    disabled={isPending}
                    onClick={() => startTransition(() => signOut())}
                >
                    {isPending ? "Signing out…" : "Sign Out"}
                </Button>
            </div>
        </header>
    )
}
