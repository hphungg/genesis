"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SetCard } from "./sets/set-card"
import { SetDialog } from "./sets/set-dialog"

export default function SetsView() {
    const [setsSubView, setSetsSubView] = useState("archetype")
    const [selectedSet, setSelectedSet] = useState<any | null>(null)

    const sets = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        name: `${setsSubView === 'archetype' ? 'DoomZ' : setsSubView === 'staples' ? 'Handtraps' : 'Generic'} ${i + 1}`,
        tag: setsSubView === 'archetype' ? 'Archetype' : setsSubView === 'staples' ? 'Staple' : 'Engine',
        description: `This is a collection of cards for the ${setsSubView} category. These cards work well together and provide a solid foundation for building your deck.`,
        cards: Array.from({ length: 40 }).map((_, j) => ({ id: j, name: `Card ${j + 1}` }))
    }))

    return (
        <div className="flex flex-1 flex-col w-full h-full p-4 gap-4">
            <div className="flex items-center justify-center bg-muted/10">
                <div className="flex gap-1 p-1 bg-muted rounded-xl">
                    <Button
                        variant={setsSubView === "archetype" ? "default" : "ghost"}
                        onClick={() => { setSetsSubView("archetype"); setSelectedSet(null); }}
                        className="rounded-lg px-6"
                    >
                        Archetype
                    </Button>
                    <Button
                        variant={setsSubView === "staples" ? "default" : "ghost"}
                        onClick={() => { setSetsSubView("staples"); setSelectedSet(null); }}
                        className="rounded-lg px-6"
                    >
                        Staples
                    </Button>
                    <Button
                        variant={setsSubView === "engine" ? "default" : "ghost"}
                        onClick={() => { setSetsSubView("engine"); setSelectedSet(null); }}
                        className="rounded-lg px-6"
                    >
                        Engine
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {sets.map((set) => (
                        <SetCard key={set.id} set={set} onClick={() => setSelectedSet(set)} />
                    ))}
                </div>
            </div>

            <SetDialog 
                selectedSet={selectedSet} 
                onOpenChange={(open) => !open && setSelectedSet(null)} 
            />
        </div>
    )
}
