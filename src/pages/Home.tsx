// src/pages/Home.tsx
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal"
import { useAuth } from "../contexts/AuthContext"

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isHowToOpen, setIsHowToOpen] = useState(false)

  return (
    // Entire page now has a gentle top-to-bottom gradient
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50">
      {/* Sidebar */}
      <Sidebar onHowToClick={() => setIsHowToOpen(true)} />

      {/* Main content */}
      <main className="flex-1 space-y-24 py-16 px-4 md:px-8 lg:px-16">
        {/* HERO */}
        <section className="relative text-center space-y-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-20 px-6 rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/20 rounded-full animate-pulse"></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
            Save money. Compare grocery prices from your favourite Czech supermarkets.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Kolik helps you find the cheapest basket across Billa, Tesco and Albert.
          </p>

          {/* Only the primary CTA now */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
            >
              Start Comparing
            </button>
          </div>
        </section>

        {/* LOGOS on a soft indigo-tinted card */}
        <section className="flex flex-wrap justify-center items-center gap-8 py-12 bg-indigo-50 rounded-xl shadow-inner">
          {[
            { href: "https://www.billa.cz/", src: "/logos/billalogo.png", alt: "Billa" },
            { href: "https://www.itesco.cz/",   src: "/logos/tesco logo.jpeg", alt: "Tesco" },
            { href: "https://www.albert.cz/",    src: "/logos/Albert_Logo.png", alt: "Albert" },
          ].map(({ href, src, alt }) => (
            <a
              key={alt}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-32 w-56 flex items-center justify-center bg-white p-4 rounded-lg hover:shadow-lg transition"
            >
              <img
                src={src}
                alt={alt}
                className="max-h-full max-w-full object-contain"
              />
            </a>
          ))}
        </section>

        {/* WHY USE KOLIK on a soft green gradient */}
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-green-50 to-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            Why use Kolik?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "🔍", title: "Instant Search", desc: "Find any product in seconds across all stores." },
              { icon: "💲", title: "Real-time Prices", desc: "See the latest prices and deals side-by-side." },
              { icon: "🛒", title: "Save & Shop", desc: "Build and compare your shopping list with ease." },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS on clean white */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How it works:</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Search for a product 🔍</li>
              <li>Compare across shops 🛒</li>
              <li>Save and shop smarter! 💸</li>
            </ol>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-xl h-48 flex items-center justify-center shadow-lg">
            <span className="text-gray-500 italic">[Instructional video here]</span>
          </div>
        </section>

        {/* ABOUT on a warm peachy gradient */}
        <section className="bg-gradient-to-r from-yellow-50 to-pink-50 py-12 px-6 rounded-xl text-center max-w-3xl mx-auto shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-pink-700">About Kolik</h2>
          <p className="text-gray-700">
            We are a student-built, privacy-focused tool to help Czech shoppers make smart
            choices without tracking or ads.
          </p>
        </section>
      </main>

      {/* Modal for “How to Create Your Account” */}
      <Modal isOpen={isHowToOpen} onClose={() => setIsHowToOpen(false)}>
        <div className="p-6 max-w-xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">How to Create Your Account</h1>

          {/* Step 1 */}
          <div>
            <h2 className="font-semibold">Step 1: Register ✅</h2>
            <ul className="list-decimal list-inside ml-4 space-y-1">
             <li>
               Go to the{" "}
               <Link
                 to="/register"
                 className="text-blue-600 underline hover:text-blue-700"
               >
                 registration
               </Link>{" "}
               page.
             </li>
              <li>Fill in your name, email address, and password.</li>
              <li>Agree to the Terms and Privacy Policy.</li>
              <li>Click “Register.”</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div>
            <h2 className="font-semibold">Step 2: Verify Your Email</h2>
            <ul className="list-decimal list-inside ml-4 space-y-1">
              <li>Check your email inbox.</li>
              <li>Open the message from Kolik and click “Verify Email.”</li>
              <li>This confirms your email address is real.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div>
            <h2 className="font-semibold">Step 3: Login to Your Account ✅</h2>
            <ul className="list-decimal list-inside ml-4 space-y-1">
              <li>After verifying, go to the Login page.</li>
              <li>Enter your email and password.</li>
            </ul>
          </div>

          {/* Step 4 */}
          <div>
            <h2 className="font-semibold">Step 4: Set Up Two-Factor Authentication (MFA) ✅</h2>
            <ul className="list-decimal list-inside ml-4 space-y-1">
              <li>Upon first login, you’ll see a QR code.</li>
              <li>Scan it with Google/Microsoft Authenticator or another TOTP app.</li>
              <li>Enter the 6-digit code from your app to confirm.</li>
              <li className="italic text-sm text-gray-500">
                Tip: If you don’t have an authenticator app, download one free from your app store.
              </li>
            </ul>
          </div>

          {/* Step 5 */}
          <div>
            <h2 className="font-semibold">Step 5: Login with MFA ✅</h2>
            <ul className="list-decimal list-inside ml-4 space-y-1">
              <li>On future logins, enter your email & password.</li>
              <li>Then enter the 6-digit code from your authenticator app.</li>
            </ul>
          </div>

          <p className="mt-4 font-semibold">
            Done! You now have a fully secured Kolik account. ✅
          </p>
        </div>
      </Modal>
    </div>
  )
}
