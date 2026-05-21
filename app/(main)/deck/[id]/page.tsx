import { DeckContents, getDeckById } from "@/app/api/decks"

import CardInfo from "@/components/editor/card-info/card-info"
import CardSearch from "@/components/editor/card-search/card-search"
import DeckList from "@/components/editor/deck-list/deck-list"
import TopBar from "@/components/editor/topbar"

import { Separator } from "@/components/ui/separator"
import { EditorProvider } from "@/providers/editor-provider"
import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"

interface Props {
    params: Promise<{ id: string }>
}

export default async function Editor({ params }: Props) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const user = data?.claims

    if (!user) {
        redirect("/signin")
    }

    const { id } = await params

    let initialDeck: {
        id: number
        name: string
        points: number
        createdAt: Date
        updatedAt: Date
        coverId: string | null
    }

    let initialContents: DeckContents

    if (id === "new") {
        initialDeck = {
            id: 0,
            name: "New",
            points: 0,
            coverId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        initialContents = {
            main: [],
            extra: [],
            side: [],
        }
    } else {
        const deckId = parseInt(id, 10)
        if (isNaN(deckId)) {
            notFound()
        }

        const deck = await getDeckById(deckId, user.id)
        if (!deck) {
            notFound()
        }

        const { main, extra, side, ...rest } = deck
        initialDeck = rest
        initialContents = { main, extra, side }
    }

    return (
        <div className="bg-muted flex h-screen flex-col overflow-hidden">
            <EditorProvider
                initialDeck={initialDeck}
                initialContents={initialContents}
            >
                <TopBar />
                <main className="flex flex-1 px-4 min-h-0 overflow-hidden">
                    <div className="bg-background flex flex-1 flex-row gap-0 overflow-hidden rounded-t-2xl border border-b-0 shadow-md">
                        <CardInfo />
                        <Separator
                            orientation="vertical"
                            className="self-stretch"
                        />
                        <DeckList />
                        <Separator
                            orientation="vertical"
                            className="self-stretch"
                        />
                        <CardSearch />
                    </div>
                </main>
            </EditorProvider>
        </div>
    )
}
