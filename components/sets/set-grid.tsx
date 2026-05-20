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
            <div className="text-muted-foreground bg-background rounded-xl border py-16 text-center shadow-sm">
                <p className="mb-1 text-lg font-medium">
                    Không có gói bài nào.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {sets.map((set) => (
                <Card
                    key={set.id}
                    className="group/set-card bg-background relative flex flex-col gap-0 overflow-hidden border-none p-0! transition-shadow hover:shadow-md"
                >
                    <div className="bg-muted relative h-48 w-full shrink-0 overflow-hidden">
                        {set.coverId ? (
                            <img
                                src={`https://images.ygoprodeck.com/images/cards_cropped/${set.coverId}.jpg`}
                                alt={set.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="text-muted-foreground bg-muted/50 flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                                <span className="text-xs font-medium tracking-wide uppercase">
                                    Không có ảnh bìa
                                </span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/20 opacity-0 transition-opacity duration-300 group-hover/set-card:opacity-100" />

                        <div className="absolute top-2 right-2 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-200 group-hover/set-card:translate-x-0 group-hover/set-card:opacity-100">
                            <Button size="icon" className="h-8 w-8" asChild>
                                <Link href={`/sets/${set.id}`}>
                                    <PencilIcon size={14} weight="bold" />
                                </Link>
                            </Button>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="bg-background h-8 w-8"
                                onClick={() => handleDelete(set.id)}
                            >
                                <TrashIcon size={14} weight="bold" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-0.5 p-4">
                        <div className="flex items-center justify-between gap-2">
                            <h1 className="truncate text-base leading-tight font-bold">
                                {set.name}
                            </h1>
                            <span className="border-foreground/20 bg-foreground text-background shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                                {set.setType}
                            </span>
                        </div>
                        {set.description && (
                            <p className="text-muted-foreground mt-1 line-clamp-2 text-xs opacity-80">
                                {set.description}
                            </p>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    )
}
