import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Set } from "@/db/schema"

type SetWithCards = Set & { cards?: { id: string; name: string }[] }

interface SetDialogProps {
    selectedSet: SetWithCards | null
    onOpenChange: (open: boolean) => void
}

export function SetDialog({ selectedSet, onOpenChange }: SetDialogProps) {
    return (
        <Dialog open={!!selectedSet} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-7xl max-h-[90vh] flex flex-col p-6 overflow-hidden">
                <DialogHeader className="shrink-0 mb-2">
                    <DialogTitle className="text-2xl">{selectedSet?.name}</DialogTitle>
                    <div className="flex gap-2 items-center mt-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-foreground/20 bg-foreground text-background uppercase tracking-wide">
                            {selectedSet?.setType}
                        </span>
                    </div>
                    <DialogDescription className="mt-4 text-base">
                        {selectedSet?.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto mt-2 min-h-0 pr-2">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {selectedSet?.cards?.map((card, i) => (
                            <div
                                key={card.id ?? i}
                                className="aspect-59/86 bg-muted rounded overflow-hidden relative shadow-sm"
                                title={card.name}
                            >
                                <img
                                    src={`https://images.ygoprodeck.com/images/cards/${card.id}.jpg`}
                                    alt={card.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
