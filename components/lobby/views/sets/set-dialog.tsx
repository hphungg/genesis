import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Sets, Cards } from "@/db/schema"
import { CardPreview } from "@/components/card-preview"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

type SetWithCards = Sets & { cards?: Cards[] }

interface SetDialogProps {
    selectedSet: SetWithCards | null
    onOpenChange: (open: boolean) => void
    isLoading?: boolean
}

export function SetDialog({
    selectedSet,
    onOpenChange,
    isLoading,
}: SetDialogProps) {
    return (
        <Dialog open={!!selectedSet} onOpenChange={onOpenChange}>
            <DialogContent className="flex h-[90vh] min-w-7xl flex-col overflow-hidden p-6">
                <DialogHeader className="mb-2 shrink-0">
                    <DialogTitle className="text-2xl">
                        {selectedSet?.name}
                    </DialogTitle>
                    {selectedSet?.tags ? (
                        <div className="flex flex-wrap gap-1">
                            {selectedSet.tags.map((tag) => (
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
                            Không có tags
                        </Badge>
                    )}
                    <DialogDescription className="mt-4 text-base">
                        {selectedSet?.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 h-full flex-1 overflow-y-auto pr-2">
                    {isLoading ? (
                        <Spinner className="mt-auto size-10" />
                    ) : selectedSet?.cards && selectedSet.cards.length === 0 ? (
                        <div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
                            Không có lá bài nào nằm trong gói này.
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                            {selectedSet?.cards?.map((card) => (
                                <CardPreview key={card.id} card={card}>
                                    <div
                                        className="bg-muted relative aspect-59/86 overflow-hidden rounded shadow-sm"
                                        title={card.name}
                                    >
                                        <img
                                            src={`https://images.ygoprodeck.com/images/cards/${card.id}.jpg`}
                                            alt={card.name}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                        {card.point && card.point > 0 && (
                                            <span className="absolute top-1 left-1 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                                                {card.point}
                                            </span>
                                        )}
                                    </div>
                                </CardPreview>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
