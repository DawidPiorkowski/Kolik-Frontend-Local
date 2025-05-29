// src/components/Footer.tsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
        <Link to="/terms" className="hover:underline">
          Terms &amp; Conditions
        </Link>
        <span className="mx-2">|</span>
        <Link to="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <span className="mx-2">|</span>
        <Link to="/cookie-policy" className="hover:underline">
          Cookie Policy
        </Link>
        <p className="mt-2">&copy; {new Date().getFullYear()} Kolik. All rights reserved.</p>
      </div>
    </footer>
  )
}
