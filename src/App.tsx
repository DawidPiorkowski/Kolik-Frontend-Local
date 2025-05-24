// src/App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home                  from './pages/Home'
import Login                 from './pages/Login'
import Register              from './pages/Register'
import VerifyEmail           from './pages/VerifyEmail'
import PasswordResetRequest  from './pages/PasswordResetRequest'
import PasswordResetConfirm  from './pages/PasswordResetConfirm'
import MfaSetup              from './pages/MfaSetup'
import MfaLogin              from './pages/MfaLogin'
import Products              from './pages/Products'
import ProductDetail         from './pages/ProductDetail'
import ShoppingList          from './pages/ShoppingList'
import ProtectedTest         from './pages/ProtectedTest'
import TermsAndConditions    from './pages/TermsAndConditions'
import PrivacyPolicy         from './pages/PrivacyPolicy'
import CookiePolicy          from './pages/CookiePolicy'

// Profile 
import AccountSettings       from './pages/AccountSettings'
import ChangePassword        from './pages/ChangePassword'
import ChangeEmail           from './pages/ChangeEmail'
import ConfirmEmail          from './pages/ConfirmEmail'

import ProtectedRoute from './components/ProtectedRoute'
import Navbar         from './components/Navbar'
import Layout         from './components/Layout'

export default function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <Routes>
          {/* public */}
          <Route path="/"                  element={<Home />} />
          <Route path="/register"          element={<Register />} />
          <Route path="/terms"             element={<TermsAndConditions />} />
          <Route path="/privacy"            element={<PrivacyPolicy />} />
          <Route path="/cookie-policy"     element={<CookiePolicy />} />
          
          {/* email verification & password reset */}
          <Route path="/verify-email"      element={<VerifyEmail />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/password-reset"    element={<PasswordResetRequest />} />
          <Route path="/password-reset/confirm" element={<PasswordResetConfirm />} />
          <Route path="/login"             element={<Login />} />
          <Route path="/mfa-setup"         element={<MfaSetup />} />
          <Route path="/mfa-login"         element={<MfaLogin />} />
          

          {/* protected */}
          <Route
            path="/products"
            element={<ProtectedRoute><Products /></ProtectedRoute>}
          />
          
          <Route
            path="/products/:id" element={<ProductDetail/>} />

          <Route
            path="/shopping-list"
            element={<ProtectedRoute><ShoppingList /></ProtectedRoute>}
          />
          <Route
            path="/protected"
            element={<ProtectedRoute><ProtectedTest /></ProtectedRoute>}
          />

          {/* ── ACCOUNT SETTINGS FLOW ── */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/change-email"
            element={
              <ProtectedRoute>
                <ChangeEmail />
              </ProtectedRoute>
            }
          />
          {/* this one reads ?token=… from the URL, no path‐param needed */}
          <Route
            path="/account/confirm-email-change/:token"
            element={
              <ProtectedRoute>
                <ConfirmEmail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </>
  )
}
