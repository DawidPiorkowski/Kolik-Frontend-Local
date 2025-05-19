import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        Kolik
      </Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button
              onClick={logout}
              className="text-blue-600 hover:underline"
            >
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        )}
      </div>
    </nav>
  )
}
