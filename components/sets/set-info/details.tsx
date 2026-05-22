"use client"

import { useSetEditor } from "@/providers/set-provider"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SetDetails() {
    const { set, setDescription, setSetType, setCoverId } = useSetEditor()

    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                    <Label className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        Loại
                    </Label>
                    <Select
                        value={set.setType || ""}
                        onValueChange={setSetType}
                    >
                        <SelectTrigger className="h-9">
                            <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Archetype">Archetype</SelectItem>
                            <SelectItem value="Staple">Staple</SelectItem>
                            <SelectItem value="Engine">Engine</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        ID ảnh bìa
                    </Label>
                    <Input
                        value={set.coverId || ""}
                        onChange={(e) => setCoverId(e.target.value)}
                        placeholder="vd. 89631139"
                        className="h-9 text-sm"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Mô tả
                </Label>
                <Textarea
                    value={set.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mô tả về gói bài này..."
                    className="min-h-20 resize-none text-sm"
                    rows={4}
                />
            </div>
        </>
    )
}
