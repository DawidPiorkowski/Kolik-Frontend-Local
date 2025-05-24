// src/components/Sidebar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUserPlus, FaUserCog, FaEnvelope } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  onHowToClick: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onHowToClick }) => {
  const { user } = useAuth()

  return (
      <aside className="sticky top-0 w-56 h-screen bg-indigo-900 text-indigo-100 flex-shrink-0">
      <div className="p-6 flex flex-col h-full justify-between">
        <nav className="space-y-4">
          <Link
            to="/"
            className="flex items-center text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition"
          >
            <FaHome className="mr-3 w-5 h-5" />
            Home
          </Link>

          {!user && (
            <button
              onClick={onHowToClick}
              className="flex items-center w-full text-left text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition focus:outline-none"
            >
              <FaUserPlus className="mr-3 w-5 h-5" />
              How to Sign Up
            </button>
          )}

          {user && (
            <Link
              to="/account"
              className="flex items-center text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition"
            >
              <FaUserCog className="mr-3 w-5 h-5" />
              Account Settings
            </Link>
          )}

          <Link
            to="/contact"
            className="flex items-center text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition"
          >
            <FaEnvelope className="mr-3 w-5 h-5" />
            Contact Us
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
