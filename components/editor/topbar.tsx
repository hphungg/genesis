"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEditor } from "@/providers/editor-provider"
import {
    ArrowLeftIcon,
    ArrowsDownUpIcon,
    FloppyDiskIcon,
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export default function TopBar() {
    const { deck, setName, save } = useEditor()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSave = () => {
        startTransition(async () => {
            try {
                await save()
                toast.success("Deck saved successfully")
            } catch (error) {
                toast.error("Failed to save deck")
            }
        })
    }

    return (
        <header className="flex w-full shrink-0 items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center">
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
                className="max-w-md border-transparent bg-transparent px-2 text-center text-2xl font-bold shadow-none transition-colors hover:border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Deck name..."
            />

            <div className="flex items-center gap-4">
                <Button variant="outline">
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
