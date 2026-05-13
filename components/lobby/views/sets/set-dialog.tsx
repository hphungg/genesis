import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SetDialogProps {
    selectedSet: any | null;
    onOpenChange: (open: boolean) => void;
}

export function SetDialog({ selectedSet, onOpenChange }: SetDialogProps) {
    return (
        <Dialog open={!!selectedSet} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-7xl max-h-[90vh] flex flex-col p-6 overflow-hidden">
                <DialogHeader className="shrink-0 mb-2">
                    <DialogTitle className="text-2xl">{selectedSet?.name}</DialogTitle>
                    <div className="flex gap-2 items-center mt-2">
                        <span className="bg-teal-600/90 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {selectedSet?.tag}
                        </span>
                    </div>
                    <DialogDescription className="mt-4 text-base">
                        {selectedSet?.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto mt-2 min-h-0 pr-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {selectedSet?.cards?.map((card: any, i: number) => (
                            <div key={card.id ?? i} className="aspect-59/86 bg-muted rounded-sm border flex items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                                <span className="text-sm text-muted-foreground z-10 font-medium">{card.name ?? `Card ${i + 1}`}</span>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
