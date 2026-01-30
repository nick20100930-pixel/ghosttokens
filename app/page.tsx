import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EtherealBackground } from '@/components/ghost-theme/ethereal-background'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <EtherealBackground />

      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-glow animate-float">
            GhostTokens
          </h1>

          <p className="text-2xl md:text-3xl text-spectral/90">
            Access the Unseen
          </p>

          <p className="text-lg text-spectral/70 max-w-2xl mx-auto">
            Premium AI API keys marketplace. Secure, mysterious, exclusive.
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <Link href="/products">
              <Button variant="primary" className="text-lg px-8 py-4">
                Explore Keys
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-lg px-8 py-4">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {[
            { title: 'Secure', desc: 'AES-256 encrypted keys' },
            { title: 'Instant', desc: 'Immediate delivery' },
            { title: 'Verified', desc: 'Tested and validated' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-void/50 border border-phantom/30 rounded-lg hover:ghost-glow transition-all"
            >
              <h3 className="text-xl font-bold text-phantom mb-2">{feature.title}</h3>
              <p className="text-spectral/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
