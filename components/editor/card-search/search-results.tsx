"use client"

import { Card } from "@/db/schema"
import { useEditor } from "@/providers/editor-provider"

interface CardSearchResultsProps {
    results: Card[]
}

function CardThumbnail({
    card,
    onHover,
}: {
    card: Card
    onHover: (card: Card) => void
}) {
    return (
        <button
            type="button"
            className="group bg-muted focus-visible:ring-ring relative aspect-59/86 overflow-hidden rounded focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
            title={card.name}
            onMouseEnter={() => onHover(card)}
            onFocus={() => onHover(card)}
        >
            <img
                src={`https://images.ygoprodeck.com/images/cards/${card.id}.jpg`}
                alt={card.name}
                className="h-full w-full object-cover"
                loading="lazy"
            />
        </button>
    )
}

export default function SearchResults({ results }: CardSearchResultsProps) {
    const { setHoveredCard } = useEditor()

    return (
        <div className="mx-auto grid w-fit grid-cols-2 gap-3 pb-4 sm:grid-cols-3 md:grid-cols-4">
            {results.map((card) => (
                <CardThumbnail
                    key={card.id}
                    card={card}
                    onHover={setHoveredCard}
                />
            ))}
        </div>
    )
}
