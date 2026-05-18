"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

interface SearchBarProps {
    query: string
    isPending: boolean
    canSearch: boolean
    onChange: (value: string) => void
    onSearch: () => void
    onOpenFilters: () => void
}

export default function SearchBar({
    query,
    isPending,
    canSearch,
    onChange,
    onSearch,
    onOpenFilters,
}: SearchBarProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
                <Input
                    value={query}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && canSearch && onSearch()
                    }
                    placeholder="Search cards by name..."
                    className="flex-1"
                />
                <Button variant="outline" onClick={onOpenFilters} size="icon">
                    <FunnelIcon />
                </Button>
                <Button
                    onClick={onSearch}
                    disabled={!canSearch || isPending}
                    size="icon"
                >
                    <MagnifyingGlassIcon />
                </Button>
            </div>
        </div>
    )
}
