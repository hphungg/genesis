"use server"

import { Suspense } from "react"
import Loading from "@/app/loading"

import { getAllSet } from "@/app/api/sets"
import { getAllDecks } from "@/app/api/decks"

import TopBar from "@/components/lobby/topbar"
import DecksView from "@/components/lobby/views/decks-view"
import SetsView from "@/components/lobby/views/sets-view"

interface PageProps {
    searchParams: Promise<{ view?: string }>
}

export const dynamic = "force-dynamic"

export default async function Lobby({ searchParams }: PageProps) {
    const { view } = await searchParams
    const currentView = view || "sets"

    return (
        <div className="bg-muted flex min-h-screen flex-col">
            <TopBar />
            <main className="flex flex-1 overflow-hidden px-4">
                <div className="bg-background flex flex-1 flex-row gap-0 overflow-hidden rounded-t-2xl border border-b-0 shadow-md">
                    <Suspense key={currentView} fallback={<Loading />}>
                        <LobbyContent view={currentView} />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

async function LobbyContent({ view }: { view: string }) {
    if (view === "decks") {
        const decks = await getAllDecks()
        return <DecksView initialDecks={decks} />
    }

    const sets = await getAllSet()
    return <SetsView initialSets={sets} />
}
