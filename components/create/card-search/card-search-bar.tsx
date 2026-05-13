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

export default function CardSearchBar({ query, isPending, onChange, onSearch }: CardSearchBarProps) {
    return (
        <div className="flex items-center gap-1.5 shrink-0">
            <Input
                value={query}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Search cards by name..."
                className="flex-1"
            />
            <Button onClick={onSearch} disabled={isPending || !query.trim()}>
                <MagnifyingGlassIcon />
                Search
            </Button>
        </div>
    )
}
