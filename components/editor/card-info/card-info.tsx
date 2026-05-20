"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEditor } from "@/providers/editor-provider"

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

export default function CardInfo() {
    const { hoveredCard } = useEditor()

    if (!hoveredCard) {
        return <div className="flex h-full min-w-0 flex-2 flex-col p-3" />
    }

    const isXyz = [hoveredCard.type2, hoveredCard.type3].some(
        (value) => value?.toLowerCase() === "xyz",
    )

    return (
        <div className="flex h-full min-w-0 flex-2 flex-col gap-2 p-3">
            <img
                src={`https://images.ygoprodeck.com/images/cards/${hoveredCard.id}.jpg`}
                alt={hoveredCard.name}
                className="mx-auto aspect-59/86 w-3/4 rounded-sm object-cover shadow-md"
            />

            <div className="flex min-h-0 flex-1 flex-col gap-1">
                <h2 className="text-center font-bold text-balance">
                    {hoveredCard.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    {(hoveredCard.type === "Monster" ||
                        hoveredCard.type === "Extra") && (
                        <>
                            {hoveredCard.attribute && (
                                <Badge
                                    className={`${getAttributeBadge(hoveredCard.attribute)} border-white font-semibold`}
                                >
                                    {hoveredCard.attribute}
                                </Badge>
                            )}
                        </>
                    )}

                    {hoveredCard.type === "Spell" && (
                        <Badge className="border-white bg-[#06927b] font-semibold">
                            Spell Card
                        </Badge>
                    )}

                    {hoveredCard.type === "Trap" && (
                        <Badge className="border-white bg-[#a91f73] font-semibold">
                            Trap Card
                        </Badge>
                    )}

                    {hoveredCard.level && (
                        <span className="font-semibold">
                            {isXyz ? "Rank" : "Level"} {hoveredCard.level}
                        </span>
                    )}
                </div>

                <div className="text-sm font-semibold tracking-wide">
                    [{hoveredCard.type1}
                    {hoveredCard.type2 ? `/${hoveredCard.type2}` : ""}
                    {hoveredCard.type3 ? `/${hoveredCard.type3}` : ""}]
                </div>

                <p className="h-full text-xs leading-relaxed whitespace-pre-wrap">
                    {hoveredCard.effect || "No effect."}
                </p>

                {(hoveredCard.atk !== null || hoveredCard.def !== null) && (
                    <div className="flex justify-end gap-4 border-t pt-2 text-sm font-semibold">
                        <span>
                            ATK/ {hoveredCard.atk == -1 ? "?" : hoveredCard.atk}
                        </span>
                        <span>
                            DEF/ {hoveredCard.def == -1 ? "?" : hoveredCard.def}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
