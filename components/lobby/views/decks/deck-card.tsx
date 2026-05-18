import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { DeckSummary } from "@/app/api/decks"

interface DeckCardProps {
    deck: DeckSummary
    onDelete: () => void
    onExport: () => void
}

export function DeckCard({ deck, onDelete, onExport }: DeckCardProps) {
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

            <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-end p-3 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="flex gap-2">
                    <Button size="xs" variant="secondary" asChild>
                        <Link href={`/deck/${deck.id}`}>Edit</Link>
                    </Button>
                    <Button size="xs" variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button size="xs" variant="outline" onClick={onExport}>
                        Export
                    </Button>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 pt-8">
                <h3 className="truncate text-lg font-bold text-white">
                    {deck.name}
                </h3>
            </div>
        </div>
    )
}
