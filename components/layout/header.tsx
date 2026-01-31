'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
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
          <Button variant="ghost">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  )
}
