"use server"

import { db } from "@/db/database"
import { Cards, deckCards, decks } from "@/db/schema"
import { createClient } from "@/lib/supabase/server"
import { and, eq } from "drizzle-orm"
import {
    revalidatePath,
    cacheTag,
    updateTag,
} from "next/cache"

export type DeckSummary = Omit<typeof decks.$inferSelect, "userId"> & {
    mainCount: number
}

export type DeckContents = {
    main: Cards[]
    extra: Cards[]
    side: Cards[]
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

async function getCachedAllDecks(userId: string): Promise<DeckSummary[]> {
    "use cache"
    cacheTag("decks", `decks-${userId}`)

    const results = await db.query.decks.findMany({
        where: eq(decks.userId, userId),
        orderBy: (deck, { desc }) => [desc(deck.updatedAt)],
        with: {
            deckCards: {
                columns: {
                    section: true,
                },
            },
        },
    })

    return results.map(({ userId, deckCards, ...rest }) => ({
        ...rest,
        coverId: rest.coverId ?? null,
        mainCount: deckCards.filter((dc) => dc.section === "main").length,
    }))
}

export async function getAllDecks(userId: string): Promise<DeckSummary[]> {
    if (!userId) return []
    return getCachedAllDecks(userId)
}

async function getCachedDeckById(id: number, userId: string): Promise<DeckDetail | null> {
    "use cache"
    cacheTag("decks", `decks-${userId}`, `deck-${id}`)

    const result = await db.query.decks.findFirst({
        where: and(eq(decks.id, id), eq(decks.userId, userId)),
        with: { deckCards: { with: { card: true } } },
    })

    if (!result) return null

    const { deckCards: rows, userId: _, ...deckData } = result

    return {
        ...deckData,
        main: rows.filter((r) => r.section === "main").map((r) => r.card),
        extra: rows.filter((r) => r.section === "extra").map((r) => r.card),
        side: rows.filter((r) => r.section === "side").map((r) => r.card),
    }
}

export async function getDeckById(id: number, userId: string): Promise<DeckDetail | null> {
    if (!userId) return null
    return getCachedDeckById(id, userId)
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

    // Immediately invalidate the decks cache so the user sees the new deck
    updateTag("decks")
    updateTag(`decks-${user.id}`)
    revalidatePath("/")
    revalidatePath(`/deck/${newDeck.id}`)

    const { userId, ...deckData } = newDeck
    return {
        ...deckData,
        coverId: deckData.coverId ?? null,
        createdAt: new Date(deckData.createdAt),
        updatedAt: new Date(deckData.updatedAt),
        mainCount: data.mainDeckIds?.length ?? 0,
    }
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

    // Immediately invalidate so the user sees updated data after redirect
    updateTag("decks")
    updateTag(`decks-${user.id}`)
    updateTag(`deck-${deckId}`)
    revalidatePath("/")
    revalidatePath(`/deck/${deckId}`)

    const { userId, ...deckData } = updatedDeck
    return {
        ...deckData,
        coverId: deckData.coverId ?? null,
        createdAt: new Date(deckData.createdAt),
        updatedAt: new Date(deckData.updatedAt),
        mainCount: data.mainDeckIds?.length ?? 0,
    }
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

    updateTag("decks")
    updateTag(`decks-${user.id}`)
    revalidatePath("/")
    return { success: true }
}
