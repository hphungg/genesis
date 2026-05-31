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
    other: {
        rel: "preconnect",
        href: "https://images.ygoprodeck.com",
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
            <body className="bg-background text-foreground min-h-full">
                <main className="bg-muted flex min-h-screen items-center justify-center px-6 text-center md:hidden">
                    <div className="flex w-full max-w-sm flex-col items-center gap-4">
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold">
                                Không hỗ trợ kích cỡ màn hình này
                            </h1>
                            <p className="text-muted-foreground text-sm leading-6">
                                Vui lòng truy cập bằng thiết bị có màn hình lớn
                                hơn.
                            </p>
                        </div>
                    </div>
                </main>

                <div className="hidden min-h-full flex-col md:flex">
                    <AppProgressProvider>
                        <main>
                            {children}
                            <SpeedInsights />
                        </main>
                    </AppProgressProvider>
                </div>
                <Toaster richColors position="top-center" />
            </body>
        </html>
    )
}
