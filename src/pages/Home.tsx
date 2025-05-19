// src/pages/Home.tsx
import React from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="space-y-24 py-16 px-4 md:px-8 lg:px-16">

      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Save money. Compare grocery prices from your favourite Czech supermarkets.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kolik helps you find the cheapest basket across Billa, Tesco and Albert.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Start Comparing
        </button>
      </section>

      {/* STORE LOGOS */}
      <section className="flex flex-wrap justify-center items-center gap-8">
        <img src="/billa.png"   alt="Billa"   className="h-12 md:h-16 object-contain" />
        <img src="/tesco.png"   alt="Tesco"   className="h-12 md:h-16 object-contain" />
        <img src="/albert.png"  alt="Albert"  className="h-12 md:h-16 object-contain" />
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Search for a product 🔍</li>
            <li>Compare across shops 🏪</li>
            <li>Save and shop smarter! 💸</li>
          </ol>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
          {/* Replace with your video embed or image */}
          <div className="text-gray-500 italic">[Instructional video here]</div>
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
    </div>
  )
}
