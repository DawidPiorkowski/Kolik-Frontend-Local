// src/pages/TermsAndConditions.tsx
import React from 'react'

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto my-16 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Terms and Conditions
      </h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Terms and Conditions</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            <h3 className="font-semibold">1.1 Introduction</h3>
            <p>
              Welcome to Kolik! By accessing Kolik you agree to be bound by these Terms and
              Conditions. If you do not agree with any part of these terms, please do not
              use our services.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">1.2 User Eligibility</h3>
            <p>
              You must be at least 18 years old to utilise our services. If you are under 18,
              you may only utilise the website under the supervision of a legal guardian.
              By creating an account, you confirm that the information provided is accurate and
              complete.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">1.3 Account Registration and Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials.
              We reserve the right to suspend or terminate accounts found to be violating our terms
              or engaging in fraudulent activity.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">1.4 Use of Services</h3>
            <p>
              Kolik provides price comparisons across major supermarkets in Czechia and allows
              users to save their grocery lists. Prices are updated periodically and may not
              always reflect real-time changes from supermarkets. You may not use our services
              for any illegal or unauthorised purposes.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">1.5 Intellectual Property</h3>
            <p>
              All content, including logos, text, images, and software, is owned by Kolik or its
              licensors. Data sources from third-party supermarket APIs remain the property of
              the respective supermarkets or data providers. Unauthorised reproduction,
              distribution, or modification of our original content is strictly prohibited.
              Whilst we aggregate and display supermarket pricing information, we do not claim
              ownership over third-party data and provide it only for informational purposes.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">1.6 Limitation of Liability</h3>
            <p>
              Kolik does not guarantee the accuracy or availability of the prices displayed as
              they are sourced from external supermarket APIs. Prices are updated periodically
              based on data provided by third-party sources, and availability may change without
              notice. Users should verify final prices directly with the respective supermarkets
              before making a purchase. Kolik is not responsible for any direct, indirect,
              incidental, or consequential damages resulting from the use of our services.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">1.7 Modification to Terms</h3>
            <p>
              Kolik reserves the right to update these Terms and Conditions at any time. Users
              will be notified of significant changes via a notification banner on the website.
              Continued use of the website after changes constitutes acceptance of the new terms.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">1.8 Contact Information</h3>
            <p>
              If you have any questions about these Terms and Conditions, please contact Kolik at{' '}
              <a href="mailto:kolikteam@gmail.com" className="text-blue-600 hover:underline">
                kolikteam@gmail.com
              </a>.
            </p>
          </li>
        </ol>
      </section>
    </div>
  )
}
