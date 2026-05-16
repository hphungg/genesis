"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { XIcon } from "@phosphor-icons/react"
import { useSetEditor } from "@/providers/set-provider"
import { CardPreview } from "@/components/card-preview"

const getCardTypeColor = (type?: string, subtype?: string) => {
    if (!type && !subtype) return "bg-gray-500"

    const t = type?.toLowerCase() || ""
    const sub = subtype?.toLowerCase() || ""

    if (t.includes("spell")) return "bg-[#06927b]"
    if (t.includes("trap")) return "bg-[#a91f73]"
    if (t.includes("monster")) {
        if (sub.includes("normal")) return "bg-[#c49e5b]"
        return "bg-[#b25425]"
    }

    if (t.includes("extra")) {
        if (sub.includes("xyz")) return "bg-[#131313]"
        if (sub.includes("fusion")) return "bg-[#753587]"
        if (sub.includes("synchro")) return "bg-[#e0dbd9]"
    }

    return "bg-gray-500"
}

export function SetCardList() {
    const { set, removeCard } = useSetEditor()

    return (
        <div className="flex flex-col flex-1 overflow-hidden p-4 gap-3 min-h-0">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Cards
                </span>
                <span className="text-xs text-muted-foreground font-medium tabular-nums">
                    {set.cards.length}
                </span>
            </div>

            <ScrollArea className="flex-1 min-h-0">
                {set.cards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-1">
                        <span>No cards yet</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1 pr-2">
                        {set.cards.map((card) => (
                            <CardPreview key={card.id} card={card}>
                                <div
                                    className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm bg-muted/30 hover:bg-muted/60 transition-colors group cursor-default"
                                >
                                    <div className={`w-2 h-3.5 rounded-[2px] shrink-0 border border-black/20 dark:border-white/20 ${getCardTypeColor(card.type, card.type2 || undefined)}`} />
                                    <span className="flex-1 truncate font-medium text-foreground">
                                        {card.name}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeCard(card.id);
                                        }}
                                        className="opacity-0 group-hover:opacity-60 hover:opacity-100! transition-opacity text-destructive shrink-0"
                                        aria-label={`Remove card ${card.name}`}
                                    >
                                        <XIcon size={14} />
                                    </button>
                                </div>
                            </CardPreview>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
