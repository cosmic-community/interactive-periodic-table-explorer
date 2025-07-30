import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'
import { getBucketSlug } from '@/lib/cosmic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interactive Periodic Table Explorer',
  description: 'A beautiful, modern, and interactive periodic table built with Next.js and Cosmic CMS. Explore chemical elements with stunning visual design and detailed information.',
  keywords: 'periodic table, chemistry, elements, interactive, education, science',
  authors: [{ name: 'Cosmic CMS' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = await getBucketSlug()

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}