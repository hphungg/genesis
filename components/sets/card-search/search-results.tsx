"use client"

import { CheckCircleIcon, PlusCircleIcon } from "@phosphor-icons/react"
import { Cards } from "@/db/schema"
import { CardPreview } from "@/components/card-preview"

interface CardSearchResultsProps {
    results: Cards[]
    inSetIds: Set<string>
    onAdd: (card: Cards) => void
}

function CardThumbnail({ card, inSet, onAdd }: { card: Cards; inSet: boolean; onAdd: () => void }) {
    return (
        <CardPreview card={card}>
            <button
                onClick={() => !inSet && onAdd()}
                disabled={inSet}
                className={[
                    "relative group rounded overflow-hidden aspect-59/86 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                    inSet
                        ? "opacity-50 cursor-default grayscale-[0.3]"
                        : "cursor-pointer",
                ].join(" ")}
                title={card.name}
            >
                <img
                    src={`https://images.ygoprodeck.com/images/cards/${card.id}.jpg`}
                    alt={card.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {inSet && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <CheckCircleIcon size={24} className="text-white drop-shadow-md" weight="fill" />
                    </div>
                )}

                {!inSet && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <PlusCircleIcon size={24} className="text-white drop-shadow-md" weight="fill" />
                    </div>
                )}
            </button>
        </CardPreview>
    )
}

export default function CardSearchResults({ results, inSetIds, onAdd }: CardSearchResultsProps) {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1.5 pr-3 pb-4">
            {results.map((card) => (
                <CardThumbnail
                    key={card.id}
                    card={card}
                    inSet={inSetIds.has(card.id)}
                    onAdd={() => onAdd(card)}
                />
            ))}
        </div>
    )
}
