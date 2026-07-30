import { createFileRoute } from '@tanstack/react-router'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-80 rounded-xl border bg-white p-8 shadow-sm text-center">
        <h1 className="text-xl font-bold mb-1">Welcome to Grantly</h1>
        <p className="text-sm text-gray-500 mb-6">Choose a provider to continue</p>

        
         <a href={`${API_BASE_URL}/auth/external/google`}
          className="mb-3 flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium hover:bg-gray-50">
          Continue with Google
        </a>

        
         <a href={`${API_BASE_URL}/auth/external/github`}
          className="flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium hover:bg-gray-50">
          Continue with GitHub
        </a>
      </div>
    </div>
  )
}