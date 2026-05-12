'use server'

import LobbyView from "@/components/lobby/lobby-view";
import TopBar from "@/components/lobby/topbar";

export default async function Lobby() {
    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <TopBar />
            <main className="flex flex-1 overflow-hidden px-4">
                <div className="flex flex-1 bg-background rounded-t-2xl shadow-md border border-b-0 flex-row gap-0 overflow-hidden">
                    <LobbyView />
                </div>
            </main>
        </div>
    )
}
