import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/lib/contexts/LanguageContext'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'

// Fonte Inter otimizada para todos os navegadores
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'
  ),
  title: {
    template: '%s | AgroFlow',
    default: 'AgroFlow - Revolucionando a Agricultura',
  },
  description: 'AgroFlow - Solução inovadora para agricultura moderna com tecnologia e sustentabilidade',
  keywords: ['agricultura', 'inovação', 'sustentabilidade', 'agritech', 'AgroFlow'],
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'AgroFlow - Revolucionando a Agricultura',
    description: 'Solução inovadora para agricultura moderna',
    siteName: 'AgroFlow',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={inter.className}
    >
      <head>
        {/* Preconnect para melhorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://apis.google.com" />
        
        {/* Color scheme for system preference */}
        <meta name="color-scheme" content="light dark" />
        
        {/* Theme color para navegadores mobile */}
        <meta name="theme-color" content="#41B360" />
        
        {/* Renderização de texto otimizada e scrollbar invisível */}
        <style>{`
          html, body, * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          html::-webkit-scrollbar,
          body::-webkit-scrollbar,
          *::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }
          
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        {/* CssBaseline para normalização de estilos */}
        <CssBaseline />
        
        {/* Providers */}
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}