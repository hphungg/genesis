"use server"

import { postgresdb } from "@/db/database"
import { cards } from "@/db/schema"
import { eq, ilike } from "drizzle-orm"

export async function getAllCards() {
    const result = await postgresdb.query.cards.findMany()
    return result
}

export async function getCardById(cardId: string) {
    const result = await postgresdb.query.cards.findFirst({
        where: eq(cards.id, cardId),
    })

    return result || null
}

export async function getCardPaginated(
    page: number = 1,
    pageSize: number = 50,
) {
    const offset = (page - 1) * pageSize

    const result = await postgresdb.query.cards.findMany({
        limit: pageSize,
        offset: offset,
    })

    return result
}

export async function searchCardsByName(query: string) {
    if (!query) return []
    
    const result = await postgresdb.query.cards.findMany({
        where: ilike(cards.name, `%${query}%`),
        limit: 50,
    })
    
    return result
}
