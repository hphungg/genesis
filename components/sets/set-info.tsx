"use client"

import { SetDetails } from "./set-info/details"
import { SetTags } from "./set-info/tags"
import { SetCardList } from "./set-info/card-list"

export default function SetInfo() {
    return (
        <div className="flex h-full w-96 min-w-80 shrink-0 flex-col overflow-hidden">
            <div className="flex flex-col gap-4 border-b p-4">
                <SetDetails />
                <SetTags />
            </div>
            <SetCardList />
        </div>
    )
}
