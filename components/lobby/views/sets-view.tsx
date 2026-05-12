"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SetsView() {
    const [setsSubView, setSetsSubView] = useState("archetype")

    return (
        <div className="flex flex-1 flex-col w-full h-full p-4 gap-4">
            <div className="flex items-center justify-center bg-muted/10">
                <div className="flex gap-1 p-1 bg-muted rounded-xl">
                    <Button
                        variant={setsSubView === "archetype" ? "default" : "ghost"}
                        onClick={() => setSetsSubView("archetype")}
                        className="rounded-lg px-6"
                    >
                        Archetype
                    </Button>
                    <Button
                        variant={setsSubView === "staples" ? "default" : "ghost"}
                        onClick={() => setSetsSubView("staples")}
                        className="rounded-lg px-6"
                    >
                        Staples
                    </Button>
                    <Button
                        variant={setsSubView === "engine" ? "default" : "ghost"}
                        onClick={() => setSetsSubView("engine")}
                        className="rounded-lg px-6"
                    >
                        Engine
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="aspect-59/86 rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative group">
                            <div className="absolute inset-0 bg-muted flex items-center justify-center">
                                <span className="text-muted-foreground text-sm font-medium">Card Art</span>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/50 to-transparent p-3 pt-6">
                                <p className="text-white text-sm font-semibold truncate">{setsSubView} Card {i + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
