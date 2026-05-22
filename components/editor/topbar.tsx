"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useProgress } from "@bprogress/next"
import { toast } from "sonner"
import {
    ArrowLeftIcon,
    ArrowsDownUpIcon,
    FloppyDiskIcon,
} from "@phosphor-icons/react"
import { useEditor } from "@/providers/editor-provider"

import { ConfirmDiscardDialog } from "@/components/confirm-discard-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function TopBar() {
    const { deck, contents, isDirty, setName, setCoverId, sortCards, save } =
        useEditor()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [showDiscardDialog, setShowDiscardDialog] = useState(false)
    const { start, stop } = useProgress()

    const handleBack = () => {
        if (isDirty) {
            setShowDiscardDialog(true)
        } else {
            start()
            router.push("/?view=decks")
            stop()
        }
    }

    const handleSave = () => {
        startTransition(async () => {
            try {
                start()
                await save()
                toast.success("Lưu bộ bài thành công!")
                router.push("/?view=decks")
                router.refresh()
                stop()
            } catch (error) {
                toast.error("Lưu bộ bài thất bại")
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

    const totalPoints = useMemo(() => {
        return [...contents.main, ...contents.extra, ...contents.side].reduce(
            (sum, card) => sum + (card.point ?? 0),
            0,
        )
    }, [contents])

    return (
        <header className="flex w-full shrink-0 items-center gap-4 px-4 py-2">
            <div className="flex flex-3 items-center justify-start gap-4">
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeftIcon />
                    Quay lại
                </Button>
                <Select
                    value={deck.coverId ?? ""}
                    onValueChange={(val) => setCoverId(val || null)}
                >
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Chọn ảnh bìa" />
                    </SelectTrigger>
                    <SelectContent>
                        {allCards.map((card) => (
                            <SelectItem key={card.id} value={card.id}>
                                {card.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Input
                value={deck.name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md flex-3 border-transparent bg-transparent px-2 text-center font-bold shadow-none"
                style={{ fontSize: "1.2rem" }}
                placeholder="Nhập tên bộ bài..."
            />

            <div className="flex flex-3 items-center justify-end gap-4">
                <div
                    className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors ${
                        totalPoints >= 101
                            ? "border-red-600 text-red-600 dark:text-red-400"
                            : "border-green-600 text-green-600 dark:text-green-400"
                    }`}
                >
                    {totalPoints} points
                </div>

                <Button variant="outline" onClick={sortCards}>
                    <ArrowsDownUpIcon />
                    Sắp xếp
                </Button>
                <Button onClick={handleSave} disabled={isPending}>
                    <FloppyDiskIcon />
                    {isPending ? "Đang lưu..." : "Lưu bộ bài"}
                </Button>
            </div>
            <ConfirmDiscardDialog
                open={showDiscardDialog}
                onCancel={() => setShowDiscardDialog(false)}
                onConfirm={() => {
                    setShowDiscardDialog(false)
                    router.push("/?view=decks")
                }}
            />
        </header>
    )
}
