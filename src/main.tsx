import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthContext, AuthProvider } from '@/features/auth/useAuth.tsx'
import LandingPage from './pages/landingPage/LandingPage.tsx';
import AppLayout from './components/layout/AppLayout.tsx';
import { RequireAuth } from './features/auth/RequireAuth.tsx';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32', // earthy green 🌿
    },
    background: {
      default: '#fafafa',
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: "/login",
        element: <div></div>
      },
      {
        path: '/signup',
        element: <div></div>
      }
    ]
  },
  {
    path: '/app',
    element: <RequireAuth><AppLayout /></RequireAuth>,
    children: [
      {
        path: 'home'
      }
    ]
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode >,
)
