"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useProgress } from "@bprogress/next"

import { ArrowLeftIcon, PlusCircleIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export default function TopBar() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const { start, stop } = useProgress()

    const handleCreate = () => {
        setIsPending(true)
        start()
        router.push(`/sets/new`)
        stop()
        setIsPending(false)
    }

    return (
        <header className="bg-background relative flex w-full items-center justify-between border-b px-4 py-4">
            <Button variant="outline" asChild>
                <Link href="/">
                    <ArrowLeftIcon />
                    Về trang chủ
                </Link>
            </Button>

            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                Gói bài
            </h1>

            <div className="flex items-center gap-4">
                <Button
                    className="gap-2"
                    onClick={handleCreate}
                    disabled={isPending}
                >
                    <PlusCircleIcon size={20} />
                    {isPending ? "Đang tạo..." : "Tạo gói bài mới"}
                </Button>
            </div>
        </header>
    )
}
