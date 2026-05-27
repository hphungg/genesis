import { Suspense } from "react"
import Loading from "@/app/loading"
import { getAllSet } from "@/app/api/sets"

import TopBar from "@/components/sets/topbar"
import SetGrid from "@/components/sets/set-grid"

export const dynamic = "force-dynamic"

export default async function CreateSetLanding() {
    return (
        <div className="bg-muted flex min-h-screen flex-col">
            <TopBar />

            <main className="flex flex-1 flex-col items-center px-4 py-8">
                <div className="w-full max-w-6xl">
                    <Suspense fallback={<Loading />}>
                        <SetContent />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

async function SetContent() {
    const sets = await getAllSet()
    return <SetGrid initialSets={sets} />
}
