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
                    <DialogTitle className="text-xl text-red-500">Thay đổi chưa lưu</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground mt-2">
                        Bạn có những thay đổi chưa lưu. Nếu rời đi bây giờ, tất cả thay đổi này sẽ bị hủy bỏ.
                        <br />
                        <br />
                        Bạn có chắc chắn muốn rời đi và hủy bỏ các thay đổi này chứ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onCancel}>
                        Ở lại
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white border-none"
                    >
                        Rời đi & Hủy bỏ
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
