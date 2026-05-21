import { getAllSet } from "@/app/api/sets"
import { getAllDecks } from "@/app/api/decks"
import LobbyView from "@/components/lobby/lobby-view"
import TopBar from "@/components/lobby/topbar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Lobby() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const user = data?.claims

    if (!user) {
        redirect("/signin")
    }

    const [sets, decks] = await Promise.all([getAllSet(), getAllDecks(user.id)])

    return (
        <div className="bg-muted flex min-h-screen flex-col">
            <TopBar
                displayName={
                    user.user_metadata?.display_name ?? user.email ?? "Duelist"
                }
            />
            <main className="flex flex-1 overflow-hidden px-4">
                <div className="bg-background flex flex-1 flex-row gap-0 overflow-hidden rounded-t-2xl border border-b-0 shadow-md">
                    <LobbyView
                        initialSets={sets}
                        initialDecks={decks}
                        userId={user.id}
                    />
                </div>
            </main>
        </div>
    )
}
