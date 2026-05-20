import { Badge } from "@/components/ui/badge"
import { Sets } from "@/db/schema"

interface SetCardProps {
    set: Sets
    onClick: () => void
}

export function SetCard({ set, onClick }: SetCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-card group relative flex aspect-3/2 cursor-pointer flex-col overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-xl"
        >
            <div className="bg-muted absolute inset-0">
                {set.coverId ? (
                    <img
                        src={`https://images.ygoprodeck.com/images/cards_cropped/${set.coverId}.jpg`}
                        alt={set.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="from-primary/20 to-primary/5 h-full w-full bg-linear-to-br opacity-50" />
                )}
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-1 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 pt-8">
                <h3 className="truncate text-lg font-bold text-white">
                    {set.name}
                </h3>
                {set.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {set.tags.map((tag) => (
                            <Badge
                                key={tag}
                                className="border-white bg-black text-xs font-semibold tracking-wide uppercase"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <Badge className="border-white bg-black text-xs font-semibold tracking-wide uppercase">
                        No tags
                    </Badge>
                )}
            </div>
        </div>
    )
}
