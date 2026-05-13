"use client"

import { CheckCircleIcon, PlusCircleIcon } from "@phosphor-icons/react"
import { Card } from "@/db/schema"

interface CardSearchResultsProps {
    results: Card[]
    inSetIds: Set<string>
    onAdd: (card: Card) => void
}

function cardTypeDot(type1: string | null | undefined): string {
    const t = (type1 ?? "").toLowerCase()
    if (t.includes("xyz"))     return "bg-zinc-900"
    if (t.includes("synchro")) return "bg-zinc-200"
    if (t.includes("fusion"))  return "bg-purple-600"
    if (t.includes("spell"))   return "bg-cyan-500"
    if (t.includes("trap"))    return "bg-pink-700"
    if (t.includes("normal"))  return "bg-yellow-300"
    if (t.includes("effect"))  return "bg-amber-700"
    return "bg-muted-foreground"
}

function CardThumbnail({ card, inSet, onAdd }: { card: Card; inSet: boolean; onAdd: () => void }) {
    return (
        <button
            onClick={() => !inSet && onAdd()}
            disabled={inSet}
            className={[
                "relative group rounded overflow-hidden aspect-59/86 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                inSet
                    ? "opacity-50 cursor-default grayscale-[0.3]"
                    : "hover:shadow-md hover:ring-2 hover:ring-primary cursor-pointer",
            ].join(" ")}
            title={card.name}
        >
            <img
                src={`https://images.ygoprodeck.com/images/cards/${card.id}.jpg`}
                alt={card.name}
                className="w-full h-full object-cover"
                loading="lazy"
            />

            {/* Type color dot */}
            <span
                className={`absolute bottom-1 right-1 w-2 h-2 rounded-full border border-white/40 shadow ${cardTypeDot(card.type1)}`}
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
