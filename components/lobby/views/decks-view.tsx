"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { deleteDeck, exportDeck } from "@/app/api/decks"
import type { DeckSummary } from "@/app/api/decks"
import { DeckCard } from "@/components/lobby/views/decks/deck-card"
import { DeleteDeckDialog } from "@/components/lobby/views/decks/delete-deck-dialog"
import { ConfirmExportDialog } from "@/components/lobby/views/decks/confirm-export-dialog"
import { Button } from "@/components/ui/button"
import { useProgress } from "@bprogress/next"

export default function DecksView({
    initialDecks,
    userId,
}: {
    initialDecks: DeckSummary[]
    userId: string
}) {
    const [decks, setDecks] = useState(initialDecks)
    const [deckToDelete, setDeckToDelete] = useState<DeckSummary | null>(null)
    const [isPending, startTransition] = useTransition()
    const { start, stop } = useProgress()

    const handleDelete = (deck: DeckSummary) => setDeckToDelete(deck)

    const handleConfirmDelete = () => {
        if (!deckToDelete) return

        start()
        startTransition(async () => {
            const result = await deleteDeck(deckToDelete.id)

            if (result.success) {
                setDecks((prev) =>
                    prev.filter((deck) => deck.id !== deckToDelete.id),
                )
                setDeckToDelete(null)
                toast.success("Xóa bộ bài thành công!")
            } else {
                toast.error(result.error ?? "Xóa bộ bài thất bại.")
            }
        })
        stop()
    }

    const [deckToExport, setDeckToExport] = useState<DeckSummary | null>(null)

    const handleExport = (deck: DeckSummary) => {
        const isValid = (deck.mainCount ?? 0) >= 40 && deck.points <= 100
        if (isValid) {
            executeExport(deck)
        } else {
            setDeckToExport(deck)
        }
    }

    const executeExport = async (deck: DeckSummary) => {
        start()
        try {
            const fileContent = await exportDeck(deck.id, userId)

            const blob = new Blob([fileContent], {
                type: "text/plain;charset=utf-8",
            })
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `${deck.name}.ydk`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error(error)
            toast.error("Đã xảy ra lỗi khi xuất bộ bài.")
        }
        stop()
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Bộ bài của tôi</h2>
                <Button asChild>
                    <Link href="/deck/new">Tạo bộ bài mới</Link>
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {decks.length === 0 ? (
                    <div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
                        Không có bộ bài nào.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {decks.map((deck) => (
                            <DeckCard
                                key={deck.id}
                                deck={deck}
                                onDelete={() => handleDelete(deck)}
                                onExport={() => handleExport(deck)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <DeleteDeckDialog
                deckName={deckToDelete?.name}
                open={!!deckToDelete}
                isDeleting={isPending}
                onCancel={() => setDeckToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
            <ConfirmExportDialog
                deckName={deckToExport?.name}
                open={!!deckToExport}
                onCancel={() => setDeckToExport(null)}
                onConfirm={() => {
                    if (deckToExport) {
                        executeExport(deckToExport)
                        setDeckToExport(null)
                    }
                }}
            />
        </div>
    )
}
