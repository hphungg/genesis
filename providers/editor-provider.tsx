"use client"

import { createDeck, updateDeck } from "@/app/api/decks"
import { Card } from "@/db/schema"
import { Deck } from "@/types/deck"
import { createContext, useContext, useState } from "react"

interface EditorContextType {
    deck: Deck
    hoveredCard: Card | null
    setHoveredCard: (card: Card | null) => void
    setName: (name: string) => void
    addCard: (id: string, location: "main" | "extra" | "side") => void
    removeCard: (id: string, location: "main" | "extra" | "side") => void
    save: () => Promise<void>
}

const EditorContext = createContext<EditorContextType | null>(null)

export function EditorProvider({
    children,
    initialDeck,
}: {
    children: React.ReactNode
    initialDeck: Deck
}) {
    const [deck, setDeck] = useState<Deck>(initialDeck)
    const [hoveredCard, setHoveredCard] = useState<Card | null>(null)

    const setName = (name: string) => setDeck((prev) => ({ ...prev, name }))

    const addCard = (id: string, location: "main" | "extra" | "side") => {
        if (location === "main") {
            setDeck((prev) => ({
                ...prev,
                main_deck: [...prev.main_deck, id],
            }))
        } else if (location === "extra") {
            setDeck((prev) => ({
                ...prev,
                extra_deck: [...prev.extra_deck, id],
            }))
        } else if (location === "side") {
            setDeck((prev) => ({
                ...prev,
                side_deck: [...prev.side_deck, id],
            }))
        }
    }

    const removeCard = (id: string, location: "main" | "extra" | "side") => {
        if (location === "main") {
            setDeck((prev) => ({
                ...prev,
                main_deck: prev.main_deck.filter((card) => card !== id),
            }))
        } else if (location === "extra") {
            setDeck((prev) => ({
                ...prev,
                extra_deck: prev.extra_deck.filter((card) => card !== id),
            }))
        } else if (location === "side") {
            setDeck((prev) => ({
                ...prev,
                side_deck: prev.side_deck.filter((card) => card !== id),
            }))
        }
    }

    const save = async () => {
        const payload = {
            name: deck.name,
            points: deck.points,
            mainDeckIds: deck.main_deck,
            extraDeckIds: deck.extra_deck,
            sideDeckIds: deck.side_deck,
        }

        if (deck.id === 0) {
            const created = await createDeck(payload)
            setDeck((prev) => ({
                ...prev,
                id: created.id,
                updatedAt: new Date(),
            }))
        } else {
            await updateDeck(deck.id, payload)
            setDeck((prev) => ({ ...prev, updatedAt: new Date() }))
        }
    }

    return (
        <EditorContext.Provider
            value={{
                deck,
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
