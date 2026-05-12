export type Deck = {
    id: string
    name: string
    main_deck: bigint[]
    extra_deck: bigint[]
    side_deck: bigint[]
    points: number
    created_at: Date
    updated_at: Date
}
