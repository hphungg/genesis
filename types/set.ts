import { Card } from "./card"

export type CardSet = {
    id: string
    name: string
    description: string
    tags: string[]
    cards: Card[]
    createdAt: Date
    updatedAt: Date
}
