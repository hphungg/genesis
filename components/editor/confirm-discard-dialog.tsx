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

interface ConfirmDiscardDialogProps {
    open: boolean
    onCancel: () => void
    onConfirm: () => void
}

export function ConfirmDiscardDialog({
    open,
    onCancel,
    onConfirm,
}: ConfirmDiscardDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => !nextOpen && onCancel()}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-red-500">
                        Thay đổi chưa lưu
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        Bạn có những thay đổi chưa lưu. Bạn có chắc chắn muốn
                        rời đi và hủy bỏ các thay đổi này chứ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2">
                    <Button variant="outline" onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="border-none bg-red-500 text-white hover:bg-red-600"
                    >
                        Rời đi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
