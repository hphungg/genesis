"use server"

import { db } from "@/db/database"
import { cards } from "@/db/schema"
import { and, eq, ilike } from "drizzle-orm"

export async function getAllCards() {
    const result = await db.query.cards.findMany()
    return result
}

export async function getCardById(cardId: string) {
    const result = await db.query.cards.findFirst({
        where: eq(cards.id, cardId),
    })

    return result || null
}

export async function getCardPaginated(
    page: number = 1,
    pageSize: number = 50,
) {
    const offset = (page - 1) * pageSize

    const result = await db.query.cards.findMany({
        limit: pageSize,
        offset: offset,
    })

    return result
}

export async function searchCardsByName(query: string) {
    if (!query) return []

    const result = await db.query.cards.findMany({
        where: ilike(cards.name, `%${query}%`),
    })

    return result
}

export type CardSearchFilters = {
    type?: "Monster" | "Spell" | "Trap"
    race?: string
    subtype?: string
    level?: number
    attribute?: string
}

export async function searchCards({
    query,
    filters,
    limit,
}: {
    query?: string
    filters?: CardSearchFilters
    limit?: number
}) {
    const trimmed = query?.trim() ?? ""
    const hasQuery = trimmed.length >= 2
    const hasFilters = Boolean(
        filters?.type ||
        filters?.race ||
        filters?.subtype ||
        filters?.level !== undefined ||
        filters?.attribute,
    )

    if (!hasQuery && !hasFilters) return []

    const conditions = []

    if (hasQuery) {
        conditions.push(ilike(cards.name, `%${trimmed}%`))
    }

    if (filters?.type) {
        conditions.push(eq(cards.type, filters.type))
    }

    if (filters?.type === "Monster") {
        if (filters.race) {
            conditions.push(eq(cards.type1, filters.race))
        }
        if (filters.subtype) {
            conditions.push(eq(cards.type2, filters.subtype))
        }
        if (filters.level !== undefined) {
            conditions.push(eq(cards.level, filters.level))
        }
        if (filters.attribute) {
            conditions.push(eq(cards.attribute, filters.attribute))
        }
    }

    if (filters?.type === "Spell" || filters?.type === "Trap") {
        if (filters.subtype) {
            conditions.push(eq(cards.type1, filters.subtype))
        }
    }

    const result = await db.query.cards.findMany({
        where: conditions.length ? and(...conditions) : undefined,
        ...(typeof limit === "number" ? { limit } : {}),
    })

    return result
}
