import { Button } from "@/components/ui/button"

export default function DecksView() {
    return (
        <div className="flex flex-1 flex-col p-6 w-full">
            <h2 className="text-2xl font-bold mb-6">My Decks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="border rounded-xl p-4 bg-muted/50 aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <span className="text-lg font-semibold text-muted-foreground">+ Create New Deck</span>
                </div>
                <div className="border-2 rounded-xl p-4 bg-card shadow-sm flex flex-col justify-between aspect-video cursor-pointer hover:border-primary transition-colors">
                    <div>
                        <h3 className="font-bold text-lg">Snake-Eye Rescue</h3>
                        <p className="text-sm text-muted-foreground mt-1">40 Main • 15 Extra</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Updated 2 hours ago</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">Meta</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
