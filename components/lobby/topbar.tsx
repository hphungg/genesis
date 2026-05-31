"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useProgress } from "@bprogress/next"
import { signOut } from "@/app/api/auth"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { FormatRulesDialog } from "@/components/lobby/format-rules"

export default function TopBar() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentView = searchParams.get("view") || "sets"
    const [isPending, setIsPending] = useState(false)
    const [rulesOpen, setRulesOpen] = useState(false)
    const { start, stop } = useProgress()

    const handleSignOut = async () => {
        setIsPending(true)
        start()
        try {
            const result = await signOut()

            if (result.success) {
                toast.success("Đăng xuất thành công!")
                router.push("/signin")
            } else {
                toast.error(`Đăng xuất thất bại: ${result.error}`)
                setIsPending(false)
                stop()
            }
        } catch (error) {
            toast.error("Đăng xuất thất bại")
            setIsPending(false)
            stop()
        }
    }

    const handleViewChange = (view: string) => {
        start()
        router.push(`?view=${view}`)
        stop()
    }

    return (
        <header className="relative flex w-full items-center justify-between px-4 py-4">
            <Button variant="outline" onClick={() => setRulesOpen(true)}>
                Thông tin Format
            </Button>

            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                Danh sách gói bài
            </h1>

            <div className="flex items-center gap-4">
                <Button
                    onClick={() =>
                        handleViewChange(
                            currentView === "decks" ? "sets" : "decks",
                        )
                    }
                >
                    {currentView === "decks" ? "Quay lại" : "Bộ bài của tôi"}
                </Button>
                <Button
                    variant="destructive"
                    className="border-red-300 shadow-md"
                    disabled={isPending}
                    onClick={handleSignOut}
                >
                    {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
                </Button>
            </div>
            <FormatRulesDialog open={rulesOpen} onOpenChange={setRulesOpen} />
        </header>
    )
}
