import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { confirmEmailChange } from '../services/api'

const ConfirmEmail: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading')
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No confirmation token provided.')
      return
    }

    confirmEmailChange(token)
      .then(data => {
        setStatus('success')
        setMessage('Your email address has been updated! You can now log in again.')
      })
      .catch(err => {
        setStatus('error')
        setMessage(err.message || 'Failed to confirm email change.')
      })
  }, [token])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
      {status === 'loading' && <p>Confirming your new email…</p>}
      {(status === 'success' || status === 'error') && (
        <>
          <p className={status === 'success' ? 'text-green-700' : 'text-red-700'}>
            {message}
          </p>
          {status === 'success' && (
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Go to Login
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default ConfirmEmail
