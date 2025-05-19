// src/pages/VerifyEmail.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { verifyEmail } from '../services/api'
import { Spinner } from '../components/Spinner'

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setError('No verification token provided.')
      setLoading(false)
      return
    }
    verifyEmail(token)
      .then((data) => {
        setMessage(data.message || 'Your email has been verified!')
        // After a short pause, send them to login
        setTimeout(() => navigate('/login', { replace: true }), 3000)
      })
      .catch((err: any) => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [token, navigate])

  if (loading) return <Spinner />

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow text-center">
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <p className="text-green-700 mb-4">{message}</p>
          <p>You’ll be redirected to <strong>Log In</strong> in a moment.</p>
        </>
      )}
    </div>
  )
}
