export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-black dark:text-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent"></div>
            </div>
        </div>
    )
}
