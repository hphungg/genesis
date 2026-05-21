"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FormatRulesDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const RULES_MARKDOWN = `1. Không có **Link/Pendulum/Ritual** monsters. Sử dụng sân đấu truyền thống (không có Extra Monster Zone và Pendulum Zone).
2. Sử dụng **card pool** (bể bài) **giới hạn**, chỉ bao gồm các lá bài có mặt trong các gói bài được hiển thị.
3. Banlist truyền thống không được áp dụng, thay vào đó, mỗi lá bài giờ đây sẽ có một giá trị điểm dựa trên sức mạnh của nó.
4. Bộ bài được xây dựng dựa trên hệ thống điểm: Tổng điểm của toàn bộ lá bài trong bộ bài (bao gồm cả **Main Deck**, **Extra Deck** và **Side Deck**) không được vượt quá 100 điểm. Các lá bài trong card pool đều được thêm tối đa 3 copy, miễn là không vượt quá giới hạn điểm cho phép.
5. Toàn bộ luật thi đấu còn lại dựa trên luật thi đấu Yu-Gi-Oh! thông thường.
`

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
                <ScrollArea className="mt-2 pr-4">
                    <div className="text-foreground flex flex-col gap-1">
                        {parseMarkdown(RULES_MARKDOWN)}
                    </div>
                </ScrollArea>
                <DialogFooter className="pt-2x`">
                    <Button onClick={() => onOpenChange(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
