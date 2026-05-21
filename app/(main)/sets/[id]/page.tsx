import SetEditorCardSearch from "@/components/sets/card-search"
import SetInfo from "@/components/sets/set-info"
import SetEditorTopBar from "@/components/sets/set-topbar"

import { getSetById } from "@/app/api/sets"
import { Separator } from "@/components/ui/separator"
import { SetProvider } from "@/providers/set-provider"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ id: string }>
}

export default async function SetEditorPage({ params }: Props) {
    const { id } = await params
    let set;

    if (id === "new") {
        set = {
            id: 0,
            name: "New Set",
            description: "",
            setType: "Archetype",
            coverId: null,
            tags: [],
            cards: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any
    } else {
        const setId = parseInt(id, 10)
        if (isNaN(setId)) {
            notFound()
        }

        set = await getSetById(setId)
        if (!set) {
            notFound()
        }
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-muted">
            <SetProvider initialSet={set}>
                <SetEditorTopBar />
                <main className="flex flex-1 px-4 min-h-0 overflow-hidden">
                    <div className="flex flex-1 bg-background rounded-t-2xl shadow-md border border-b-0 flex-row gap-0 overflow-hidden">
                        <SetEditorCardSearch />
                        <Separator orientation="vertical" className="self-stretch" />
                        <SetInfo />
                    </div>
                </main>
            </SetProvider>
        </div>
    )
}
