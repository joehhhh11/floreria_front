import { useAuth } from '@clerk/clerk-react'

export default function useAuthenticatedFetch() {
  const { getToken } = useAuth()

  const authenticatedFetch = async (url, options = {}) => {
    const token = await getToken()

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  }

  return authenticatedFetch
}
