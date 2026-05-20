"use client"

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
            <button
                onClick={() => reset()}
                className="border border-black px-4 py-2 transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
            >
                Quay lại
            </button>
        </div>
    )
}
