// src/pages/HowToCreateAccount.tsx
import React from 'react'

export default function HowToCreateAccount() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">How to Create Your Account</h1>
      <ol className="list-decimal list-inside space-y-3 text-gray-700">
        <li>
          Click the <span className="font-semibold">Register</span> button in the top-right corner.
        </li>
        <li>
          Enter your email address and choose a strong password.
        </li>
        <li>
          Check your inbox and click the confirmation link we send you.
        </li>
        <li>
          Log in with your new credentials and start comparing grocery prices!
        </li>
      </ol>
    </div>
  )
}
