"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import DeckSection from "./deck-section"

export default function DeckList() {
    return (
        <div className="flex flex-5 min-w-0 flex-col overflow-hidden p-4">
            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-4 p-1">
                    <DeckSection title="Main Deck" count={0} rows={5} />
                    <DeckSection title="Extra Deck" count={0} rows={1} />
                    <DeckSection title="Side Deck" count={0} rows={1} />
                </div>
            </ScrollArea>
        </div>
    )
}
