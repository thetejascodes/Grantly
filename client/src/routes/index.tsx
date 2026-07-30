import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { api } from '../lib/api'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  useEffect(() => {
  api.get('/session/me').then(console.log).catch(console.error)
}, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}