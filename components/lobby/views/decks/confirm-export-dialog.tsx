"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ConfirmExportDialogProps {
    deckName?: string
    open: boolean
    onCancel: () => void
    onConfirm: () => void
}

export function ConfirmExportDialog({
    deckName,
    open,
    onCancel,
    onConfirm,
}: ConfirmExportDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => !nextOpen && onCancel()}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-amber-500">
                        Xác nhận
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2 text-sm">
                        Bộ bài{" "}
                        <strong>{deckName ? `"${deckName}"` : "này"}</strong>{" "}
                        không hợp lệ. Bạn vẫn muốn xuất bộ bài này chứ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button
                        variant="default"
                        onClick={onConfirm}
                        className="border-none bg-amber-500 text-white hover:bg-amber-600"
                    >
                        Xuất
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
