'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightTheme, darkTheme } from '@/styles/theme'

// Definir a interface para o contexto
interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

// Criar o contexto com valor padrão
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

// Props para o ThemeProvider
interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Recupera o tema do localStorage se existir
    const storedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    setMode(storedTheme)
  }, [])

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('theme', newMode)
  }

  // Memoize o tema com base no mode
  const theme = useMemo(() => {
    return mode === 'dark' ? darkTheme : lightTheme
  }, [mode])

  const contextValue: ThemeContextType = {
    theme: mode,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext