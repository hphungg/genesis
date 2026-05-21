"use server"

import { db } from "@/db/database"
import { sets, setCards } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

async function getAuthUser() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const user = data?.claims
    return user
}

export async function getSetById(setId: number) {
    const result = await db.query.sets.findFirst({
        where: eq(sets.id, setId),
        with: {
            setCards: {
                with: {
                    card: true,
                },
            },
        },
    })

    if (!result) return null

    const { setCards: _, ...setData } = result
    return {
        ...setData,
        cards: result.setCards.map((sc) => sc.card),
    }
}

export type CreateSetInput = {
    name?: string
    description?: string
    tags?: string[]
    setType?: string
    coverId?: string | null
    cardIds?: string[]
}

export async function createSet(data: CreateSetInput) {
    const user = await getAuthUser()
    if (!user) throw new Error("Unauthorized")

    const [newSet] = await db
        .insert(sets)
        .values({
            name: data.name,
            description: data.description,
            tags: data.tags,
            setType: data.setType,
            coverId: data.coverId,
        })
        .returning()

    if (data.cardIds && data.cardIds.length > 0) {
        const relationsToInsert = data.cardIds.map((cardId) => ({
            setId: newSet.id,
            cardId: cardId,
        }))
        await db.insert(setCards).values(relationsToInsert)
    }

    revalidatePath("/")
    revalidatePath("/sets")
    return newSet
}

export type UpdateSetInput = {
    name?: string
    description?: string
    tags?: string[]
    cardIds?: string[]
    setType?: string
    coverId?: string | null
}

export async function updateSet(setId: number, data: UpdateSetInput) {
    const user = await getAuthUser()
    if (!user) throw new Error("Unauthorized")

    const setUpdateData: Partial<CreateSetInput> = {}
    if (data.name !== undefined) setUpdateData.name = data.name
    if (data.description !== undefined)
        setUpdateData.description = data.description
    if (data.tags !== undefined) setUpdateData.tags = data.tags
    if (data.setType !== undefined) setUpdateData.setType = data.setType
    if (data.coverId !== undefined) setUpdateData.coverId = data.coverId

    if (Object.keys(setUpdateData).length > 0) {
        await db
            .update(sets)
            .set({ ...setUpdateData, updatedAt: new Date() })
            .where(eq(sets.id, setId))
    }

    if (data.cardIds) {
        await db.delete(setCards).where(eq(setCards.setId, setId))

        if (data.cardIds.length > 0) {
            const relationsToInsert = data.cardIds.map((cardId) => ({
                setId: setId,
                cardId: cardId,
            }))
            await db.insert(setCards).values(relationsToInsert)
        }
    }

    const updatedSet = await db.query.sets.findFirst({
        where: eq(sets.id, setId),
        with: { setCards: { with: { card: true } } },
    })

    revalidatePath("/")
    revalidatePath("/sets")
    revalidatePath(`/sets/${setId}`)
    return updatedSet
}

export async function deleteSet(setId: number) {
    const user = await getAuthUser()
    if (!user) return { success: false, error: "Unauthorized" }

    const [deletedSet] = await db
        .delete(sets)
        .where(eq(sets.id, setId))
        .returning()

    revalidatePath("/")
    revalidatePath("/sets")
    return deletedSet
}

export async function getAllSet() {
    return await db.query.sets.findMany({
        orderBy: (sets, { desc }) => [desc(sets.createdAt)],
    })
}
