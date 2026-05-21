import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { AppProgressProvider } from "@/providers/progress-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
    title: "Duelists Unite",
    description: "Golden Yu-Gi-Oh! Era",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full antialiased", "font-sans", inter.variable)}
        >
            <body className="flex min-h-full flex-col">
                <AppProgressProvider>
                    <main>
                        {children}
                        <SpeedInsights />
                    </main>
                </AppProgressProvider>
                <Toaster richColors position="top-center" />
            </body>
        </html>
    )
}
