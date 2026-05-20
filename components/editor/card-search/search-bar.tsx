"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FunnelIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"

interface SearchBarProps {
    query: string
    isPending: boolean
    canSearch: boolean
    onChange: (value: string) => void
    onSearch: () => void
    onClearSearch: () => void
    isClearDisabled: boolean
    onOpenFilters: () => void
}

export default function SearchBar({
    query,
    isPending,
    canSearch,
    onChange,
    onSearch,
    onClearSearch,
    isClearDisabled,
    onOpenFilters,
}: SearchBarProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                    <Input
                        value={query}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && canSearch && onSearch()
                        }
                        placeholder="Search cards by name..."
                        className="w-full"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={onClearSearch}
                    disabled={isClearDisabled}
                    size="icon"
                >
                    <XIcon className="h-4 w-4" />
                </Button>
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
