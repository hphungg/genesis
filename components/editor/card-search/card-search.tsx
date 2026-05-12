"use client"

import SearchBar from "./search-bar"
import SearchResults from "./search-results"

export default function CardSearch() {
    return (
        <div className="flex h-full flex-2 min-w-0 flex-col gap-3 p-4">
            <SearchBar />
            <SearchResults />
        </div>
    )
}
