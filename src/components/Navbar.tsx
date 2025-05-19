// src/components/Navbar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Kolik
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <button
            onClick={logout}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Log out
          </button>
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
