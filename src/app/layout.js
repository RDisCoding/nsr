import "./globals.css"
import { Providers } from "@/lib/provider"

export const metadata = {
  title: "DotSlash8 - Modern Web Application",
  description: "A stylish and responsive website built with Next.js and Tailwind CSS",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}