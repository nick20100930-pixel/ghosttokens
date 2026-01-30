'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-void/50 p-8 rounded-lg border border-phantom/30 ghost-glow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-glow">Access the Unseen</h2>
          <p className="mt-2 text-spectral/70">Sign in to your account</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-void border border-phantom/30 rounded-lg text-spectral focus:outline-none focus:border-phantom"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-void border border-phantom/30 rounded-lg text-spectral focus:outline-none focus:border-phantom"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-phantom/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-void text-spectral/70">Or continue with</span>
          </div>
        </div>

        <Button variant="ghost" className="w-full" onClick={handleGoogleLogin}>
          Google
        </Button>
      </div>
    </div>
  )
}
