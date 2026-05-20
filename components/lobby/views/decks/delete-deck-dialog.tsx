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

interface DeleteDeckDialogProps {
    deckName?: string
    open: boolean
    isDeleting: boolean
    onCancel: () => void
    onConfirm: () => void
}

export function DeleteDeckDialog({
    deckName,
    open,
    isDeleting,
    onCancel,
    onConfirm,
}: DeleteDeckDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => !nextOpen && onCancel()}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Xác nhận xóa</DialogTitle>
                    <DialogDescription>
                        Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn
                        muốn xóa deck
                        {deckName ? ` ${deckName}` : " này"} chứ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="border-red-200"
                    >
                        {isDeleting ? "Đang xóa..." : "Xóa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
