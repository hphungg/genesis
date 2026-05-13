"use client"

import { useSearchParams } from "next/navigation"
import SetsView from "@/components/lobby/views/sets-view"
import DecksView from "@/components/lobby/views/decks-view"
import { Set } from "@/db/schema"

export default function LobbyView({ initialSets }: { initialSets: Set[] }) {
    const searchParams = useSearchParams()
    const currentView = searchParams.get("view") || "sets"

    if (currentView === "decks") {
        return <DecksView />
    }

    return <SetsView initialSets={initialSets} />
}