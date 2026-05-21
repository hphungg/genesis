"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white">
            <h2 className="mb-4 text-2xl font-bold">Có lỗi xảy ra!</h2>
            <Button onClick={() => reset()}>Quay lại</Button>
        </div>
    )
}
