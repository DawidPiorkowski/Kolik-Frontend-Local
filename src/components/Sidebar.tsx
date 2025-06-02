// src/components/Sidebar.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaHome, 
  FaUserPlus, 
  FaUserCog, 
  FaEnvelope, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  onHowToClick: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onHowToClick }) => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <aside
      className={`
        sticky top-0 h-screen bg-indigo-900 text-indigo-100 flex-shrink-0
        transition-all duration-300
        ${isOpen ? 'w-56' : 'w-16'}
      `}
    >
      <div className="p-6 flex flex-col h-full justify-between">
        {/* Toggle button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="text-indigo-100 hover:text-white focus:outline-none"
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="space-y-4 flex-1">
          <Link
            to="/"
            className={`
              flex items-center p-2 rounded hover:bg-indigo-800 transition
              ${isOpen ? 'text-lg font-semibold' : 'justify-center'}
            `}
          >
            <FaHome className={`${isOpen ? 'mr-3 w-5 h-5' : 'w-5 h-5'}`} />
            {isOpen && 'Home'}
          </Link>

          {!user && (
            <button
              onClick={onHowToClick}
              className={`
                flex items-center w-full text-left p-2 rounded hover:bg-indigo-800 transition focus:outline-none
                ${isOpen ? 'text-lg font-semibold' : 'justify-center'}
              `}
            >
              <FaUserPlus className={`${isOpen ? 'mr-3 w-5 h-5' : 'w-5 h-5'}`} />
              {isOpen && 'How to Sign Up'}
            </button>
          )}

          {user && (
            <Link
              to="/account"
              className={`
                flex items-center p-2 rounded hover:bg-indigo-800 transition
                ${isOpen ? 'text-lg font-semibold' : 'justify-center'}
              `}
            >
              <FaUserCog className={`${isOpen ? 'mr-3 w-5 h-5' : 'w-5 h-5'}`} />
              {isOpen && 'Account Settings'}
            </Link>
          )}

          <Link
            to="/contact"
            className={`
              flex items-center p-2 rounded hover:bg-indigo-800 transition
              ${isOpen ? 'text-lg font-semibold' : 'justify-center'}
            `}
          >
            <FaEnvelope className={`${isOpen ? 'mr-3 w-5 h-5' : 'w-5 h-5'}`} />
            {isOpen && 'Contact Us'}
          </Link>
        </nav>

        {/* Optional footer or empty space */}
        {isOpen && <div className="mt-auto">{/* you can place footer items here */}</div>}
      </div>
    </aside>
  )
}

export default Sidebar
