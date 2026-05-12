"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowsDownUpIcon, FloppyDiskIcon } from "@phosphor-icons/react"

export default function TopBar() {
    return (
        <header className="flex w-full items-center justify-between px-4 py-4">
            <div className="flex items-center">
                <Button variant="outline">
                    <ArrowLeftIcon />
                    Quay lại
                </Button>
            </div>

            <h1 className="text-lg font-bold">Deck Name</h1>

            <div className="flex items-center gap-4">
                <Button variant="outline">
                    <ArrowsDownUpIcon />
                    Sắp xếp
                </Button>
                <Button>
                    <FloppyDiskIcon />
                    Lưu
                </Button>
            </div>
        </header>
    )
}