'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        setIsAdmin(profile?.role === 'admin')
      }
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-phantom/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <span className="gradient-text">Ghost</span>
          <span className="text-spectral">Tokens</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products" className="text-spectral hover:text-phantom transition-colors">
            Products
          </Link>
          <Link href="/dashboard" className="text-spectral hover:text-phantom transition-colors">
            Dashboard
          </Link>
          {isAdmin && (
            <Link href="/admin" className="text-phantom hover:text-glow transition-colors">
              Admin
            </Link>
          )}
          {!loading && (
            user ? (
              <Button variant="ghost" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  )
}
