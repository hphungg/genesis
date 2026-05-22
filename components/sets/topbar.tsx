"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, PlusCircleIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useProgress } from "@bprogress/next"

export default function TopBar() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { start, stop } = useProgress()

    const handleCreate = () => {
        start()
        startTransition(() => {
            router.push(`/sets/new`)
        })
        stop()
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
