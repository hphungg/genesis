"use client"

import { useSetEditor } from "@/providers/set-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon, FloppyDiskIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

export default function SetEditorTopBar() {
    const { set, setName, save, isSaving } = useSetEditor()
    const router = useRouter()

    return (
        <header className="flex w-full items-center justify-between px-4 py-4 gap-4 shrink-0">
            <div className="flex items-center">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeftIcon />
                    Back
                </Button>
            </div>

            <Input
                value={set.name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-xs text-center font-semibold text-base border-transparent bg-transparent shadow-none hover:border-input hover:bg-background focus-visible:border-input focus-visible:bg-background transition-colors"
                placeholder="Set name…"
            />

            <div className="flex items-center gap-3">
                <Button onClick={save} disabled={isSaving}>
                    <FloppyDiskIcon />
                    {isSaving ? "Saving…" : "Save"}
                </Button>
            </div>
        </header>
    )
}
