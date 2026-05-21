"use client"

import { useSearchParams } from "next/navigation"
import SetsView from "@/components/lobby/views/sets-view"
import DecksView from "@/components/lobby/views/decks-view"
import type { DeckSummary } from "@/app/api/decks"
import { Sets } from "@/db/schema"

export default function LobbyView({
    initialSets,
    initialDecks,
    userId,
}: {
    initialSets: Sets[]
    initialDecks: DeckSummary[]
    userId: string
}) {
    const searchParams = useSearchParams()
    const currentView = searchParams.get("view") || "sets"

    if (currentView === "decks") {
        return <DecksView initialDecks={initialDecks} userId={userId} />
    }

    return <SetsView initialSets={initialSets} />
}

