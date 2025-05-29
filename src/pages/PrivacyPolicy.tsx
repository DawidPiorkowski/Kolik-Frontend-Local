// src/pages/PrivacyPolicy.tsx
import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto my-16 p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <section className="space-y-4 text-gray-700">
        <h2 className="text-2xl font-semibold">2.1 Introduction</h2>
        <p>
          Kolik values your privacy and is committed to protecting your personal data. This
          Privacy Policy outlines how we collect, use, and safeguard your information when you
          use Kolik.
        </p>

        <h2 className="text-2xl font-semibold">2.2 Data We Collect</h2>
        <p><strong>Personal Information:</strong> Name, email address, login credentials, ID/Passport for identity verification.</p>
        <p><strong>Usage Data:</strong> Pages visited, time spent on the website, preferences.</p>
        <p><strong>Transaction Data:</strong> Grocery list items saved and price comparison history.</p>
        <p><strong>Technical Data:</strong> IP address, browser type and device information.</p>
        <p>
          <strong>ID/Passport Information:</strong> Your ID will be processed solely for identity
          verification purposes and will not be used for initiating or participating in legal
          proceedings against you. It will be stored securely in line with our Privacy Policy.
          Verification will be required every six (6) months to ensure your account remains secure
          and active. You may withdraw your consent at any time. However, if you request deletion
          of your data, Kolik is legally required to store your Name, Surname, Phone Number and
          Email address for a period of six (6) months following the deletion request, as mandated
          by the Czech government. If you do not agree to this, please do not proceed.
        </p>

        <h2 className="text-2xl font-semibold">2.3 How We Use Your Data</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To provide and improve our price comparison services.</li>
          <li>To personalise your shopping experience.</li>
          <li>To communicate important updates or promotional offers (if consent is given).</li>
          <li>To ensure website security and prevent fraudulent activity and verify user identity through ID/Passport processing every six (6) months.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold">2.4 Data Sharing and Third Party Services</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share data with
          third-party service providers (e.g. analytics, payment processors) only when necessary
          for functionality. Some third-party tools, like Google Analytics, may collect data to
          improve performance. Prices and product information are obtained from third-party
          supermarket APIs, and Kolik does not control their accuracy.
        </p>

        <h2 className="text-2xl font-semibold">2.5 Data Security</h2>
        <p>
          Kolik implements security measures to protect your personal data from unauthorised
          access, loss, or misuse. However, no online service is completely secure, and we cannot
          guarantee absolute protection.
        </p>

        <h2 className="text-2xl font-semibold">2.6 User Rights and Control</h2>
        <p>
          You have the right to access, update, or delete your personal information. You can opt
          out of marketing communications at any time. You may request data deletion or restriction
          of processing by contacting us.
        </p>

        <h2 className="text-2xl font-semibold">2.7 Cookie Usage</h2>
        <p>
          Kolik uses cookies to enhance user experience and analyse performance. Kolik uses
          essential cookies for functionality, analytical cookies to track usage trends, and
          marketing cookies for relevant advertisements. Users can manage their cookie preferences
          through their browser settings or our cookie preference center.
        </p>

        <h2 className="text-2xl font-semibold">2.9 Changes to Privacy Policy</h2>
        <p>
          Kolik reserves the right to update this Privacy Policy at any time. Any changes will be
          posted on this page with the updated date.
        </p>

        <h2 className="text-2xl font-semibold">2.10 Contact Information</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy, please contact us
          at{' '}
          <a href="mailto:kolikteam@gmail.com" className="text-blue-600 hover:underline">
            kolikteam@gmail.com
          </a>.
        </p>
      </section>
    </div>
  )
}
