import { getAllSet } from "@/app/api/sets"
import LandingTopBar from "@/components/sets/topbar"
import SetGrid from "@/components/sets/set-grid"

export default async function CreateSetLanding() {
    const sets = await getAllSet()

    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <LandingTopBar />

            <main className="flex flex-1 flex-col items-center px-4 py-8">
                <div className="w-full max-w-6xl">
                    <SetGrid initialSets={sets} />
                </div>
            </main>
        </div>
    )
}
