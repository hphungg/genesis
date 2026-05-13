import { getDeckById } from "@/app/api/editor"

import CardInfo from "@/components/editor/card-info/card-info"
import CardSearch from "@/components/editor/card-search/card-search"
import DeckList from "@/components/editor/deck-list/deck-list"
import TopBar from "@/components/editor/topbar"

import { Separator } from "@/components/ui/separator"
import { EditorProvider } from "@/providers/editor-provider"

export default async function Editor() {
    const deck = await getDeckById("")

    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <EditorProvider initialDeck={deck}>
                <TopBar />
                <main className="flex flex-1 overflow-hidden px-4">
                    <div className="flex flex-1 bg-background rounded-t-2xl shadow-md border border-b-0 flex-row gap-0 overflow-hidden">
                        <CardInfo />
                        <Separator orientation="vertical" className="self-stretch" />
                        <DeckList />
                        <Separator orientation="vertical" className="self-stretch" />
                        <CardSearch />
                    </div>
                </main>
            </EditorProvider>
        </div>
    )
}