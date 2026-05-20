"use client"

import { Cards } from "@/db/schema"
import { useEditor } from "@/providers/editor-provider"

interface CardSearchResultsProps {
    results: Cards[]
}

function CardImage({
    card,
    onHover,
    onAdd,
}: {
    card: Cards
    onHover: (card: Cards) => void
    onAdd: (card: Cards) => void
}) {
    return (
        <button
            type="button"
            className="group bg-muted focus-visible:ring-ring relative aspect-59/86 overflow-hidden rounded focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
            title={card.name}
            onMouseEnter={() => onHover(card)}
            onFocus={() => onHover(card)}
            onClick={() => onAdd(card)}
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
    const { setHoveredCard, addCard } = useEditor()

    return (
        <div className="mx-auto grid w-fit grid-cols-2 gap-1 pb-4 sm:grid-cols-3 md:grid-cols-6">
            {results.map((card) => (
                <CardImage
                    key={card.id}
                    card={card}
                    onHover={setHoveredCard}
                    onAdd={addCard}
                />
            ))}
        </div>
    )
}
