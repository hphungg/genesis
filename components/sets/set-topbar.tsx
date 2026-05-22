"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProgress } from "@bprogress/next"
import { toast } from "sonner"

import { useSetEditor } from "@/providers/set-provider"
import { ConfirmDiscardDialog } from "@/components/confirm-discard-dialog"
import { ArrowLeftIcon, FloppyDiskIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SetEditorTopBar() {
    const { set, isSaving, isDirty, setName, save } = useSetEditor()
    const router = useRouter()
    const [showDiscardDialog, setShowDiscardDialog] = useState(false)
    const { start, stop } = useProgress()

    const handleBack = () => {
        start()
        if (isDirty) {
            setShowDiscardDialog(true)
        } else {
            router.push("/sets")
        }
        stop()
    }

    const handleSave = async () => {
        try {
            await save()
            toast.success("Lưu gói bài thành công!")
            router.push("/sets")
            router.refresh()
        } catch (error) {
            toast.error("Lưu gói bài thất bại")
        }
    }

    return (
        <header className="flex w-full shrink-0 items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center">
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeftIcon />
                    Quay lại
                </Button>
            </div>

            <Input
                value={set.name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md border-transparent bg-transparent px-2 text-center font-bold shadow-none"
                placeholder="Tên gói bài..."
                style={{ fontSize: "1.2rem" }}
            />

            <div className="flex items-center gap-3">
                <Button onClick={handleSave} disabled={isSaving}>
                    <FloppyDiskIcon />
                    {isSaving ? "Đang lưu..." : "Lưu"}
                </Button>
            </div>
            <ConfirmDiscardDialog
                open={showDiscardDialog}
                onCancel={() => setShowDiscardDialog(false)}
                onConfirm={() => {
                    setShowDiscardDialog(false)
                    router.push("/sets")
                }}
            />
        </header>
    )
}
