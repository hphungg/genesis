import type { Cards } from "@/db/schema"

const normalizeType = (value?: string) => (value ?? "").toLowerCase()

const getTypeRank = (type?: string) => {
    const normalized = normalizeType(type)

    if (normalized.includes("monster")) return 0
    if (normalized.includes("extra")) return 1
    if (normalized.includes("spell")) return 2
    if (normalized.includes("trap") || normalized.includes("card")) return 3

    return 99
}

const getMonsterSubtypeRank = (type2?: string) => {
    const sub = normalizeType(type2)

    if (sub.includes("normal")) return 0

    return 1
}

const getExtraSubtypeRank = (type2?: string) => {
    const sub = normalizeType(type2)

    if (sub.includes("fusion")) return 0
    if (sub.includes("synchro")) return 1
    if (sub.includes("xyz")) return 2

    return 3
}

const getSpellSubtypeRank = (type1?: string) => {
    const sub = normalizeType(type1)

    if (sub.includes("normal")) return 0
    if (sub.includes("continuous")) return 1
    if (sub.includes("quick")) return 2
    if (sub.includes("field")) return 3
    if (sub.includes("equip")) return 4
    if (sub.includes("ritual")) return 5

    return 6
}

const getTrapSubtypeRank = (type1?: string) => {
    const sub = normalizeType(type1)

    if (sub.includes("normal")) return 0
    if (sub.includes("continuous")) return 1
    if (sub.includes("counter")) return 2

    return 3
}

export const getCardSortRank = (card: Cards) => {
    const type = normalizeType(card.type)
    const typeRank = getTypeRank(card.type)

    if (type.includes("monster")) {
        return typeRank * 100 + getMonsterSubtypeRank(card.type2 || undefined)
    }

    if (type.includes("extra")) {
        return typeRank * 100 + getExtraSubtypeRank(card.type2 || undefined)
    }

    if (type.includes("spell")) {
        return typeRank * 100 + getSpellSubtypeRank(card.type1)
    }

    if (type.includes("trap") || type.includes("card")) {
        return typeRank * 100 + getTrapSubtypeRank(card.type1)
    }

    return typeRank * 100
}

export const compareCards = (a: Cards, b: Cards) => {
    const rankDiff = getCardSortRank(a) - getCardSortRank(b)
    if (rankDiff !== 0) return rankDiff

    return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
    })
}

export const sortCards = (cards: Cards[]) => [...cards].sort(compareCards)
