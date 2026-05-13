"use client"

import { deleteSet, getAllSet } from "@/app/api/sets"
import { Button } from "@/components/ui/button"
import { TrashIcon, PencilIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import LandingTopBar from "@/components/create/landing-topbar"

export default function CreateSetLanding() {
    const [sets, setSets] = useState<any[]>([])

    useEffect(() => {
        getAllSet().then(setSets)
    }, [])

    const handleDelete = async (id: number) => {
        await deleteSet(id)
        setSets((prev) => prev.filter((s) => s.id !== id))
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <LandingTopBar />

            <main className="flex flex-1 flex-col items-center px-4 py-8">
                <div className="w-full max-w-4xl bg-background rounded-xl p-6 shadow-sm border">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">All Sets</h2>
                    </div>
                    <div className="rounded-md border overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">ID</th>
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Created At</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {sets.map((set) => (
                                    <tr key={set.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-3">{set.id}</td>
                                        <td className="px-4 py-3 font-medium">{set.name}</td>
                                        <td className="px-4 py-3">{set.setType || "custom"}</td>
                                        <td className="px-4 py-3">{new Date(set.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/create/${set.id}`}>
                                                        <PencilIcon size={16} />
                                                    </Link>
                                                </Button>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(set.id)}>
                                                    <TrashIcon size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {sets.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                            No sets found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
