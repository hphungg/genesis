"use client"

import { useMemo, useState, useTransition } from "react"
import { useSetEditor } from "@/providers/set-provider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { searchCardsByName } from "@/app/api/cards"
import { Card } from "@/db/schema"
import CardSearchBar from "./card-search/searchbar"
import CardSearchResults from "./card-search/search-results"

export default function SetEditorCardSearch() {
    const { set, addCard } = useSetEditor()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Card[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [isPending, startTransition] = useTransition()

    const inSetIds = useMemo(() => new Set(set.cards.map((c) => c.id)), [set.cards])

    const handleSearch = () => {
        if (!query.trim()) return
        startTransition(async () => {
            const found = await searchCardsByName(query.trim())
            setResults(found as Card[])
            setHasSearched(true)
        })
    }

    return (
        <div className="flex flex-col h-full flex-1 min-w-0 gap-3 p-4">
            <CardSearchBar
                query={query}
                isPending={isPending}
                onChange={setQuery}
                onSearch={handleSearch}
            />

            <ScrollArea className="flex-1 min-h-0">
                {isPending && (
                    <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                        Searching...
                    </div>
                )}

                {!isPending && hasSearched && results.length === 0 && (
                    <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                        No cards found for &quot;{query}&quot;
                    </div>
                )}

                {!isPending && results.length > 0 && (
                    <CardSearchResults
                        results={results}
                        inSetIds={inSetIds}
                        onAdd={(card) => addCard(card as any)}
                    />
                )}
            </ScrollArea>
        </div>
    )
}
