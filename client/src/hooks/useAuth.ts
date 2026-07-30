import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

interface User {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
}

export function useAuth() {
  const query = useQuery({
    queryKey: ['session'],
    queryFn: () => api.get<User>('/session/me'),
    retry: false, // don't retry on 401 — that's a valid "not logged in" state, not a transient error
  })

  return {
    user: query.data,
    isLoading: query.isLoading,
    isAuthenticated: !query.isError && !!query.data,
  }
}