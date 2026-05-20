"use client"

import { createDeck, updateDeck } from "@/app/api/decks"
import { Cards, cards } from "@/db/schema"
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
    addCard: (card: Cards) => void
    removeCard: (card: Cards, section: "main" | "extra" | "side") => void
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

    const addCard = (card: Cards) => {
        const totalCopies = [
            ...contents.main,
            ...contents.extra,
            ...contents.side,
        ].filter((x) => x.id === card.id).length

        if (totalCopies >= 3) {
            return
        }

        const isExtra = card.type === "Extra"

        setContents((prev) => {
            if (isExtra) {
                return {
                    ...prev,
                    extra: [...prev.extra, card],
                }
            } else {
                return {
                    ...prev,
                    main: [...prev.main, card],
                }
            }
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

        const data = {
            name: deck.name,
            points: deck.points,
            mainDeckIds,
            extraDeckIds,
            sideDeckIds,
        }

        if (deck.id === 0) {
            const newDeck = await createDeck(data)
            setDeck((prev) => ({
                ...prev,
                id: newDeck.id,
                updatedAt: new Date(),
            }))
        } else {
            await updateDeck(deck.id, data)
            setDeck((prev) => ({ ...prev, updatedAt: new Date() }))
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
                addCard,
                removeCard,
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
