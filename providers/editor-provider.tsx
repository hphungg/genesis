'use client'

import { Card } from "@/db/schema"
import { Deck } from "@/types/deck"
import { createContext, useContext, useState } from "react"

interface EditorContextType {
    deck: Deck
    hoveredCard: Card | null
    setHoveredCard: (card: Card | null) => void
    addCard: (id: bigint, location: 'main' | 'extra' | 'side') => void
    removeCard: (id: bigint, location: 'main' | 'extra' | 'side') => void
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

    const addCard = (id: bigint, location: 'main' | 'extra' | 'side') => {
        if (location === 'main') {
            setDeck(prev => ({ ...prev, main_deck: [...prev.main_deck, id] }))
        } else if (location === 'extra') {
            setDeck(prev => ({ ...prev, extra_deck: [...prev.extra_deck, id] }))
        } else if (location === 'side') {
            setDeck(prev => ({ ...prev, side_deck: [...prev.side_deck, id] }))
        }
    }

    const removeCard = (id: bigint, location: 'main' | 'extra' | 'side') => {
        if (location === 'main') {
            setDeck(prev => ({ ...prev, main_deck: prev.main_deck.filter(card => card !== id) }))
        } else if (location === 'extra') {
            setDeck(prev => ({ ...prev, extra_deck: prev.extra_deck.filter(card => card !== id) }))
        } else if (location === 'side') {
            setDeck(prev => ({ ...prev, side_deck: prev.side_deck.filter(card => card !== id) }))
        }
    }

    return (
        <EditorContext.Provider value={{ deck, hoveredCard, setHoveredCard, addCard, removeCard }}>
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