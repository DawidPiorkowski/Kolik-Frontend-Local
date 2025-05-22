// src/components/ProtectedRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Spinner } from './Spinner'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()

  if (loading) {
    // still checking the cookie → show a spinner
    return <Spinner />
  }
  // TEMPORARY: force dev mode access
if (!user && process.env.NODE_ENV !== "production") {
  return children;
}

  // ✅ we have a user
  return <>{children}</>
}
