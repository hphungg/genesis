"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { deleteDeck } from "@/app/api/decks"
import type { DeckSummary } from "@/app/api/decks"
import { DeckCard } from "@/components/lobby/views/decks/deck-card"
import { DeleteDeckDialog } from "@/components/lobby/views/decks/delete-deck-dialog"
import { Button } from "@/components/ui/button"

export default function DecksView({
    initialDecks,
}: {
    initialDecks: DeckSummary[]
}) {
    const [decks, setDecks] = useState(initialDecks)
    const [deckToDelete, setDeckToDelete] = useState<DeckSummary | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleDelete = (deck: DeckSummary) => setDeckToDelete(deck)

    const handleConfirmDelete = () => {
        if (!deckToDelete) return

        startTransition(async () => {
            const result = await deleteDeck(deckToDelete.id)

            if (result.success) {
                setDecks((prev) =>
                    prev.filter((deck) => deck.id !== deckToDelete.id),
                )
                setDeckToDelete(null)
                toast.success("Deck deleted")
            } else {
                toast.error(result.error ?? "Failed to delete deck")
            }
        })
    }

    const handleExport = () => {
        toast.message("Export is coming soon")
    }

    return (
        <div className="flex w-full flex-1 flex-col p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">My Decks</h2>
                <Button asChild>
                    <Link href="/deck/new">Create New Deck</Link>
                </Button>
            </div>

            {decks.length === 0 ? (
                <div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
                    No decks yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {decks.map((deck) => (
                        <DeckCard
                            key={deck.id}
                            deck={deck}
                            onDelete={() => handleDelete(deck)}
                            onExport={handleExport}
                        />
                    ))}
                </div>
            )}

            <DeleteDeckDialog
                deckName={deckToDelete?.name}
                open={!!deckToDelete}
                isDeleting={isPending}
                onCancel={() => setDeckToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}
