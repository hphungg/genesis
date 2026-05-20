"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEditor } from "@/providers/editor-provider"
import {
    ArrowLeftIcon,
    ArrowsDownUpIcon,
    FloppyDiskIcon,
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useMemo, useTransition } from "react"
import { toast } from "sonner"

export default function TopBar() {
    const { deck, contents, setName, setCoverId, sortCards, save } = useEditor()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSave = () => {
        startTransition(async () => {
            try {
                await save()
                toast.success("Deck saved successfully")
                router.push("/?view=decks")
                router.refresh()
            } catch (error) {
                toast.error("Failed to save deck")
            }
        })
    }

    const allCards = useMemo(() => {
        const seen = new Set<string>()
        const result = []
        for (const card of [
            ...contents.main,
            ...contents.extra,
            ...contents.side,
        ]) {
            if (!seen.has(card.id)) {
                seen.add(card.id)
                result.push(card)
            }
        }
        return result
    }, [contents])

    return (
        <header className="flex w-full flex-1 items-center gap-4 px-4 py-2">
            <div className="flex flex-3 items-center">
                <Button
                    variant="outline"
                    onClick={() => {
                        router.push("/?view=decks")
                        router.refresh()
                    }}
                >
                    <ArrowLeftIcon />
                    Back
                </Button>
            </div>

            <Input
                value={deck.name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md flex-3 border-transparent bg-transparent px-2 text-center font-bold shadow-none"
                style={{ fontSize: "1.2rem" }}
                placeholder="Deck name..."
            />

            <div className="flex flex-3 items-center justify-end gap-4">
                <Select
                    value={deck.coverId ?? ""}
                    onValueChange={(val) => setCoverId(val || null)}
                >
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Cover" />
                    </SelectTrigger>
                    <SelectContent>
                        {allCards.map((card) => (
                            <SelectItem key={card.id} value={card.id}>
                                {card.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button variant="outline" onClick={sortCards}>
                    <ArrowsDownUpIcon />
                    Sort
                </Button>
                <Button onClick={handleSave} disabled={isPending}>
                    <FloppyDiskIcon />
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </div>
        </header>
    )
}
