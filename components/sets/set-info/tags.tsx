"use client"

import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { XIcon } from "@phosphor-icons/react"
import { useSetEditor } from "@/providers/set-provider"

export function SetTags() {
    const { set, addTag, removeTag } = useSetEditor()
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
        <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Tags
            </Label>

            {set.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {set.tags.map((tag) => (
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
    )
}
