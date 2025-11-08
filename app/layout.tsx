import { LanguageProvider } from '@/lib/contexts/LanguageContext'
import { Metadata } from 'next'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'AgroFlow - Revolucionando a Agricultura',
  description: 'AgroFlow - Solução inovadora para agricultura moderna',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}