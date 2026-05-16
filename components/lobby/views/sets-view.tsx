"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SetCard } from "./sets/set-card"
import { SetDialog } from "./sets/set-dialog"
import { Set, Card } from "@/db/schema"

type SetWithCards = Set & { cards?: Card[] }

const TABS = [
    { key: "archetype", label: "Archetype" },
    { key: "staple",    label: "Staples" },
    { key: "engine",    label: "Engine" },
] as const

export default function SetsView({ initialSets }: { initialSets: SetWithCards[] }) {
    const [activeTab, setActiveTab] = useState<"archetype" | "staple" | "engine">("archetype")
    const [selectedSet, setSelectedSet] = useState<SetWithCards | null>(null)

    const filtered = initialSets.filter(
        (s) => (s.setType ?? "").toLowerCase() === activeTab
    )

    return (
        <div className="flex flex-1 flex-col w-full h-full p-4 gap-4">
            <div className="flex items-center justify-center bg-muted/10">
                <div className="flex gap-1 p-1 bg-muted rounded-xl">
                    {TABS.map((tab) => (
                        <Button
                            key={tab.key}
                            variant={activeTab === tab.key ? "default" : "ghost"}
                            onClick={() => { setActiveTab(tab.key); setSelectedSet(null) }}
                            className="rounded-lg px-6"
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm gap-1">
                        <span>No {activeTab} sets yet.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filtered.map((set) => (
                            <SetCard key={set.id} set={set} onClick={() => setSelectedSet(set)} />
                        ))}
                    </div>
                )}
            </div>

            <SetDialog
                selectedSet={selectedSet}
                onOpenChange={(open) => !open && setSelectedSet(null)}
            />
        </div>
    )
}
