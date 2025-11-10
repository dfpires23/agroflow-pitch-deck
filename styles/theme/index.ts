import { createTheme, alpha } from '@mui/material/styles'

// Tema Claro (baseado no seu tema atual)
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#41B360',
      light: '#90E4FE',
      dark: '#04653B',
      contrastText: '#EAE9F6',
    },
    secondary: {
      main: '#1EC5FA',
      light: '#90E4FE',
      dark: '#1976D2',
      contrastText: '#04653B',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#04653B',
      secondary: '#737373',
    },
    agroflow: {
      green: {
        sustainable: '#41B360',
        terrain: '#04653B',
      },
      blue: {
        water: '#1EC5FA',
        sky: '#90E4FE',
      },
      neutral: {
        snow: '#EAE9F6',
        stone: '#737373',
      }
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: 'clamp(2rem, 8vw, 3.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      color: '#04653B',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(1.75rem, 5vw, 2.8rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#04653B',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#04653B',
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#04653B',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#04653B',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#737373',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
    body1: {
      color: '#737373',
      lineHeight: 1.6,
      letterSpacing: '0.005em',
    },
    body2: {
      color: '#737373',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          msOverflowStyle: 'none',
        },
        body: {
          overflow: 'auto',
          margin: 0,
          padding: 0,
          fontFamily: 'inherit',
          lineHeight: 1.6,
          backgroundColor: '#f8f9fa',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            height: 0,
          },
        },
        '*': {
          boxSizing: 'border-box',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            height: 0,
          },
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, #EAE9F6 0%, #90E4FE 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          textShadow: 'none',
        },
        img: {
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        },
        svg: {
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          WebkitTapHighlightColor: 'transparent',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #41B360 0%, #04653B 100%)',
          boxShadow: '0 4px 14px 0 rgba(65, 179, 96, 0.4)',
          color: '#EAE9F6',
          '&:hover': {
            background: 'linear-gradient(135deg, #46c269 0%, #057845 100%)',
            boxShadow: '0 6px 20px rgba(65, 179, 96, 0.6)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #1EC5FA 0%, #90E4FE 100%)',
          boxShadow: '0 4px 14px 0 rgba(30, 197, 250, 0.4)',
          color: '#04653B',
          '&:hover': {
            background: 'linear-gradient(135deg, #35cdfb 0%, #a0e9ff 100%)',
            boxShadow: '0 6px 20px rgba(30, 197, 250, 0.6)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)',
          color: '#04653B',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
  },
})

// Tema Escuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90E4FE',
      light: '#1EC5FA',
      dark: '#41B360',
      contrastText: '#121212',
    },
    secondary: {
      main: '#41B360',
      light: '#4CC469',
      dark: '#04653B',
      contrastText: '#EAE9F6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#EAE9F6',
      secondary: '#b0b0b0',
    },
    agroflow: {
      green: {
        sustainable: '#41B360',
        terrain: '#04653B',
      },
      blue: {
        water: '#1EC5FA',
        sky: '#90E4FE',
      },
      neutral: {
        snow: '#EAE9F6',
        stone: '#b0b0b0',
      }
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: 'clamp(2rem, 8vw, 3.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      color: '#EAE9F6',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(1.75rem, 5vw, 2.8rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#EAE9F6',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#EAE9F6',
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#EAE9F6',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#EAE9F6',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#b0b0b0',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
    body1: {
      color: '#b0b0b0',
      lineHeight: 1.6,
      letterSpacing: '0.005em',
    },
    body2: {
      color: '#b0b0b0',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          msOverflowStyle: 'none',
        },
        body: {
          overflow: 'auto',
          margin: 0,
          padding: 0,
          fontFamily: 'inherit',
          lineHeight: 1.6,
          backgroundColor: '#121212',
          color: '#EAE9F6',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            height: 0,
          },
        },
        '*': {
          boxSizing: 'border-box',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            height: 0,
          },
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, #90E4FE 0%, #1EC5FA 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          textShadow: 'none',
        },
        img: {
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        },
        svg: {
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          WebkitTapHighlightColor: 'transparent',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #90E4FE 0%, #1EC5FA 100%)',
          boxShadow: '0 4px 14px 0 rgba(144, 228, 254, 0.4)',
          color: '#121212',
          '&:hover': {
            background: 'linear-gradient(135deg, #a0e9ff 0%, #35cdfb 100%)',
            boxShadow: '0 6px 20px rgba(144, 228, 254, 0.6)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #41B360 0%, #04653B 100%)',
          boxShadow: '0 4px 14px 0 rgba(65, 179, 96, 0.4)',
          color: '#EAE9F6',
          '&:hover': {
            background: 'linear-gradient(135deg, #46c269 0%, #057845 100%)',
            boxShadow: '0 6px 20px rgba(65, 179, 96, 0.6)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 1px 10px rgba(0, 0, 0, 0.3)',
          color: '#EAE9F6',
          borderBottom: `1px solid ${alpha('#90E4FE', 0.1)}`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
  },
})

export const theme = lightTheme

declare module '@mui/material/styles' {
  interface Palette {
    agroflow: {
      green: {
        sustainable: string
        terrain: string
      }
      blue: {
        water: string
        sky: string
      }
      neutral: {
        snow: string
        stone: string
      }
    }
  }
  interface PaletteOptions {
    agroflow?: {
      green?: {
        sustainable?: string
        terrain?: string
      }
      blue?: {
        water?: string
        sky?: string
      }
      neutral?: {
        snow?: string
        stone?: string
      }
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    agroflow: true
  }
}

export default theme