// src/App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import PasswordResetRequest from './pages/PasswordResetRequest'
import PasswordResetConfirm from './pages/PasswordResetConfirm'
import MfaSetup from './pages/MfaSetup'
import MfaLogin from './pages/MfaLogin'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import ShoppingList from './pages/ShoppingList'
import ProtectedTest from './pages/ProtectedTest'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Layout from './components/Layout'

export default function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/password-reset" element={<PasswordResetRequest />} />
          <Route path="/password-reset/confirm" element={<PasswordResetConfirm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mfa-setup" element={<MfaSetup />} />
          <Route path="/mfa-login" element={<MfaLogin />} />

          {/* Protected routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping-list"
            element={
              <ProtectedRoute>
                <ShoppingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedTest />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </>
  )
}
