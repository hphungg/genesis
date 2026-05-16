import { Card } from "@/db/schema"

export type CardSet = {
    id: string
    name: string
    description: string
    tags: string[]
    cards: Card[]
    createdAt: Date
    updatedAt: Date
}
