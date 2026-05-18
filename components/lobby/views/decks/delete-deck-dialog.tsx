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
                    <DialogTitle>Delete deck</DialogTitle>
                    <DialogDescription>
                        This will permanently delete
                        {deckName ? ` ${deckName}` : " this deck"}.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
