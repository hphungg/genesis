"use client"

import { cn } from "@/lib/utils"
import {
    ATTRIBUTES,
    LEVELS,
    MONSTER_RACES,
    MONSTER_SUBTYPES,
    SPELL_SUBTYPES,
    TRAP_SUBTYPES,
    TYPE_OPTIONS,
} from "@/lib/constants"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type CardSearchFilters = {
    type: string
    race: string
    subtype: string
    level: string
    attribute: string
}

export const DEFAULT_FILTERS: CardSearchFilters = {
    type: "",
    race: "",
    subtype: "",
    level: "",
    attribute: "",
}

type FilterKey = keyof CardSearchFilters

interface CardFilterDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    filters: CardSearchFilters
    onTypeChange: (value: string) => void
    onFilterChange: (key: FilterKey, value: string) => void
    onClear: () => void
    onApply: () => void
    canApply: boolean
}

const drawerWidthClassName =
    "data-[vaul-drawer-direction=bottom]:left-1/2 data-[vaul-drawer-direction=bottom]:right-auto data-[vaul-drawer-direction=bottom]:-translate-x-1/2 data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=bottom]:w-[92vw] sm:data-[vaul-drawer-direction=bottom]:w-[70vw] lg:data-[vaul-drawer-direction=bottom]:w-[50vw]"

export default function CardFilterDrawer({
    open,
    onOpenChange,
    filters,
    onTypeChange,
    onFilterChange,
    onClear,
    onApply,
    canApply,
}: CardFilterDrawerProps) {
    const isMonster = filters.type === "Monster"
    const isSpell = filters.type === "Spell"
    const isTrap = filters.type === "Trap"
    const subtypeOptions = isMonster
        ? MONSTER_SUBTYPES
        : isSpell
          ? SPELL_SUBTYPES
          : isTrap
            ? TRAP_SUBTYPES
            : []

    const handleChange = (key: FilterKey) => (value: string) =>
        onFilterChange(key, value === "any" ? "" : value)

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className={cn(drawerWidthClassName)}>
                <DrawerHeader className="mb-4">
                    <DrawerTitle className="text-xl">Bộ lọc</DrawerTitle>
                    <DrawerDescription>Lọc kết quả theo...</DrawerDescription>
                </DrawerHeader>

                <div className="px-6 pb-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Loại bài</Label>
                            <Select
                                value={filters.type || "any"}
                                onValueChange={onTypeChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Bất kỳ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Bất kỳ</SelectItem>
                                    {TYPE_OPTIONS.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div
                            className={cn(
                                "grid gap-2 transition-opacity",
                                !isMonster && "opacity-30 grayscale",
                            )}
                        >
                            <Label>Tộc bài</Label>
                            <Select
                                value={filters.race || "any"}
                                onValueChange={handleChange("race")}
                                disabled={!isMonster}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Monster only" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Bất kỳ</SelectItem>
                                    {MONSTER_RACES.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div
                            className={cn(
                                "grid gap-2 transition-opacity",
                                !filters.type && "opacity-30 grayscale",
                            )}
                        >
                            <Label>Tiêu chí phụ</Label>
                            <Select
                                value={filters.subtype || "any"}
                                onValueChange={handleChange("subtype")}
                                disabled={!filters.type}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={
                                            filters.type
                                                ? "Bất kỳ"
                                                : "Lựa chọn loại bài trước"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Bất kỳ</SelectItem>
                                    {subtypeOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div
                            className={cn(
                                "grid gap-2 transition-opacity",
                                !isMonster && "opacity-30 grayscale",
                            )}
                        >
                            <Label>Level</Label>
                            <Select
                                value={filters.level || "any"}
                                onValueChange={handleChange("level")}
                                disabled={!isMonster}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chỉ quái thú" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Bất kỳ</SelectItem>
                                    {LEVELS.map((level) => (
                                        <SelectItem key={level} value={level}>
                                            Level {level}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div
                            className={cn(
                                "grid gap-2 transition-opacity",
                                !isMonster && "opacity-30 grayscale",
                            )}
                        >
                            <Label>Thuộc tính</Label>
                            <Select
                                value={filters.attribute || "any"}
                                onValueChange={handleChange("attribute")}
                                disabled={!isMonster}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chỉ quái thú" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Bất kỳ</SelectItem>
                                    {ATTRIBUTES.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DrawerFooter className="flex-row flex-wrap justify-end gap-2 px-6 pt-0 pb-6">
                    <Button
                        size="sm"
                        className="w-auto"
                        variant="outline"
                        onClick={onClear}
                    >
                        Xóa bộ lọc
                    </Button>
                    <Button
                        size="sm"
                        className="w-auto"
                        onClick={onApply}
                        disabled={!canApply}
                    >
                        Áp dụng
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
