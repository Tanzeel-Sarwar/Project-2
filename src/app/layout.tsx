import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Tools Hub",
  description: "Your one-stop solution for everyday tasks",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer className="py-6 text-center bg-gray-800 text-white mt-auto">
            © {new Date().getFullYear()} Smart Tools Hub. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  )
}

