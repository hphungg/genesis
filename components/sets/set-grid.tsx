"use client"

import { deleteSet } from "@/app/api/sets"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrashIcon, PencilIcon } from "@phosphor-icons/react"
import { useState } from "react"
import Link from "next/link"

export default function SetGrid({ initialSets }: { initialSets: any[] }) {
    const [sets, setSets] = useState(initialSets)

    const handleDelete = async (id: number) => {
        await deleteSet(id)
        setSets((prev) => prev.filter((s) => s.id !== id))
    }

    if (sets.length === 0) {
        return (
            <div className="text-center py-16 text-muted-foreground border rounded-xl bg-background shadow-sm">
                <p className="text-lg font-medium mb-1">No sets found</p>
                <p className="text-sm">Create your first set to get started.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sets.map((set) => (
                <Card key={set.id} className="relative group/set-card flex flex-col overflow-hidden p-0! gap-0 border-none hover:shadow-md transition-shadow bg-background">
                    <div className="h-48 w-full bg-muted overflow-hidden relative shrink-0">
                        {set.coverId ? (
                            <img
                                src={`https://images.ygoprodeck.com/images/cards_cropped/${set.coverId}.jpg`}
                                alt={set.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/50 p-4 text-center gap-2">
                                <span className="text-xs font-medium uppercase tracking-wide">No Cover</span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/20 opacity-0 group-hover/set-card:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-4 opacity-0 group-hover/set-card:translate-x-0 group-hover/set-card:opacity-100 transition-all duration-200">
                            <Button size="icon" className="h-8 w-8" asChild>
                                <Link href={`/sets/${set.id}`}>
                                    <PencilIcon size={14} weight="bold" />
                                </Link>
                            </Button>
                            <Button variant="destructive" size="icon" className="h-8 w-8 bg-background" onClick={() => handleDelete(set.id)}>
                                <TrashIcon size={14} weight="bold" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-0.5 p-4">
                        <div className="flex items-center justify-between gap-2">
                            <h1 className="font-bold text-base leading-tight truncate">{set.name}</h1>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-foreground/20 bg-foreground text-background uppercase tracking-wide shrink-0">
                                {set.setType}
                            </span>
                        </div>
                        {set.description && (
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 opacity-80">
                                {set.description}
                            </p>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    )
}
