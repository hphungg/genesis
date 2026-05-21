export default function Loading() {
    return (
        <div className="bg-muted flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
                <div className="border-muted-foreground/30 border-t-muted-foreground h-10 w-10 animate-spin rounded-full border-2" />
                <p className="text-muted-foreground text-lg">Đang tải</p>
            </div>
        </div>
    )
}
