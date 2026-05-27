"use client"

import { useSetEditor } from "@/providers/set-provider"

import { XIcon } from "@phosphor-icons/react"
import { ScrollArea } from "@/components/ui/scroll-area"

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
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Danh sách lá bài
                </span>
                <span className="text-muted-foreground text-xs font-medium tabular-nums">
                    {set.cards.length}
                </span>
            </div>

            <ScrollArea className="no-scrollbar min-h-0 flex-1">
                {set.cards.length === 0 ? (
                    <div className="text-muted-foreground flex h-32 flex-col items-center justify-center gap-1 text-sm">
                        <span>Không có lá bài nào.</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1 pr-2">
                        {set.cards.map((card) => (
                            <div
                                key={card.id}
                                className="bg-muted/30 hover:bg-muted/60 group flex min-w-0 cursor-default items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
                            >
                                <div
                                    className={`h-3.5 w-2 shrink-0 rounded-xs border border-black/20 dark:border-white/20 ${getCardTypeColor(card.type, card.type2 || undefined)}`}
                                />
                                <span className="text-foreground min-w-0 flex-1 truncate font-medium">
                                    {card.name}
                                </span>
                                {card.point && card.point > 0 && (
                                    <span className="shrink-0 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                        {card.point}
                                    </span>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        removeCard(card.id)
                                    }}
                                    className="text-destructive shrink-0 opacity-0 transition-opacity group-hover:opacity-60 hover:opacity-100!"
                                    aria-label={`Xóa ${card.name}`}
                                >
                                    <XIcon size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
