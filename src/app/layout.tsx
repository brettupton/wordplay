import type { Metadata } from "next";
import { Inter } from "next/font/google"
import Link from 'next/link'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WordPlay",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col">
          <header className="bg-gradient-to-br from-purple-600 to-blue-500 py-3 px-1 text-sm">
            <nav className="container mx-auto flex justify-between items-center">
              <div className="space-x-4">
                <Link href="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
                <Link href="/frequency" className="text-white hover:text-gray-200 transition-colors">Frequency</Link>
                <Link href="/markov" className="text-white hover:text-gray-200 transition-colors">Markov</Link>
                <Link href="/n-gram" className="text-white hover:text-gray-200 transition-colors">N-gram</Link>
                <Link href="/phonetics" className="text-white hover:text-gray-200 transition-colors">Phonetics</Link>
              </div>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
