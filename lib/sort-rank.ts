import { Card } from "@/db/schema"

const normalizeType = (value?: string) => (value ?? "").toLowerCase()

const getMonsterRank = (type2?: string) => {
    if (type2 == undefined) return 1
    const sub = normalizeType(type2)
    if (sub.includes("normal")) return 0
    if (sub.includes("fusion")) return 2
    if (sub.includes("synchro")) return 3
    if (sub.includes("xyz")) return 4
    return 1
}

const getSpellRank = (type1?: string) => {
    const sub = normalizeType(type1)
    if (sub.includes("normal")) return 0
    if (sub.includes("quick")) return 1
    if (sub.includes("continuous")) return 2
    if (sub.includes("equip")) return 3
    if (sub.includes("field")) return 4
    return 5
}

const getTrapRank = (type1?: string) => {
    const sub = normalizeType(type1)
    if (sub.includes("normal")) return 0
    if (sub.includes("continuous")) return 1
    if (sub.includes("counter")) return 2
    return 3
}

export const getCardSortRank = (card: Card) => {
    const type = normalizeType(card.type)

    if (type.includes("monster") || type.includes("extra")) {
        return getMonsterRank(card.type2 || undefined)
    }

    if (type.includes("spell")) {
        return 10 + getSpellRank(card.type1)
    }

    if (type.includes("trap")) {
        return 20 + getTrapRank(card.type1)
    }

    return 999
}
