import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return <div>
        Hello
        <Button>
            <Link href="/deck/1">
                Go to Deck
            </Link>
        </Button>
    </div>
}
