// src/components/Sidebar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaThList,
  FaStore,
  FaUserPlus,
  FaUserCog,
  FaEnvelope,
} from 'react-icons/fa'

interface SidebarProps {
  onHowToClick: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onHowToClick }) => (
  <aside className="w-64 h-screen bg-white border-r p-6">
    <nav className="flex flex-col">
      <Link
        to="/"
        className="flex items-center text-2xl font-medium py-3 hover:text-blue-600"
      >
        <FaHome className="mr-3 w-7 h-7" />
        Home
      </Link>

      {/* <Link
        to="/categories"
        className="flex items-center text-2xl font-medium py-3 hover:text-blue-600"
      >
        <FaThList className="mr-3 w-7 h-7" />
        Categories
      </Link> */}

      {/* <Link
        to="/supermarkets"
        className="flex items-center text-2xl font-medium py-3 hover:text-blue-600"
      >
        <FaStore className="mr-3 w-7 h-7" />
        Supermarkets
      </Link> */}

      {/* “How to Create Your Account” now opens the modal */}
      <button
        onClick={onHowToClick}
        className="flex items-center text-2xl font-medium py-3 hover:text-blue-600 text-left focus:outline-none"
      >
        <FaUserPlus className="mr-3 w-7 h-7" />
        How to Create Your Account
      </button>

      <Link
        to="/account-settings"
        className="flex items-center text-2xl font-medium py-3 hover:text-blue-600"
      >
        <FaUserCog className="mr-3 w-7 h-7" />
        Your Account Settings
      </Link>

      <Link
        to="/contact"
        className="flex items-center text-2xl font-medium py-3 hover:text-blue-600"
      >
        <FaEnvelope className="mr-3 w-7 h-7" />
        Contact Us
      </Link>
    </nav>
  </aside>
)

export default Sidebar
