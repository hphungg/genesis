"use client"

import { useEditor } from "@/providers/editor-provider"
import { Cards } from "@/db/schema"

interface DeckSectionProps {
    title: string
    section: "main" | "extra" | "side"
    cardList: Cards[]
    rows: number
    cols: number
    expandedCols?: number
    expandThreshold?: number
}

function CardImage({
    card,
    onHover,
    onContextMenu,
    lastItem,
    marginRight,
}: {
    card: Cards
    onHover: (card: Cards) => void
    onContextMenu: (e: React.MouseEvent, card: Cards) => void
    lastItem: boolean
    marginRight: number
}) {
    return (
        <button
            type="button"
            className={`group relative aspect-59/86 shrink-0 cursor-pointer hover:z-50 hover:border-2 hover:border-white`}
            onMouseEnter={() => onHover(card)}
            onFocus={() => onHover(card)}
            onContextMenu={(e) => onContextMenu(e, card)}
            style={{
                width: `${10}%`,
                marginRight: lastItem ? "0%" : `${marginRight}%`,
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

export default function DeckSection({
    title,
    section,
    cardList,
    rows,
    cols,
    expandedCols,
    expandThreshold,
}: DeckSectionProps) {
    const { setHoveredCard, removeCard } = useEditor()

    const isExpanded =
        expandedCols !== undefined &&
        expandThreshold !== undefined &&
        cardList.length > expandThreshold

    const activeCols = isExpanded ? expandedCols! : cols

    const handleRightClick = (e: React.MouseEvent, card: Cards) => {
        e.preventDefault()
        removeCard(card, section)
    }

    const cardRows = Array.from({ length: rows }, (_, rowIndex) =>
        cardList.slice(rowIndex * activeCols, (rowIndex + 1) * activeCols),
    )

    const marginRightPercent = isExpanded
        ? (100 - activeCols * 10) / (activeCols - 1)
        : 0

    return (
        <div className="mx-auto flex w-full flex-col gap-1">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">{title}</h3>
                <span className="text-sm font-bold">{cardList.length}</span>
            </div>

            <div className="flex w-full flex-col gap-1 rounded-sm border bg-black/25 p-1">
                {cardRows.map((cards, rIndex) => (
                    <div key={rIndex} className="flex w-full">
                        {cards.map((card, cIndex) => {
                            const isLast = cIndex === cards.length - 1

                            return (
                                <CardImage
                                    key={rIndex * 10 + cIndex}
                                    card={card}
                                    onContextMenu={handleRightClick}
                                    onHover={setHoveredCard}
                                    lastItem={isLast}
                                    marginRight={marginRightPercent}
                                />
                            )
                        })}
                        {cards.length === 0 && (
                            <div
                                className="pointer-events-none aspect-[5.9/8.6] shrink-0 opacity-0"
                                style={{ width: `${10}%` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
