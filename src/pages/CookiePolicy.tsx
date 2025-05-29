// src/pages/CookiePolicy.tsx
import React from 'react'

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 space-y-8">
      {/* Main Title */}
      <h1 className="text-4xl font-bold">Cookie Policy</h1>

      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Kolik uses cookies and similar technologies to improve user experience,
          analyse site performance, and personalise content. This policy explains
          what cookies are, how Kolik uses them, and how your preferences can be
          managed.
        </p>
      </section>

      {/* What Are Cookies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. What Are Cookies?</h2>
        <p className="text-gray-700 leading-relaxed">
          Cookies are small text files that are stored on your device when you
          visit a website. These files help Kolik remember user actions,
          preferences, and login details to provide a better browsing and user
          experience.
        </p>
      </section>

      {/* Why We Use Cookies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Why We Use Cookies</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Provide essential functionality:</strong> login, grocery list
            saving.
          </li>
          <li>
            <strong>Improve performance:</strong> analyse user behaviour and
            site performance.
          </li>
          <li>
            <strong>Personalisation:</strong> remember your supermarket
            preferences.
          </li>
          <li>
            <strong>Security:</strong> protect your account and data.
          </li>
          <li>
            <strong>Compliance:</strong> adhere to legal requirements.
          </li>
        </ul>
      </section>

      {/* Mandatory Cookies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Mandatory Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          These cookies are necessary for Kolik to function properly and cannot be
          disabled:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Essential Cookies:</strong> Enable core site functions such as
            login and grocery list saving.
          </li>
          <li>
            <strong>Security Cookies:</strong> Protect user data and prevent
            fraudulent activity.
          </li>
          <li>
            <strong>Compliance Cookies:</strong> Enable legal compliance, such as
            storing consent decisions.
          </li>
        </ul>
      </section>

      {/* Optional Cookies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Optional Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          You can enable or disable the following cookies based on your
          preferences:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Performance & Analytics Cookies:</strong> Help Kolik analyse web
            traffic and user behaviour.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> Store user preferences, such as
            your selected supermarket.
          </li>
        </ul>
      </section>

      {/* Managing Your Cookies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Managing Your Cookies</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li>Adjust your cookie settings via our cookie banner.</li>
          <li>
            Modify your browser settings to block or delete cookies (some
            functionalities may be affected).
          </li>
          <li>Opt out of advertising cookies through third‐party services.</li>
        </ul>
      </section>

      {/* Updates to This Policy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Updates to This Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          Kolik may update this Cookie Policy periodically to reflect changes in
          regulations or our data practices. Any modifications will be posted on
          this page with an updated date.
        </p>
      </section>

      {/* Contact Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Contact Information</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this Cookie Policy, please contact us at{' '}
          <a
            href="mailto:kolikteam@gmail.com"
            className="text-blue-600 hover:underline"
          >
            kolikteam@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  )
}
