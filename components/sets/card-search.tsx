"use client"

import { useMemo, useState, useTransition } from "react"
import { searchCardsByName } from "@/app/api/cards"
import { Cards } from "@/db/schema"

import { useSetEditor } from "@/providers/set-provider"
import CardSearchResults from "./card-search/search-results"
import CardSearchBar from "./card-search/searchbar"

import { ScrollArea } from "@/components/ui/scroll-area"

export default function SetEditorCardSearch() {
    const { set, addCard } = useSetEditor()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Cards[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [isPending, startTransition] = useTransition()

    const inSetIds = useMemo(
        () => new Set(set.cards.map((c) => c.id)),
        [set.cards],
    )

    const handleSearch = () => {
        if (!query.trim()) return
        startTransition(async () => {
            const found = await searchCardsByName(query.trim())
            setResults(found as Cards[])
            setHasSearched(true)
        })
    }

    return (
        <div className="flex h-full min-w-0 flex-1 flex-col gap-3 p-4">
            <CardSearchBar
                query={query}
                isPending={isPending}
                onChange={setQuery}
                onSearch={handleSearch}
            />

            <ScrollArea className="no-scrollbar min-h-0 flex-1">
                {isPending && (
                    <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                        Đang tìm kiếm...
                    </div>
                )}

                {!isPending && hasSearched && results.length === 0 && (
                    <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                        Không tìm thấy kết quả nào cho &quot;{query}&quot;
                    </div>
                )}

                {!isPending && results.length > 0 && (
                    <CardSearchResults
                        results={results}
                        inSetIds={inSetIds}
                        onAdd={addCard}
                    />
                )}
            </ScrollArea>
        </div>
    )
}
