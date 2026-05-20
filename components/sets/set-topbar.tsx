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
        <header className="flex w-full shrink-0 items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center">
                <Button
                    variant="outline"
                    onClick={() => {
                        router.push("/sets")
                        router.refresh()
                    }}
                >
                    <ArrowLeftIcon />
                    Back
                </Button>
            </div>

            <Input
                value={set.name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md border-transparent bg-transparent px-2 text-center font-bold shadow-none"
                placeholder="Set name..."
                style={{ fontSize: "1.2rem" }}
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
