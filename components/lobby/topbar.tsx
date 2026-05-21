"use client"

import { signOut } from "@/app/api/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { FormatRulesDialog } from "@/components/lobby/format-rules"
import { useProgress } from "@bprogress/next"

interface TopBarProps {
    displayName?: string
}

export default function TopBar({ displayName }: TopBarProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentView = searchParams.get("view") || "sets"
    const [isPending, startTransition] = useTransition()
    const [rulesOpen, setRulesOpen] = useState(false)
    const { start, stop } = useProgress()

    const handleSignOut = () => {
        startTransition(async () => {
            const result = await signOut()

            if (result.success) {
                start()
                toast.success("Đăng xuất thành công!")
                router.push("/signin")
                stop()
            } else {
                toast.error(`Đăng xuất thất bại: ${result.error}`)
            }
        })
    }

    return (
        <header className="relative flex w-full items-center justify-between px-4 py-4">
            <Button variant="outline" onClick={() => setRulesOpen(true)}>
                Thông tin Format
            </Button>

            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                Xin chào {displayName}!
            </h1>

            <div className="flex items-center gap-4">
                <Button asChild className="border-none shadow-md">
                    <Link
                        href={
                            currentView === "decks"
                                ? "?view=sets"
                                : "?view=decks"
                        }
                    >
                        {currentView === "decks"
                            ? "Quay về trang chủ"
                            : "Bộ bài của tôi"}
                    </Link>
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
