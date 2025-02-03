"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0c0b] via-[#2c2321] to-[#493a37]">
      <div className="flex-grow">
        {/* Animated background */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] animate-[move 20s linear infinite]" />
        </div>

        {/* Static Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-50 mx-auto max-w-6xl flex items-center justify-between rounded-full bg-[#2c2321]/80 px-4 sm:px-6 lg:px-8 py-2 backdrop-blur-md mb-8 mt-4"
        >
          <Link href="/" className="text-lg font-bold tracking-tight text-[#f4f1f0]">
            kreatur
          </Link>
          <nav>
            <ul className="flex space-x-4 text-sm">
              <li>
                <Link href="/projects" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </motion.header>

        <main className="flex-grow mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">{children}</main>
      </div>

      {/* Static Footer */}
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-50 mx-auto max-w-6xl w-full rounded-full bg-[#2c2321]/80 px-4 sm:px-6 lg:px-8 py-2 backdrop-blur-md mb-4"
      >
        <div className="flex items-center justify-between text-sm">
          <p className="text-[#c5bcba]">&copy; 2025 kreatur</p>
          <div className="flex space-x-4">
            <a href="#" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

