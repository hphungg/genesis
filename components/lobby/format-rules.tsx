"use client"

import { RULES_MARKDOWN } from "@/lib/constants"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FormatRulesDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

function parseInline(text: string) {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g)
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={i} className="text-foreground font-bold">
                    {part.slice(2, -2)}
                </strong>
            )
        }
        return part
    })
}

function parseMarkdown(text: string) {
    return text.split("\n").map((line, idx) => {
        const trimmed = line.trim()
        if (trimmed.match(/^\d+\.\s/)) {
            const match = trimmed.match(/^\d+\.\s(.*)/)
            const content = match ? match[1] : trimmed
            return (
                <li
                    key={idx}
                    className="text-muted-foreground mb-2 ml-6 list-decimal text-sm leading-relaxed"
                >
                    {parseInline(content)}
                </li>
            )
        }
        if (trimmed === "") {
            return <div key={idx} className="h-2" />
        }
        return (
            <p
                key={idx}
                className="text-muted-foreground mb-3 text-sm leading-relaxed"
            >
                {parseInline(trimmed)}
            </p>
        )
    })
}

export function FormatRulesDialog({
    open,
    onOpenChange,
}: FormatRulesDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl sm:max-w-xl md:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Thông tin Format
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2 text-sm">
                        Dựa trên format Genesys của Yu-Gi-Oh! OCG.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="no-scrollbar mt-2 pr-4">
                    <div className="text-foreground flex flex-col gap-1">
                        {parseMarkdown(RULES_MARKDOWN)}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
