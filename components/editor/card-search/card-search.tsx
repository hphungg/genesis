"use client"

import { useMemo, useState, useTransition } from "react"
import { searchCards } from "@/app/api/cards"
import { Cards } from "@/db/schema"
import CardFilterDrawer, {
    CardSearchFilters,
    DEFAULT_FILTERS,
} from "./filter-drawer"
import SearchResults from "./search-results"
import SearchBar from "./search-bar"

import { ScrollArea } from "@/components/ui/scroll-area"

export default function CardSearch() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Cards[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [filters, setFilters] = useState<CardSearchFilters>(DEFAULT_FILTERS)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const activeFilterCount = useMemo(
        () => Object.values(filters).filter(Boolean).length,
        [filters],
    )
    const canSearch = query.trim().length >= 2 || activeFilterCount > 0

    const handleFilterChange = (
        key: keyof CardSearchFilters,
        value: string,
    ) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleSearch = () => {
        const trimmed = query.trim()
        if (trimmed.length < 2 && activeFilterCount === 0) {
            setHasSearched(false)
            setResults([])
            return
        }

        const levelValue = filters.level ? Number(filters.level) : undefined
        const level = Number.isNaN(levelValue) ? undefined : levelValue

        startTransition(async () => {
            const found = await searchCards({
                query: trimmed,
                filters: {
                    type: (filters.type || undefined) as
                        | "Monster"
                        | "Spell"
                        | "Trap"
                        | undefined,
                    race: filters.race || undefined,
                    subtype: filters.subtype || undefined,
                    level,
                    attribute: filters.attribute || undefined,
                },
            })
            setResults(found as Cards[])
            setHasSearched(true)
        })
    }

    const handleTypeChange = (value: string) => {
        const nextType = value === "any" ? "" : value
        setFilters((prev) => ({
            type: nextType,
            race: nextType === "Monster" ? prev.race : "",
            level: nextType === "Monster" ? prev.level : "",
            attribute: nextType === "Monster" ? prev.attribute : "",
            subtype: "",
        }))
    }

    const handleClearSearch = () => {
        setQuery("")
        setHasSearched(false)
        setResults([])
    }

    const handleClearFilters = () => {
        setFilters(DEFAULT_FILTERS)
        handleClearSearch()
    }

    const handleApplyFilters = () => {
        setIsFilterOpen(false)
        handleSearch()
    }

    return (
        <div className="flex h-full flex-1 flex-col gap-3 p-2">
            <SearchBar
                query={query}
                isPending={isPending}
                canSearch={canSearch}
                onChange={setQuery}
                onSearch={handleSearch}
                onClearSearch={handleClearFilters}
                isClearDisabled={results.length === 0}
                onOpenFilters={() => setIsFilterOpen(true)}
            />

            <ScrollArea
                type="auto"
                className="no-scrollbar min-h-0 flex-1 rounded-sm"
            >
                {isPending && (
                    <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                        Đang tìm kiếm...
                    </div>
                )}

                {!isPending && hasSearched && results.length === 0 && (
                    <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                        Không tìm thấy lá bài nào phù hợp
                        {query.trim()
                            ? ` với "${query.trim()}"`
                            : " với bộ lọc"}
                        .
                    </div>
                )}

                {!isPending && results.length > 0 && (
                    <SearchResults results={results} />
                )}
            </ScrollArea>

            <CardFilterDrawer
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                filters={filters}
                onTypeChange={handleTypeChange}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
                onApply={handleApplyFilters}
                canApply={canSearch}
            />
        </div>
    )
}
