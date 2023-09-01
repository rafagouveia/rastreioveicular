import NextUiProvideApp from '@/providers/nextui-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imersão 14 - Next e Nest ',
  description: 'Aplicação da imersão',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <NextUiProvideApp>
          {children}
        </NextUiProvideApp>

      </body>
    </html>
  )
}
