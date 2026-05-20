"use client"

import { createDeck, updateDeck } from "@/app/api/decks"
import { Cards } from "@/db/schema"
import { createContext, useContext, useState } from "react"
import { type DeckDetail } from "@/app/api/decks"

type EditorDeck = Omit<DeckDetail, "main" | "extra" | "side">

interface DeckContents {
    main: Cards[]
    extra: Cards[]
    side: Cards[]
}

interface EditorContextType {
    deck: EditorDeck
    contents: DeckContents
    hoveredCard: Cards | null
    setHoveredCard: (card: Cards | null) => void
    setName: (name: string) => void
    setCoverId: (id: string | null) => void
    addCard: (card: Cards) => void
    addSideCard: (card: Cards) => void
    removeCard: (card: Cards, section: "main" | "extra" | "side") => void
    sortCards: () => void
    save: () => Promise<void>
}

const EditorContext = createContext<EditorContextType | null>(null)

export function EditorProvider({
    children,
    initialDeck,
    initialContents,
}: {
    children: React.ReactNode
    initialDeck: EditorDeck
    initialContents?: DeckContents
}) {
    const [deck, setDeck] = useState<EditorDeck>(initialDeck)
    const [hoveredCard, setHoveredCard] = useState<Cards | null>(null)
    const [contents, setContents] = useState<DeckContents>(
        initialContents ?? {
            main: [],
            extra: [],
            side: [],
        },
    )

    const setName = (name: string) => setDeck((prev) => ({ ...prev, name }))

    const setCoverId = (id: string | null) =>
        setDeck((prev) => ({ ...prev, coverId: id }))

    const sortMainCards = (cards: Cards[]): Cards[] => {
        const typeOrder = (card: Cards) => {
            const t = card.type?.toLowerCase() ?? ""
            if (t === "monster") return 0
            if (t === "spell") return 1
            if (t === "trap") return 2
            return 3
        }
        return [...cards].sort((a, b) => {
            const diff = typeOrder(a) - typeOrder(b)
            if (diff !== 0) return diff
            return a.name.localeCompare(b.name)
        })
    }

    const sortExtraCards = (cards: Cards[]): Cards[] => {
        const typeOrder = (card: Cards) => {
            const t2 = card.type2?.toLowerCase() ?? ""
            if (t2 === "fusion") return 0
            if (t2 === "synchro") return 1
            if (t2 === "xyz") return 2
            return 3
        }
        return [...cards].sort((a, b) => {
            const diff = typeOrder(a) - typeOrder(b)
            if (diff !== 0) return diff
            return a.name.localeCompare(b.name)
        })
    }

    const sortSideCards = (cards: Cards[]): Cards[] => {
        const mainCards = cards.filter((c) => c.type !== "Extra")
        const extraCards = cards.filter((c) => c.type === "Extra")
        return [...sortMainCards(mainCards), ...sortExtraCards(extraCards)]
    }

    const sortCards = () => {
        setContents((prev) => ({
            main: sortMainCards(prev.main),
            extra: sortExtraCards(prev.extra),
            side: sortSideCards(prev.side),
        }))
    }

    // Fixed: read state from the updater argument to avoid stale closure
    const addCard = (card: Cards) => {
        setContents((prev) => {
            const totalCopies = [...prev.main, ...prev.extra, ...prev.side]
                .filter((x) => x.id === card.id).length

            if (totalCopies >= 3) return prev

            const isExtra = card.type === "Extra"
            if (isExtra && prev.extra.length >= 15) return prev
            if (!isExtra && prev.main.length >= 60) return prev

            if (isExtra) {
                return { ...prev, extra: [...prev.extra, card] }
            } else {
                return { ...prev, main: [...prev.main, card] }
            }
        })
    }

    // Fixed: read state from the updater argument to avoid stale closure
    const addSideCard = (card: Cards) => {
        setContents((prev) => {
            const totalCopies = [...prev.main, ...prev.extra, ...prev.side]
                .filter((x) => x.id === card.id).length

            if (totalCopies >= 3) return prev
            if (prev.side.length >= 15) return prev

            return { ...prev, side: [...prev.side, card] }
        })
    }

    const removeSingle = (cards: Cards[], target: Cards) => {
        const index = cards.indexOf(target)
        if (index === -1) return cards
        return [...cards.slice(0, index), ...cards.slice(index + 1)]
    }

    const removeCard = (card: Cards, section: "main" | "extra" | "side") => {
        setContents((prev) => ({
            ...prev,
            [section]: removeSingle(prev[section], card),
        }))
    }

    const save = async () => {
        let mainDeckIds = contents.main.map((c) => c.id)
        let extraDeckIds = contents.extra.map((c) => c.id)
        let sideDeckIds = contents.side.map((c) => c.id)

        const totalPoints = [
            ...contents.main,
            ...contents.extra,
            ...contents.side,
        ].reduce((sum, card) => sum + (card.point ?? 0), 0)

        const data = {
            name: deck.name,
            points: totalPoints,
            coverId: deck.coverId ?? null,
            mainDeckIds,
            extraDeckIds,
            sideDeckIds,
        }

        if (deck.id === 0) {
            const newDeck = await createDeck(data)
            setDeck((prev) => ({
                ...prev,
                id: newDeck.id,
                points: totalPoints,
                updatedAt: new Date(),
            }))
        } else {
            await updateDeck(deck.id, data)
            setDeck((prev) => ({
                ...prev,
                points: totalPoints,
                updatedAt: new Date(),
            }))
        }
    }

    return (
        <EditorContext.Provider
            value={{
                deck,
                contents,
                hoveredCard,
                setHoveredCard,
                setName,
                setCoverId,
                addCard,
                addSideCard,
                removeCard,
                sortCards,
                save,
            }}
        >
            {children}
        </EditorContext.Provider>
    )
}

export function useEditor() {
    const context = useContext(EditorContext)
    if (!context) {
        throw new Error("useEditor must be used within EditorProvider")
    }
    return context
}
