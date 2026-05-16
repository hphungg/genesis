export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-medium">Loading</p>
            </div>
        </div>
    )
}
