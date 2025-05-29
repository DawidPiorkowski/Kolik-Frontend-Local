// src/components/Navbar.tsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', {
      replace: true,
      state: {
        infoMessage:
          '👋 You’ve been logged out. Thank you for visiting Kolik today!',
      },
    })
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Kolik
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              {/* Cart icon (no badge) */}
              <Link
                to="/shopping-list"
                className="p-1 hover:text-blue-200"
                aria-label="Your shopping list"
              >
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>

              {/* Greeting */}
              <span className="text-sm font-medium">Hi, {user.name}</span>

              {/* Logout (ghost button) */}
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-white rounded hover:bg-white hover:text-blue-600 transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:text-blue-200"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-blue-50 transition text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
