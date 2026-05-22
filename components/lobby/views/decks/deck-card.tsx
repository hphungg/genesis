import Link from "next/link"
import {
    ExportIcon,
    NotePencilIcon,
    TrashIcon,
    WarningIcon,
} from "@phosphor-icons/react"
import type { DeckSummary } from "@/app/api/decks"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DeckCardProps {
    deck: DeckSummary
    onDelete: () => void
    onExport: () => void
}

export function DeckCard({ deck, onDelete, onExport }: DeckCardProps) {
    const isValid = (deck.mainCount ?? 0) >= 40 && deck.points <= 100

    return (
        <div className="bg-card group relative flex aspect-3/2 flex-col overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-xl">
            <div className="bg-muted absolute inset-0">
                {deck.coverId ? (
                    <img
                        src={`https://images.ygoprodeck.com/images/cards_cropped/${deck.coverId}.jpg`}
                        alt={deck.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="from-primary/20 to-primary/5 h-full w-full bg-linear-to-br opacity-50" />
                )}
            </div>

            {!isValid && (
                <div className="absolute top-3 left-3 z-20">
                    <div
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white shadow-md backdrop-blur-xs"
                        title="Deck is invalid: main deck must have >= 40 cards and total points <= 100"
                    >
                        <WarningIcon className="h-4.5 w-4.5" />
                    </div>
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-2 bg-linear-to-t from-black via-black/90 to-transparent p-3 pt-8">
                <h3 className="w-full truncate text-xl font-bold text-white">
                    {deck.name}
                </h3>
                <div className="flex flex-row gap-2">
                    <Badge className="border-white bg-black px-2 py-0.5 text-xs font-semibold tracking-wide uppercase shadow-sm">
                        {deck.points} points
                    </Badge>
                    <Badge className="border-white bg-black px-2 py-0.5 text-xs font-semibold tracking-wide uppercase shadow-sm">
                        {deck.mainCount} cards
                    </Badge>
                </div>

                <div className="z-20 flex w-full items-center justify-between gap-1.5">
                    <Button
                        size="xs"
                        variant="secondary"
                        asChild
                        className="flex-1 text-xs"
                    >
                        <Link href={`/deck/${deck.id}`}>
                            <NotePencilIcon />
                            Sửa
                        </Link>
                    </Button>
                    <Button
                        size="xs"
                        variant="outline"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}
                        className="flex-1 border-red-500 text-xs text-red-500 hover:bg-red-200 hover:text-red-500"
                    >
                        <TrashIcon />
                        Xóa
                    </Button>
                    <Button
                        size="xs"
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation()
                            onExport()
                        }}
                        className="flex-1 text-xs"
                    >
                        <ExportIcon />
                        Xuất
                    </Button>
                </div>
            </div>
        </div>
    )
}
