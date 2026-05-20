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
    onAddSide,
}: {
    card: Cards
    onHover: (card: Cards) => void
    onAdd: (card: Cards) => void
    onAddSide: (card: Cards) => void
}) {
    return (
        <button
            type="button"
            className="group relative aspect-59/86 cursor-pointer hover:z-50 hover:border-2 hover:border-white"
            title={card.name}
            onMouseEnter={() => onHover(card)}
            onFocus={() => onHover(card)}
            onClick={() => onAdd(card)}
            onContextMenu={(e) => {
                e.preventDefault()
                onAddSide(card)
            }}
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
    const { setHoveredCard, addCard, addSideCard } = useEditor()

    return (
        <div className="mx-auto grid w-fit grid-cols-2 gap-1 pb-1 sm:grid-cols-3 md:grid-cols-6">
            {results.map((card) => (
                <CardImage
                    key={card.id}
                    card={card}
                    onHover={setHoveredCard}
                    onAdd={addCard}
                    onAddSide={addSideCard}
                />
            ))}
        </div>
    )
}
