"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SetCard } from "@/components/lobby/views/sets/set-card"
import { SetDialog } from "@/components/lobby/views/sets/set-dialog"
import { Sets, Cards } from "@/db/schema"
import { getSetById } from "@/app/api/sets"
import { useProgress } from "@bprogress/next"

type SetWithCards = Sets & { cards?: Cards[] }

const TABS = [
    { key: "archetype", label: "Archetype" },
    { key: "staple", label: "Staples" },
    { key: "engine", label: "Engine" },
] as const

export default function SetsView({
    initialSets,
}: {
    initialSets: SetWithCards[]
}) {
    const [activeTab, setActiveTab] = useState<
        "archetype" | "staple" | "engine"
    >("archetype")
    const [selectedSet, setSelectedSet] = useState<SetWithCards | null>(null)
    const [isLoadingSet, setIsLoadingSet] = useState(false)
    const { start, stop } = useProgress()

    const filtered = initialSets.filter(
        (s) => (s.setType ?? "").toLowerCase() === activeTab,
    )

    const handleOpenSet = async (set: SetWithCards) => {
        setSelectedSet(set)
        start()
        setIsLoadingSet(true)

        try {
            const fullSet = await getSetById(set.id)
            if (fullSet) {
                setSelectedSet(fullSet)
            }
        } finally {
            setIsLoadingSet(false)
        }
        stop()
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col gap-4 p-4">
            <div className="bg-muted/10 flex items-center justify-center">
                <div className="bg-muted flex gap-1 rounded-xl p-1">
                    {TABS.map((tab) => (
                        <Button
                            key={tab.key}
                            variant={
                                activeTab === tab.key ? "default" : "ghost"
                            }
                            onClick={() => {
                                setActiveTab(tab.key)
                                setSelectedSet(null)
                            }}
                            className="rounded-lg px-6"
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <div className="text-muted-foreground flex h-40 flex-col items-center justify-center gap-1 text-sm">
                        <span>Không có {activeTab} nào.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {filtered.map((set) => (
                            <SetCard
                                key={set.id}
                                set={set}
                                onClick={() => handleOpenSet(set)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <SetDialog
                selectedSet={selectedSet}
                isLoading={isLoadingSet}
                onOpenChange={(open) => !open && setSelectedSet(null)}
            />
        </div>
    )
}
