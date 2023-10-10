import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '../components/layout/mainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bend - Admin portal',
  description: 'Powered by GenUI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
