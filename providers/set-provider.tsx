"use client"

import { createContext, useContext, useState } from "react"
import { useProgress } from "@bprogress/next"

import { Cards, Sets } from "@/db/schema"
import { createSet, updateSet } from "@/app/api/sets"
import { sortCards } from "@/lib/sort-rank"

export type SetWithCards = Sets & {
    cards: Cards[]
}

interface SetContextType {
    set: SetWithCards
    isSaving: boolean
    isDirty: boolean
    setName: (name: string) => void
    setDescription: (desc: string) => void
    setSetType: (type: string) => void
    setCoverId: (id: string | null) => void
    addTag: (tag: string) => void
    removeTag: (tag: string) => void
    addCard: (card: Cards) => void
    removeCard: (cardId: string) => void
    save: () => Promise<void>
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
    const [isSaving, setIsSaving] = useState(false)
    const { start, stop } = useProgress()

    const setName = (name: string) => setSet((prev) => ({ ...prev, name }))

    const setDescription = (description: string) =>
        setSet((prev) => ({ ...prev, description }))

    const setSetType = (setType: string) =>
        setSet((prev) => ({ ...prev, setType }))

    const setCoverId = (coverId: string | null) =>
        setSet((prev) => ({ ...prev, coverId }))

    const addTag = (tag: string) => {
        const trimmed = tag.trim()
        if (!trimmed) return
        setSet((prev) =>
            prev.tags.includes(trimmed)
                ? prev
                : { ...prev, tags: [...prev.tags, trimmed] },
        )
    }

    const removeTag = (tag: string) =>
        setSet((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }))

    const addCard = (card: Cards) =>
        setSet((prev) =>
            prev.cards.some((c) => c.id === card.id)
                ? prev
                : { ...prev, cards: sortCards([...prev.cards, card]) },
        )

    const removeCard = (cardId: string) =>
        setSet((prev) => ({
            ...prev,
            cards: prev.cards.filter((c) => c.id !== cardId),
        }))

    const save = async (): Promise<void> => {
        setIsSaving(true)
        start()
        try {
            const sortedCards = sortCards(set.cards)
            const sortedCardIds = sortedCards.map((c) => c.id)
            setSet((prev) => ({ ...prev, cards: sortedCards }))

            if (set.id === 0) {
                await createSet({
                    name: set.name,
                    description: set.description,
                    setType: set.setType,
                    coverId: set.coverId,
                    tags: set.tags,
                    cardIds: sortedCardIds,
                })
            } else {
                await updateSet(set.id, {
                    name: set.name,
                    description: set.description,
                    setType: set.setType,
                    coverId: set.coverId,
                    tags: set.tags,
                    cardIds: sortedCardIds,
                })
            }
        } finally {
            setIsSaving(false)
            stop()
        }
    }

    const isDirty =
        set.name !== initialSet.name ||
        set.description !== initialSet.description ||
        set.setType !== initialSet.setType ||
        set.coverId !== (initialSet.coverId ?? null) ||
        set.tags.length !== initialSet.tags.length ||
        set.tags.some((t, i) => t !== initialSet.tags[i]) ||
        set.cards.length !== initialSet.cards.length ||
        set.cards.some((c, i) => c.id !== initialSet.cards[i].id)

    return (
        <SetContext.Provider
            value={{
                set,
                isSaving,
                isDirty,
                setName,
                setDescription,
                setSetType,
                setCoverId,
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
