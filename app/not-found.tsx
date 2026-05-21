import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="bg-muted flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
                <p className="text-2xl">Trang này không tồn tại ~ 🤯</p>
                <Button asChild>
                    <Link href="/">Quay về</Link>
                </Button>
            </div>
        </div>
    )
}
