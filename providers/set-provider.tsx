"use client"

import { createSet, updateSet } from "@/app/api/sets"
import { Cards, Sets } from "@/db/schema"
import { getCardSortRank } from "@/lib/sort-rank"
import { createContext, useContext, useState, useTransition } from "react"

export type SetWithCards = Sets & {
    cards: Cards[]
}

interface SetContextType {
    set: SetWithCards
    isSaving: boolean
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
    const [isPending, startTransition] = useTransition()

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
                : { ...prev, cards: [...prev.cards, card] },
        )

    const removeCard = (cardId: string) =>
        setSet((prev) => ({
            ...prev,
            cards: prev.cards.filter((c) => c.id !== cardId),
        }))

    const save = async () => {
        const sortedCards = [...set.cards].sort((a, b) => {
            const rankDiff = getCardSortRank(a) - getCardSortRank(b)
            if (rankDiff !== 0) return rankDiff
            return a.name.localeCompare(b.name)
        })
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
    }

    return (
        <SetContext.Provider
            value={{
                set,
                isSaving: isPending,
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
