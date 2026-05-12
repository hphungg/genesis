"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowsDownUpIcon, FloppyDiskIcon } from "@phosphor-icons/react"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function TopBar() {
    const searchParams = useSearchParams()
    const currentView = searchParams.get("view") || "sets"

    return (
        <header className="relative flex w-full items-center justify-between px-4 py-4">
            <Button variant="outline">
                Format Rules
            </Button>

            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">Langtucodon's lobby</h1>

            <div className="flex items-center gap-4">
                <Button asChild className="shadow-md border-none">
                    <Link href={currentView === "decks" ? "?view=sets" : "?view=decks"}>
                        {currentView === "decks" ? "Sets" : "My Decks"}
                    </Link>
                </Button>
                <Button variant="destructive" className="shadow-md border-none">
                    Sign Out
                </Button>
            </div>
        </header>
    )
}