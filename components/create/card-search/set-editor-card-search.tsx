"use client"

import { useState, useTransition } from "react"
import { useSetEditor } from "@/providers/set-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MagnifyingGlassIcon, CheckCircleIcon, PlusCircleIcon } from "@phosphor-icons/react"
import { Card } from "@/types/card"

// Placeholder search — replace with a real API call once the cards API is wired up
async function searchCards(query: string): Promise<Card[]> {
    if (!query.trim()) return []
    // Stub: returns fake cards matching the query prefix so the UI is functional
    return Array.from({ length: 8 }, (_, i) => ({
        id: `${query.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
        name: `${query} ${i + 1}`,
        type: "Monster",
        point: 0,
        set: "",
        effect: "",
        type_1: "Effect",
        atk: 1500 + i * 100,
        def: 1000 + i * 100,
        level: (i % 8) + 1,
    }))
}

export default function SetEditorCardSearch() {
    const { set, addCard } = useSetEditor()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Card[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleSearch = () => {
        startTransition(async () => {
            const found = await searchCards(query)
            setResults(found)
            setHasSearched(true)
        })
    }

    return (
        <div className="flex flex-col h-full flex-1 min-w-0 gap-3 p-4">
            {/* Search bar */}
            <div className="flex flex-col gap-1.5 shrink-0">
                <div className="flex items-center gap-1.5">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search cards by name…"
                        className="flex-1"
                    />
                    <Button onClick={handleSearch} disabled={isPending || !query.trim()}>
                        <MagnifyingGlassIcon />
                        Search
                    </Button>
                </div>
            </div>

            {/* Results */}
            <ScrollArea className="flex-1 min-h-0">
                {isPending && (
                    <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                        Searching…
                    </div>
                )}

                {!isPending && hasSearched && results.length === 0 && (
                    <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                        No cards found for &quot;{query}&quot;
                    </div>
                )}

                {!isPending && !hasSearched && (
                    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-1">
                        <MagnifyingGlassIcon size={24} />
                        <span>Search for cards to add to this set</span>
                    </div>
                )}

                {!isPending && results.length > 0 && (
                    <div className="flex flex-col gap-1 pr-2">
                        {results.map((card) => {
                            const inSet = set.cards.some((c) => c.id === card.id)
                            return (
                                <button
                                    key={card.id}
                                    onClick={() => !inSet && addCard(card)}
                                    disabled={inSet}
                                    className={[
                                        "flex items-center gap-3 rounded-md border px-3 py-2 text-sm text-left w-full transition-colors",
                                        inSet
                                            ? "bg-primary/10 border-primary/30 cursor-default opacity-70"
                                            : "hover:bg-muted/60 cursor-pointer",
                                    ].join(" ")}
                                >
                                    {/* Card art placeholder */}
                                    <div className="w-8 h-11 rounded-sm bg-muted border shrink-0 flex items-center justify-center text-[8px] text-muted-foreground font-medium overflow-hidden">
                                        {card.level ?? "?"}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{card.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {card.type_1}
                                            {card.atk !== undefined && ` · ATK ${card.atk}`}
                                            {card.def !== undefined && ` / DEF ${card.def}`}
                                        </p>
                                    </div>

                                    <span className="shrink-0 text-muted-foreground">
                                        {inSet ? (
                                            <CheckCircleIcon size={18} className="text-primary" weight="fill" />
                                        ) : (
                                            <PlusCircleIcon size={18} />
                                        )}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
