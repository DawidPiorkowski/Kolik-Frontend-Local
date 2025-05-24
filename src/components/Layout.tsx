// src/components/Layout.tsx
import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  // only show the footer on the homepage
  const showFooter = pathname === '/'

  return (
    <div className="flex flex-col min-h-screen">
      {/* page content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* footer only on "/" */}
      {showFooter && <Footer />}
    </div>
  )
}
