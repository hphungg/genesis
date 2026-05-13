"use client"

import { useSetEditor } from "@/providers/set-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { XIcon } from "@phosphor-icons/react"
import { useState, useRef } from "react"

export default function SetInfo() {
    const { set, setDescription, setSetType, setCoverId, addTag, removeTag, removeCard } = useSetEditor()
    const [tagInput, setTagInput] = useState("")
    const tagInputRef = useRef<HTMLInputElement>(null)

    const handleAddTag = () => {
        const value = tagInput.trim()
        if (!value) return
        addTag(value)
        setTagInput("")
        tagInputRef.current?.focus()
    }

    return (
        <div className="flex flex-col h-full w-96 min-w-80 shrink-0 overflow-hidden">
            <div className="flex flex-col gap-4 p-4 border-b">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Set Type
                        </Label>
                        <Select
                            value={set.setType || ""}
                            onValueChange={setSetType}
                        >
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Archetype">Archetype</SelectItem>
                                <SelectItem value="Staple">Staple</SelectItem>
                                <SelectItem value="Engine">Engine</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Cover ID
                        </Label>
                        <Input
                            value={set.coverId || ""}
                            onChange={(e) => setCoverId(e.target.value)}
                            placeholder="e.g. 89631139"
                            className="h-9 text-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Description
                    </Label>
                    <Textarea
                        value={set.description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe this set…"
                        className="resize-none min-h-20 text-sm"
                        rows={3}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Tags
                    </Label>

                    {set.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {set.tags.map((tag, i) => (
                                <Badge
                                    key={tag}
                                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 bg-black"
                                >
                                    {tag}
                                    <button
                                        onClick={() => removeTag(tag)}
                                        className="ml-0.5 opacity-70 hover:opacity-100 transition-opacity rounded-full"
                                        aria-label={`Remove tag ${tag}`}
                                    >
                                        <XIcon size={10} weight="bold" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-1.5">
                        <Input
                            ref={tagInputRef}
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                            placeholder="Add tag…"
                            className="h-8 text-sm flex-1"
                        />
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleAddTag}
                            className="h-8 shrink-0"
                            disabled={!tagInput.trim()}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-hidden p-4 gap-3 min-h-0">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Cards
                    </span>
                    <span className="text-xs text-muted-foreground font-medium tabular-nums">
                        {set.cards.length}
                    </span>
                </div>

                <ScrollArea className="flex-1 min-h-0">
                    {set.cards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-1">
                            <span>No cards yet</span>
                            <span className="text-xs">Search and click a card to add it</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1 pr-2">
                            {set.cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="flex items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-sm bg-muted/30 hover:bg-muted/60 transition-colors group"
                                >
                                    <span className="flex-1 truncate font-medium text-foreground">
                                        {card.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground shrink-0">
                                        {card.type1}
                                    </span>
                                    <button
                                        onClick={() => removeCard(card.id)}
                                        className="opacity-0 group-hover:opacity-60 hover:opacity-100! transition-opacity text-destructive"
                                        aria-label={`Remove card ${card.name}`}
                                    >
                                        <XIcon size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}
