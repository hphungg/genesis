"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSetEditor } from "@/providers/set-provider"

export function SetDetails() {
    const { set, setDescription, setSetType, setCoverId } = useSetEditor()

    return (
        <>
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
                    placeholder="Describe this set..."
                    className="resize-none min-h-20 text-sm"
                    rows={3}
                />
            </div>
        </>
    )
}
