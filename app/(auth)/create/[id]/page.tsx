"use server"

import SetEditorCardSearch from "@/components/create/card-search/set-editor-card-search"
import SetInfo from "@/components/create/set-info"
import SetEditorTopBar from "@/components/create/topbar"

import { getSetById } from "@/app/api/sets"
import { Separator } from "@/components/ui/separator"
import { SetProvider } from "@/providers/set-provider"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ id: string }>
}

export default async function SetEditorPage({ params }: Props) {
    const { id } = await params
    const setId = parseInt(id, 10)

    if (isNaN(setId)) {
        notFound()
    }

    const set = await getSetById(setId)

    if (!set) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <SetProvider initialSet={set}>
                <SetEditorTopBar />
                <main className="flex flex-1 overflow-hidden px-4">
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
