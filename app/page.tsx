import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EtherealBackground } from '@/components/ghost-theme/ethereal-background'

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <EtherealBackground />

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Logo */}
          <div className="mb-8">
            <span className="text-6xl">👻</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold animate-float">
            <span className="gradient-text">Ghost</span>
            <span className="text-spectral">Tokens</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-phantom animate-pulse-glow">
            Access the Unseen
          </p>

          {/* Description */}
          <p className="text-lg text-spectral/60 max-w-xl mx-auto">
            Premium AI API keys. Encrypted. Instant. Anonymous.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center pt-8">
            <Link href="/products">
              <Button variant="primary" className="text-lg px-8 py-4">
                Browse Keys
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-lg px-8 py-4">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="ghost-card p-6 rounded-xl transition-all duration-300">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-phantom mb-2">Secure</h3>
            <p className="text-spectral/60">AES-256 encrypted keys</p>
          </div>

          {/* Feature 2 */}
          <div className="ghost-card p-6 rounded-xl transition-all duration-300">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-phantom mb-2">Instant</h3>
            <p className="text-spectral/60">Immediate delivery</p>
          </div>

          {/* Feature 3 */}
          <div className="ghost-card p-6 rounded-xl transition-all duration-300">
            <div className="text-3xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-phantom mb-2">Verified</h3>
            <p className="text-spectral/60">Tested and validated</p>
          </div>
        </div>
      </div>
    </main>
  )
}