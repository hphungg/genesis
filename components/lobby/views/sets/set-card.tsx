import React from "react"
import { Set } from "@/db/schema"

interface SetCardProps {
    set: Set
    onClick: () => void
}

export function SetCard({ set, onClick }: SetCardProps) {
    return (
        <div
            onClick={onClick}
            className="aspect-3/2 rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer relative group flex flex-col"
        >
            {/* Background: cover image or gradient placeholder */}
            <div className="absolute inset-0 bg-muted">
                {set.coverId ? (
                    <img
                        src={`https://images.ygoprodeck.com/images/cards_cropped/${set.coverId}.jpg`}
                        alt={set.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 opacity-50" />
                )}
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 pt-8 z-10 flex flex-col items-start gap-1">
                <h3 className="text-white text-lg font-bold truncate">{set.name}</h3>
                <div className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/20 bg-white text-black uppercase tracking-wide">
                    {set.setType}
                </div>
            </div>
        </div>
    )
}
