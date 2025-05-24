// src/services/config.ts

/**
 * Base URL for all API requests.
 */
export const API_BASE = 'http://localhost:8000/api'

/**
 * Universal error handler for fetch responses.
 * Reads JSON to extract DRF-style errors, then throws an Error.
 */
export async function handleError(res: Response): Promise<never> {
  let msg = `HTTP ${res.status}`

  try {
    const data = await res.json()

    if (data) {
      // 1) if DRF sent a non_field_errors array, use that directly:
      if (Array.isArray((data as any).non_field_errors) &&
          (data as any).non_field_errors.length) {
        msg = (data as any).non_field_errors.join(' ')
      }
      // 2) else if there's a detail string, use that
      else if (typeof (data as any).detail === 'string') {
        msg = (data as any).detail
      }
      // 3) otherwise flatten other field errors
      else {
        const parts: string[] = []
        for (const [key, val] of Object.entries(data)) {
          if (Array.isArray(val)) {
            parts.push(`${key}: ${val.join(' ')}`)
          } else if (typeof val === 'string') {
            parts.push(`${key}: ${val}`)
          }
        }
        if (parts.length) {
          msg = parts.join(' — ')
        }
      }
    }
  } catch {
    // ignore invalid JSON, keep HTTP status
  }

  throw new Error(msg)
}

/**
 * Read a cookie value by name (returns null if not present).
 */
export function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)')
  )
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Hit Django’s CSRF endpoint to set the `csrftoken` cookie,
 * then return its value for use in X-CSRFToken headers.
 */
export async function fetchCsrfToken(): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/csrf/`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) await handleError(res)

  const token = getCookie('csrftoken')
  if (!token) throw new Error('CSRF cookie not found')
  return token
}
