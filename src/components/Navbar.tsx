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
     state: { infoMessage: '👋 You’ve been logged out. Thank you for visiting Kolik today!' }
   })

  }

  return (
    <nav className="bg-white border-b p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Kolik
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Shopping Cart Icon Link */}
            <Link
              to="/shopping-list"
              className="relative text-gray-600 hover:text-gray-800"
              aria-label="Your shopping list"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>

            <span className="text-sm font-semibold text-gray-800">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
