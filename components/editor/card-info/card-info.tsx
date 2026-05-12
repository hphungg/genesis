"use client"

import { Card } from "@/components/ui/card"

export default function CardInfo() {
    return (
        <div className="flex h-full flex-2 min-w-0 flex-col gap-3 p-4">
            <Card className="overflow-hidden p-0">
                <div className="aspect-59/86 w-full bg-muted" />
            </Card>

            <h2 className="text-center text-base font-semibold">Card Name</h2>

            <div className="flex-1 overflow-y-auto">
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Card text will appear here.
                </p>
            </div>
        </div>
    )
}
