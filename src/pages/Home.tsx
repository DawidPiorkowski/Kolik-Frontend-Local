// src/pages/Home.tsx
import React from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
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
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>Billa</span>
            <span>Tesco</span>
            <span>Albert</span>
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
    </div>
  )
}
