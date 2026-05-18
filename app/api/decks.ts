"use server"

import { revalidatePath } from "next/cache"
import { and, eq } from "drizzle-orm"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db/database"
import { deckCards, decks } from "@/db/schema"
import { Deck } from "@/types/deck"

export type DeckSummary = Omit<typeof decks.$inferSelect, "userId">

export type DeckEditorInput = {
    name: string
    points?: number
    coverId?: string | null
    mainDeckIds?: string[]
    extraDeckIds?: string[]
    sideDeckIds?: string[]
}

const buildDeckCards = (deckId: number, data: DeckEditorInput) => {
    const main = data.mainDeckIds ?? []
    const extra = data.extraDeckIds ?? []
    const side = data.sideDeckIds ?? []

    return [
        ...main.map((cardId) => ({
            deckId,
            cardId,
            section: "main" as const,
        })),
        ...extra.map((cardId) => ({
            deckId,
            cardId,
            section: "extra" as const,
        })),
        ...side.map((cardId) => ({
            deckId,
            cardId,
            section: "side" as const,
        })),
    ]
}

export async function getAllDeck(userId: string): Promise<DeckSummary[]> {
    const results = await db.query.decks.findMany({
        where: eq(decks.userId, userId),
        orderBy: (decks, { desc }) => [desc(decks.updatedAt)],
    })

    return results.map(({ userId: _, ...deckData }) => deckData)
}

export async function deleteDeck(deckId: number) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: "Not authenticated" }
    }

    const [deleted] = await db
        .delete(decks)
        .where(and(eq(decks.id, deckId), eq(decks.userId, user.id)))
        .returning()

    if (!deleted) {
        return { success: false, error: "Deck not found" }
    }

    revalidatePath("/")
    return { success: true }
}

export async function getDeckById(deckId: number): Promise<Deck | null> {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const result = await db.query.decks.findFirst({
        where: and(eq(decks.id, deckId), eq(decks.userId, user.id)),
        with: {
            deckCards: true,
        },
    })

    if (!result) return null

    const mainDeck = result.deckCards
        .filter((card) => card.section === "main")
        .map((card) => card.cardId)
    const extraDeck = result.deckCards
        .filter((card) => card.section === "extra")
        .map((card) => card.cardId)
    const sideDeck = result.deckCards
        .filter((card) => card.section === "side")
        .map((card) => card.cardId)

    return {
        id: result.id,
        name: result.name,
        points: result.points,
        main_deck: mainDeck,
        extra_deck: extraDeck,
        side_deck: sideDeck,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
    }
}

export async function createDeck(data: DeckEditorInput) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Not authenticated")
    }

    const [newDeck] = await db
        .insert(decks)
        .values({
            userId: user.id,
            name: data.name,
            coverId: data.coverId ?? null,
            points: data.points ?? 0,
        })
        .returning()

    const relationsToInsert = buildDeckCards(newDeck.id, data)
    if (relationsToInsert.length > 0) {
        await db.insert(deckCards).values(relationsToInsert)
    }

    revalidatePath("/")
    revalidatePath(`/deck/${newDeck.id}`)

    return newDeck
}

export async function updateDeck(deckId: number, data: DeckEditorInput) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Not authenticated")
    }

    const [updated] = await db
        .update(decks)
        .set({
            name: data.name,
            coverId: data.coverId ?? null,
            points: data.points ?? 0,
            updatedAt: new Date(),
        })
        .where(and(eq(decks.id, deckId), eq(decks.userId, user.id)))
        .returning()

    if (!updated) {
        throw new Error("Deck not found")
    }

    await db.delete(deckCards).where(eq(deckCards.deckId, deckId))

    const relationsToInsert = buildDeckCards(deckId, data)
    if (relationsToInsert.length > 0) {
        await db.insert(deckCards).values(relationsToInsert)
    }

    revalidatePath("/")
    revalidatePath(`/deck/${deckId}`)
}
