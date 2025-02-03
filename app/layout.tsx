import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'kreatur',
  description: 'kreatur is a creative initiative which aims to make everyone a creator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/path/to/your/icon.ico" />
      </Head>
      <body className="min-h-screen bg-[#0f0c0b]">
        {children}
      </body>
    </html>
  )
}
