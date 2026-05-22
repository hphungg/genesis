"use client"

import DeckSection from "./deck-section"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useEditor } from "@/providers/editor-provider"

export default function DeckList() {
    const { contents } = useEditor()

    return (
        <div className="no-scrollbar mx-auto flex w-full min-w-0 flex-2 flex-col overflow-scroll p-2">
            <ScrollArea className="no-scrollbar flex-1">
                <div className="flex flex-col gap-1 p-1">
                    <DeckSection
                        title="Main Deck"
                        section="main"
                        cardList={contents.main}
                        rows={4}
                        cols={10}
                        expandedCols={15}
                        expandThreshold={40}
                    />
                    <DeckSection
                        title="Extra Deck"
                        section="extra"
                        cardList={contents.extra}
                        rows={1}
                        cols={10}
                        expandedCols={15}
                        expandThreshold={10}
                    />
                    <DeckSection
                        title="Side Deck"
                        section="side"
                        cardList={contents.side}
                        rows={1}
                        cols={10}
                        expandedCols={15}
                        expandThreshold={10}
                    />
                </div>
            </ScrollArea>
        </div>
    )
}
