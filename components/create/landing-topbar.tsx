"use client"

import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function LandingTopBar() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleCreate = () => {
        startTransition(() => {
            router.push(`/create/new`)
        })
    }

    return (
        <header className="relative flex w-full items-center justify-between px-4 py-4 bg-background border-b">
            <Button variant="outline" asChild>
                <Link href="/">Back to Lobby</Link>
            </Button>

            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                Sets
            </h1>

            <div className="flex items-center gap-4">
                <Button
                    className="gap-2 px-6"
                    onClick={handleCreate}
                    disabled={isPending}
                >
                    <PlusCircleIcon size={20} />
                    {isPending ? "Creating…" : "Create New Set"}
                </Button>
            </div>
        </header>
    )
}
