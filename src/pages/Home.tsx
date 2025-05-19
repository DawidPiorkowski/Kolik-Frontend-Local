// src/pages/Home.tsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal"

export default function Home() {
  const navigate = useNavigate()
  const [isHowToOpen, setIsHowToOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with popup trigger */}
      <Sidebar onHowToClick={() => setIsHowToOpen(true)} />

      {/* Main content */}
      <main className="flex-1 space-y-24 py-16 px-4 md:px-8 lg:px-16">
        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Save money. Compare grocery prices from your favourite Czech supermarkets.
          </h1>
          <p className="text-gray-600">
            Kolik helps you find the cheapest basket across Billa, Tesco and Albert.
          </p>
          <button
            onClick={() => navigate("/search")}
            className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Start Comparing
          </button>
        </section>

        {/* LOGOS */}
        <section className="flex flex-wrap justify-center items-center gap-8 pt-6">
          <div className="h-20 w-40 flex items-center justify-center bg-white p-2 rounded">
            <img
              src="/logos/billalogo.png"
              alt="Billa"
              className="h-full object-contain scale-[1.4]"
            />
          </div>
          <div className="h-20 w-40 flex items-center justify-center bg-white p-2 rounded">
            <img
              src="/logos/tesco logo.jpeg"
              alt="Tesco"
              className="h-full object-contain scale-[1.6]"
            />
          </div>
          <div className="h-20 w-40 flex items-center justify-center bg-white p-2 rounded">
            <img
              src="/logos/Albert_Logo.png"
              alt="Albert"
              className="h-full object-contain scale-[0.9]"
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">How it works:</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Search for a product 🔍</li>
              <li>Compare across shops 🛒</li>
              <li>Save and shop smarter! 💸</li>
            </ol>
          </div>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            {/* TODO: embed video here */}
            <span className="text-gray-400">[Instructional video here]</span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-gray-50 py-12 px-6 rounded-lg text-center max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">About Kolik</h2>
          <p className="text-gray-600">
            We are a student-built, privacy-focused tool to help Czech shoppers make smart choices 
            without tracking or ads.
          </p>
        </section>
      </main>

      {/* Modal for “How to Create Your Account” */}
      <Modal isOpen={isHowToOpen} onClose={() => setIsHowToOpen(false)}>
        <h1 className="text-3xl font-bold mb-4">How to Create Your Account</h1>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            Click the <span className="font-semibold">Register</span> button in the top-right.
          </li>
          <li>Enter your email and choose a strong password.</li>
          <li>Check your inbox for our confirmation link and click it.</li>
          <li>Log in with your new credentials and start comparing!</li>
        </ol>
      </Modal>
    </div>
  )
}
