// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../services/api'

interface User {
  id: number
  email: string
  name: string
  // …etc.
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  mfaLogin: (email: string, code: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // 🔥 NEW: on mount, try to rehydrate from the session cookie
  useEffect(() => {
    (async () => {
      try {
        const profile = await api.getProfile()
        setUser(profile)
      } catch (err) {
        // not logged in (or session expired)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // … your existing login, mfaLogin, logout implementations …
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const flags = await api.login(email, password)
      if (flags.mfa_setup_required) {
        return navigate('/mfa-setup', { state: { email } })
      }
      if (flags.mfa_required) {
        return navigate('/mfa-login', { state: { email } })
      }
      const profile = await api.getProfile()
      setUser(profile)
      navigate('/products', { replace: true })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const mfaLogin = async (email: string, code: string) => {
    setLoading(true)
    setError(null)
    try {
      await api.mfaLogin(email, code)
      const profile = await api.getProfile()
      setUser(profile) 
      // Redirect to the Home page
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const logout = async () => {
    await api.logout()
    setUser(null)
    // Brings you to the Home page
    navigate('/', { replace: true })
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, mfaLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
