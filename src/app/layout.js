import "./globals.css"

export const metadata = {
  title: "Home Page Layout",
  description: "A stylish and responsive home page layout for a Next.js website",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}