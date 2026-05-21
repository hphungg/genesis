"use client"

import { useEffect } from "react"
import { useProgress } from "@bprogress/next"

export default function Loading() {
    const { start, stop } = useProgress()

    useEffect(() => {
        start()
        return () => {
            stop()
        }
    }, [start, stop])

    return (
        <div className="bg-muted flex min-h-screen flex-col">
            <div className="flex flex-1 items-center justify-center">
                <p className="text-muted-foreground text-lg">Đang tải...</p>
            </div>
        </div>
    )
}
