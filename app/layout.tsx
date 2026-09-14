import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Нарын медициналык колледжи — 80 жылдык маараке',
  description:
    'Нарын медициналык колледжинин 80 жылдык мааракесине арналган салтанаттуу иш-чаралар. 5–7 октябрь 2026-жыл.',
  generator: 'v0.app',
  openGraph: {
    title: 'Нарын медициналык колледжи — 80 жылдык маараке',
    description:
      'Сиздерди Нарын медициналык колледжинин 80 жылдык мааракесине чакырабыз. 5–7 октябрь 2026.',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1a3a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ky" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
