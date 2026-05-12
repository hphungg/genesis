"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Funnel, FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

export default function SearchBar() {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
                <Input placeholder="Search cards..." className="flex-1" />
                <Button>
                    Search
                </Button>
            </div>
            <Button variant="outline" className="w-full">
                <FunnelIcon />
                Filter
            </Button>
        </div>
    )
}
