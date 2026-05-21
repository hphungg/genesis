"use client"

import { CheckCircleIcon, PlusCircleIcon } from "@phosphor-icons/react"
import { Cards } from "@/db/schema"
import { CardPreview } from "@/components/card-preview"

interface CardSearchResultsProps {
    results: Cards[]
    inSetIds: Set<string>
    onAdd: (card: Cards) => void
}

function CardThumbnail({
    card,
    inSet,
    onAdd,
}: {
    card: Cards
    inSet: boolean
    onAdd: () => void
}) {
    return (
        <CardPreview card={card}>
            <button
                onClick={() => !inSet && onAdd()}
                disabled={inSet}
                className={[
                    "group bg-muted focus-visible:ring-ring relative aspect-59/86 overflow-hidden rounded focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
                    inSet
                        ? "cursor-default opacity-50 grayscale-[0.3]"
                        : "cursor-pointer",
                ].join(" ")}
                title={card.name}
            >
                <img
                    src={`https://images.ygoprodeck.com/images/cards/${card.id}.jpg`}
                    alt={card.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />

                {inSet && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <CheckCircleIcon
                            size={24}
                            className="text-white drop-shadow-md"
                            weight="fill"
                        />
                    </div>
                )}

                {!inSet && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <PlusCircleIcon
                            size={24}
                            className="text-white drop-shadow-md"
                            weight="fill"
                        />
                    </div>
                )}
            </button>
        </CardPreview>
    )
}

export default function CardSearchResults({
    results,
    inSetIds,
    onAdd,
}: CardSearchResultsProps) {
    return (
        <div className="grid grid-cols-4 gap-1.5 pr-3 pb-4 sm:grid-cols-8 md:grid-cols-8">
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
