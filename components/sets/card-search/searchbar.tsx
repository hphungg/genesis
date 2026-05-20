"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

interface CardSearchBarProps {
    query: string
    isPending: boolean
    onChange: (value: string) => void
    onSearch: () => void
}

export default function CardSearchBar({
    query,
    isPending,
    onChange,
    onSearch,
}: CardSearchBarProps) {
    return (
        <div className="flex shrink-0 items-center gap-1.5">
            <Input
                value={query}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Tìm kiếm tên lá bài..."
                className="flex-1"
            />
            <Button onClick={onSearch} disabled={isPending || !query.trim()}>
                <MagnifyingGlassIcon />
                Tìm
            </Button>
        </div>
    )
}
