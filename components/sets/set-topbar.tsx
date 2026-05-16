"use client"

import { useSetEditor } from "@/providers/set-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon, FloppyDiskIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"

export default function SetEditorTopBar() {
    const { set, setName, save } = useSetEditor()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSave = () => {
        startTransition(async () => {
            try {
                await save()
                toast.success("Set saved successfully")
                router.push("/sets")
                router.refresh()
            } catch (error) {
                toast.error("Failed to save set")
            }
        })
    }

    return (
        <header className="flex w-full items-center justify-between px-4 py-4 gap-4 shrink-0">
            <div className="flex items-center">
                <Button variant="outline" onClick={() => {
                    router.push("/sets")
                    router.refresh()
                }}>
                    <ArrowLeftIcon />
                    Back
                </Button>
            </div>

            <Input
                value={set.name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md text-center font-bold text-2xl border-transparent bg-transparent shadow-none hover:border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors px-2"
                placeholder="Set name..."
            />

            <div className="flex items-center gap-3">
                <Button onClick={handleSave} disabled={isPending}>
                    <FloppyDiskIcon />
                    {isPending ? "Saving…" : "Save"}
                </Button>
            </div>
        </header>
    )
}
