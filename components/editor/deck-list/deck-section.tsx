import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DeckSectionProps {
    title: string
    count: number
    rows?: number
}

const rowHeightMap: Record<number, string> = {
    1: "min-h-[5rem]",
    5: "min-h-[25rem]",
}

export default function DeckSection({ title, count, rows = 1 }: DeckSectionProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">{title}</h3>
                <span className="text-base text-muted-foreground">{count}</span>
            </div>

            <Card className={cn("p-2 rounded-md", rowHeightMap[rows])}>
                <div className="grid auto-rows-auto grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-1">
                    {/* Card slots will be rendered here */}
                </div>
            </Card>
        </div>
    )
}
