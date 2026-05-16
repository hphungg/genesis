"use client"

import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Card } from "@/db/schema"
import { Badge } from "./ui/badge"

interface CardPreviewProps {
    card: Card
    children: React.ReactNode
}

const getAttributeBadge = (attribute: string) => {
    switch (attribute) {
        case "LIGHT": return "bg-[#efdd7e] text-black"
        case "FIRE": return "bg-[#eb1b26]"
        case "WIND": return "bg-[#38b240]"
        case "DARK": return "bg-[#982290]"
        case "WATER": return "bg-[#00a8eb]"
        case "EARTH": return "bg-[#101918]"
        default: return "bg-gray"
    }
}

export function CardPreview({ card, children }: CardPreviewProps) {
    const id = card.id
    if (!id) return <>{children}</>

    return (
        <HoverCard openDelay={50} closeDelay={50}>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent
                side="right"
                align="start"
                sideOffset={16}
                className="w-auto p-2 bg-black/80 shadow-none"
            >
                <div className="flex gap-4 items-start">
                    <img
                        src={`https://images.ygoprodeck.com/images/cards/${id}.jpg`}
                        className="w-72 shrink-0 h-auto rounded-lg shadow-2xl"
                        alt={card?.name || "Preview"}
                    />

                    {card && (
                        <div className="flex flex-col text-white bg-transparent p-4 w-80 text-sm gap-2">
                            <div className="flex justify-between items-start gap-2 border-b pb-2 font-bold text-lg leading-tight">
                                {card.name}
                            </div>

                            {(card.type == "Monster" || card.type == "Extra") && (
                                <div className="flex gap-2">
                                    {card.attribute && (
                                        <Badge className={`${getAttributeBadge(card.attribute)} border-white font-semibold`}>
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

                            {(card.type == "Spell") && (
                                <Badge className="bg-[#06927b] border-white font-semibold">
                                    Spell Card
                                </Badge>
                            )}

                            {(card.type == "Trap") && (
                                <Badge className="bg-[#a91f73] border-white font-semibold">
                                    Trap Card
                                </Badge>
                            )}

                            <div className="font-bold tracking-wide border-b pb-2">
                                [{card.type1}{card.type2 ? `/${card.type2}` : ''}{card.type3 ? `/${card.type3}` : ''}]
                            </div>

                            <div className="flex-1 overflow-y-auto text-[13px] max-h-60 whitespace-pre-wrap leading-relaxed py-1">
                                {card.effect}
                            </div>

                            {(card.atk != null || card.def != null) && (
                                <div className="flex justify-end gap-4 font-bold border-t pt-2 mt-2 text-sm">
                                    {card.atk != null && <span>ATK/{card.atk}</span>}
                                    {card.def != null && <span>DEF/{card.def}</span>}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
