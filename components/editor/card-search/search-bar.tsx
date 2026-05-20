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
    onClearSearch?: () => void
    onOpenFilters: () => void
}

export default function SearchBar({
    query,
    isPending,
    canSearch,
    onChange,
    onSearch,
    onClearSearch,
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
                        className="w-full pr-8"
                    />
                    {query && onClearSearch && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full w-8 text-muted-foreground hover:text-foreground"
                            onClick={onClearSearch}
                        >
                            <XIcon className="h-4 w-4" />
                        </Button>
                    )}
                </div>
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
