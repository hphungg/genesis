"use client"

import { updateSet } from "@/app/api/sets"
import { Card, Set } from "@/db/schema"
import { createContext, useContext, useState, useTransition } from "react"

export type SetWithCards = Set & {
    cards: Card[]
}

interface SetContextType {
    set: SetWithCards
    isSaving: boolean
    setName: (name: string) => void
    setDescription: (desc: string) => void
    setSetType: (type: string) => void
    addTag: (tag: string) => void
    removeTag: (tag: string) => void
    addCard: (card: Card) => void
    removeCard: (cardId: string) => void
    save: () => void
}

const SetContext = createContext<SetContextType | null>(null)

export function SetProvider({
    children,
    initialSet,
}: {
    children: React.ReactNode
    initialSet: SetWithCards
}) {
    const [set, setSet] = useState<SetWithCards>(initialSet)
    const [isPending, startTransition] = useTransition()

    const setName = (name: string) =>
        setSet((prev) => ({ ...prev, name }))

    const setDescription = (description: string) =>
        setSet((prev) => ({ ...prev, description }))

    const setSetType = (setType: string) =>
        setSet((prev) => ({ ...prev, setType }))

    const addTag = (tag: string) => {
        const trimmed = tag.trim()
        if (!trimmed) return
        setSet((prev) =>
            prev.tags.includes(trimmed)
                ? prev
                : { ...prev, tags: [...prev.tags, trimmed] }
        )
    }

    const removeTag = (tag: string) =>
        setSet((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))

    const addCard = (card: Card) =>
        setSet((prev) =>
            prev.cards.some((c) => c.id === card.id)
                ? prev
                : { ...prev, cards: [...prev.cards, card] }
        )

    const removeCard = (cardId: string) =>
        setSet((prev) => ({
            ...prev,
            cards: prev.cards.filter((c) => c.id !== cardId),
        }))

    const save = () => {
        startTransition(async () => {
            await updateSet(set.id, {
                name: set.name,
                description: set.description,
                setType: set.setType,
                tags: set.tags,
                cardIds: set.cards.map((c) => c.id),
            })
        })
    }

    return (
        <SetContext.Provider
            value={{
                set,
                isSaving: isPending,
                setName,
                setDescription,
                setSetType,
                addTag,
                removeTag,
                addCard,
                removeCard,
                save,
            }}
        >
            {children}
        </SetContext.Provider>
    )
}

export function useSetEditor() {
    const context = useContext(SetContext)
    if (!context) {
        throw new Error("useSetEditor must be used within SetEditorProvider")
    }
    return context
}
