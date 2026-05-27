import SetEditorCardSearch from "@/components/sets/card-search"
import SetInfo from "@/components/sets/set-info"
import SetEditorTopBar from "@/components/sets/set-topbar"

import { getSetById } from "@/app/api/sets"
import { Separator } from "@/components/ui/separator"
import { SetProvider, type SetWithCards } from "@/providers/set-provider"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ id: string }>
}

export default async function SetEditorPage({ params }: Props) {
    const { id } = await params
    let set: SetWithCards

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
        }
    } else {
        const setId = parseInt(id, 10)
        if (isNaN(setId)) {
            notFound()
        }

        const loadedSet = await getSetById(setId)
        if (!loadedSet) {
            notFound()
        }
        set = loadedSet
    }

    return (
        <div className="bg-muted flex h-screen flex-col overflow-hidden">
            <SetProvider initialSet={set}>
                <SetEditorTopBar />
                <main className="flex min-h-0 flex-1 overflow-hidden px-4">
                    <div className="bg-background flex flex-1 flex-row gap-0 overflow-hidden rounded-t-2xl border border-b-0 shadow-md">
                        <SetEditorCardSearch />
                        <Separator
                            orientation="vertical"
                            className="self-stretch"
                        />
                        <SetInfo />
                    </div>
                </main>
            </SetProvider>
        </div>
    )
}
