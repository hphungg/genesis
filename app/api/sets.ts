"use server"

import { postgresdb } from "@/db/database"
import { set, setCards } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getSetById(setId: number) {
    const result = await postgresdb.query.set.findFirst({
        where: eq(set.id, setId),
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
    const [newSet] = await postgresdb
        .insert(set)
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
        await postgresdb.insert(setCards).values(relationsToInsert)
    }

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
    const setUpdateData: Partial<CreateSetInput> = {}
    if (data.name !== undefined) setUpdateData.name = data.name
    if (data.description !== undefined)
        setUpdateData.description = data.description
    if (data.tags !== undefined) setUpdateData.tags = data.tags
    if (data.setType !== undefined) setUpdateData.setType = data.setType
    if (data.coverId !== undefined) setUpdateData.coverId = data.coverId

    if (Object.keys(setUpdateData).length > 0) {
        await postgresdb
            .update(set)
            .set({ ...setUpdateData, updatedAt: new Date() })
            .where(eq(set.id, setId))
    }

    if (data.cardIds) {
        await postgresdb.delete(setCards).where(eq(setCards.setId, setId))

        if (data.cardIds.length > 0) {
            const relationsToInsert = data.cardIds.map((cardId) => ({
                setId: setId,
                cardId: cardId,
            }))
            await postgresdb.insert(setCards).values(relationsToInsert)
        }
    }

    const updatedSet = await postgresdb.query.set.findFirst({
        where: eq(set.id, setId),
        with: { setCards: { with: { card: true } } },
    })

    revalidatePath("/sets")
    revalidatePath(`/sets/${setId}`)
    return updatedSet
}

export async function deleteSet(setId: number) {
    const [deletedSet] = await postgresdb
        .delete(set)
        .where(eq(set.id, setId))
        .returning()
    revalidatePath("/sets")
    return deletedSet
}

export async function getAllSet() {
    return await postgresdb.query.set.findMany({
        orderBy: (set, { desc }) => [desc(set.createdAt)],
    })
}
