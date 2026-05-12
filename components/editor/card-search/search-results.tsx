"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

export default function SearchResults() {
    return (
        <ScrollArea className="flex-1">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-1.5 p-1">
                {/* Search result card slots will be rendered here */}
            </div>
        </ScrollArea>
    )
}
