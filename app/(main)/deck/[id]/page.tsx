import { getDeckById } from "@/app/api/decks"

import CardInfo from "@/components/editor/card-info/card-info"
import CardSearch from "@/components/editor/card-search/card-search"
import DeckList from "@/components/editor/deck-list/deck-list"
import TopBar from "@/components/editor/topbar"

import { Separator } from "@/components/ui/separator"
import { EditorProvider } from "@/providers/editor-provider"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ id: string }>
}

export default async function Editor({ params }: Props) {
    const { id } = await params
    let deck

    if (id === "new") {
        deck = {
            id: 0,
            name: "New Deck",
            main_deck: [],
            extra_deck: [],
            side_deck: [],
            points: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    } else {
        const deckId = parseInt(id, 10)
        if (Number.isNaN(deckId)) {
            notFound()
        }

        deck = await getDeckById(deckId)
        if (!deck) {
            notFound()
        }
    }

    return (
        <div className="bg-muted flex min-h-screen flex-col">
            <EditorProvider initialDeck={deck}>
                <TopBar />
                <main className="flex flex-1 overflow-hidden px-4">
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
