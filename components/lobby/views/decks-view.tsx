"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useProgress } from "@bprogress/next"
import { toast } from "sonner"
import type { DeckSummary } from "@/app/api/decks"
import { deleteDeck, exportDeck } from "@/app/api/decks"

import { ConfirmExportDialog } from "@/components/lobby/views/decks/confirm-export-dialog"
import { DeleteDeckDialog } from "@/components/lobby/views/decks/delete-deck-dialog"
import { DeckCard } from "@/components/lobby/views/decks/deck-card"
import { Button } from "@/components/ui/button"

export default function DecksView({
    initialDecks,
}: {
    initialDecks: DeckSummary[]
}) {
    const [decks, setDecks] = useState(initialDecks)
    const [deckToDelete, setDeckToDelete] = useState<DeckSummary | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const { start, stop } = useProgress()
    const router = useRouter()

    useEffect(() => {
        setDecks(initialDecks)
    }, [initialDecks])

    const handleDelete = (deck: DeckSummary) => setDeckToDelete(deck)

    const handleConfirmDelete = async () => {
        if (!deckToDelete) return

        setIsDeleting(true)
        start()
        try {
            const result = await deleteDeck(deckToDelete.id)

            if (result.success) {
                setDecks((prev) =>
                    prev.filter((deck) => deck.id !== deckToDelete.id),
                )
                setDeckToDelete(null)
                toast.success("Xóa bộ bài thành công!")
                router.refresh()
            } else {
                toast.error(result.error ?? "Xóa bộ bài thất bại.")
            }
        } catch (error) {
            console.error(error)
            toast.error("Đã xảy ra lỗi khi xóa bộ bài.")
        } finally {
            setIsDeleting(false)
            stop()
        }
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
            const fileContent = await exportDeck(deck.id)

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

    const handleCreateNewDeck = () => {
        start()
        router.push(`/deck/new`)
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Bộ bài của tôi</h2>
                <Button onClick={handleCreateNewDeck}>Tạo bộ bài mới</Button>
            </div>
            <div className="no-scrollbar flex-1 overflow-y-auto">
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
                isDeleting={isDeleting}
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
