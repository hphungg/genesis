"use client"

import * as React from "react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Cards } from "@/db/schema"
import { Badge } from "./ui/badge"

interface CardPreviewProps {
    card: Cards
    children: React.ReactNode
}

const getAttributeBadge = (attribute: string) => {
    switch (attribute) {
        case "LIGHT":
            return "bg-[#efdd7e] text-black"
        case "FIRE":
            return "bg-[#eb1b26]"
        case "WIND":
            return "bg-[#38b240]"
        case "DARK":
            return "bg-[#982290]"
        case "WATER":
            return "bg-[#00a8eb]"
        case "EARTH":
            return "bg-[#101918]"
        default:
            return "bg-gray"
    }
}

export function CardPreview({ card, children }: CardPreviewProps) {
    const id = card.id
    if (!id) return <>{children}</>

    return (
        <HoverCard openDelay={50} closeDelay={50}>
            <HoverCardTrigger asChild>{children}</HoverCardTrigger>
            <HoverCardContent
                side="right"
                align="start"
                sideOffset={18}
                className="w-auto bg-black/80 p-2 shadow-none"
            >
                <div className="flex items-start gap-4">
                    <img
                        src={`https://images.ygoprodeck.com/images/cards/${id}.jpg`}
                        className="h-auto w-72 shrink-0 rounded-lg shadow-2xl"
                        alt={card?.name || "Xem trước"}
                    />

                    {card && (
                        <div className="flex w-80 flex-col gap-2 bg-transparent p-4 text-sm text-white">
                            <div className="flex items-start justify-between gap-2 border-b pb-2 text-lg leading-tight font-bold">
                                <span className="flex-1">{card.name}</span>
                                {card.point && card.point > 0 && (
                                    <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                                        {card.point}
                                    </span>
                                )}
                            </div>

                            {(card.type == "Monster" ||
                                card.type == "Extra") && (
                                <div className="flex gap-2">
                                    {card.attribute && (
                                        <Badge
                                            className={`${getAttributeBadge(card.attribute)} border-white font-semibold`}
                                        >
                                            {card.attribute}
                                        </Badge>
                                    )}

                                    {card.level && (
                                        <div className="flex items-center gap-1 font-semibold">
                                            <span>Level/Rank {card.level}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {card.type == "Spell" && (
                                <Badge className="border-white bg-[#06927b] font-semibold">
                                    Spell Card
                                </Badge>
                            )}

                            {card.type == "Trap" && (
                                <Badge className="border-white bg-[#a91f73] font-semibold">
                                    Trap Card
                                </Badge>
                            )}

                            <div className="border-b pb-2 font-bold tracking-wide">
                                [{card.type1}
                                {card.type2 ? `/${card.type2}` : ""}
                                {card.type3 ? `/${card.type3}` : ""}]
                            </div>

                            <div className="flex-1 overflow-y-scroll py-1 text-xs leading-relaxed whitespace-pre-wrap">
                                {card.effect}
                            </div>

                            {(card.atk !== null || card.def !== null) && (
                                <div className="mt-2 flex justify-end gap-4 border-t pt-2 text-sm font-bold">
                                    <span>
                                        ATK/ {card.atk == -1 ? " ?" : card.atk}
                                    </span>
                                    <span>
                                        DEF/ {card.def == -1 ? " ?" : card.def}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
