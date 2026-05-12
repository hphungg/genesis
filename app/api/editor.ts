import { Deck } from "@/types/deck"

export async function getDeckById(id: string): Promise<Deck> {
    return {
        id,
        name: "Sample Deck",
        main_deck: [],
        extra_deck: [],
        side_deck: [],
        points: 0,
        created_at: new Date(),
        updated_at: new Date(),
    }
}
