"use server"

import { db } from "@/db/database"
import { deckCards, decks } from "@/db/schema"
import { createClient } from "@/lib/supabase/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type DeckSummary = Omit<typeof decks.$inferSelect, "userId">

export type DeckContents = {
    main: string[]
    extra: string[]
    side: string[]
}

export type DeckDetail = Omit<typeof decks.$inferSelect, "userId"> &
    DeckContents

export type DeckEditorInput = {
    name: string
    points: number
    coverId?: string | null
    mainDeckIds: string[]
    extraDeckIds: string[]
    sideDeckIds: string[]
}

function buildDeckCards(deckId: number, data: DeckEditorInput) {
    const main = data.mainDeckIds ?? []
    const extra = data.extraDeckIds ?? []
    const side = data.sideDeckIds ?? []

    return [
        ...main.map((cardId) => ({ deckId, cardId, section: "main" as const })),
        ...extra.map((cardId) => ({
            deckId,
            cardId,
            section: "extra" as const,
        })),
        ...side.map((cardId) => ({ deckId, cardId, section: "side" as const })),
    ]
}

async function getAuthUser() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user
}

export async function getAllDecks(): Promise<DeckSummary[]> {
    const user = await getAuthUser()
    if (!user) {
        return []
    }

    const results = await db.query.decks.findMany({
        where: eq(decks.userId, user.id),
        orderBy: (deck, { desc }) => [desc(deck.updatedAt)],
    })

    return results.map(({ userId, ...rest }) => rest)
}

export async function getDeckById(id: number): Promise<DeckDetail | null> {
    const user = await getAuthUser()
    if (!user) {
        return null
    }

    const result = await db.query.decks.findFirst({
        where: and(eq(decks.id, id), eq(decks.userId, user.id)),
        with: { deckCards: true },
    })

    if (!result) {
        return null
    }

    const { deckCards: rows, ...deckData } = result

    return {
        ...deckData,
        main: rows.filter((r) => r.section === "main").map((r) => r.cardId),
        extra: rows.filter((r) => r.section === "extra").map((r) => r.cardId),
        side: rows.filter((r) => r.section === "side").map((r) => r.cardId),
    }
}

export async function createDeck(data: DeckEditorInput): Promise<DeckSummary> {
    const user = await getAuthUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const [newDeck] = await db
        .insert(decks)
        .values({
            userId: user.id,
            name: data.name,
            points: data.points ?? 0,
            coverId: data.coverId ?? null,
        })
        .returning()

    const rows = buildDeckCards(newDeck.id, data)
    if (rows.length > 0) {
        await db.insert(deckCards).values(rows)
    }

    revalidatePath("/")
    revalidatePath(`/deck/${newDeck.id}`)

    const { userId, ...deckData } = newDeck
    return deckData
}

export async function updateDeck(
    deckId: number,
    data: DeckEditorInput,
): Promise<DeckSummary> {
    const user = await getAuthUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const [updatedDeck] = await db
        .update(decks)
        .set({
            name: data.name,
            points: data.points ?? 0,
            coverId: data.coverId ?? null,
            updatedAt: new Date(),
        })
        .where(and(eq(decks.id, deckId), eq(decks.userId, user.id)))
        .returning()

    if (!updatedDeck) {
        throw new Error("Deck not found or unauthorized")
    }

    await db.delete(deckCards).where(eq(deckCards.deckId, deckId))

    const rows = buildDeckCards(deckId, data)
    if (rows.length > 0) {
        await db.insert(deckCards).values(rows)
    }

    revalidatePath("/")
    revalidatePath(`/deck/${deckId}`)

    const { userId, ...deckData } = updatedDeck
    return deckData
}

export async function deleteDeck(
    deckId: number,
): Promise<{ success: boolean; error?: string }> {
    const user = await getAuthUser()
    if (!user) {
        return { success: false, error: "Unauthorized" }
    }

    const [deleted] = await db
        .delete(decks)
        .where(and(eq(decks.id, deckId), eq(decks.userId, user.id)))
        .returning()

    if (!deleted) {
        return { success: false, error: "Deck not found or unauthorized" }
    }

    revalidatePath("/")
    return { success: true }
}
