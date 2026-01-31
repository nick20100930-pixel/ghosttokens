import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { EtherealBackground } from '@/components/ghost-theme/ethereal-background'

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      <EtherealBackground />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">API Keys</span>
          </h1>
          <p className="text-spectral/60">Choose your power</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="ghost-card p-6 rounded-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-phantom mb-2">{product.name}</h3>
              <p className="text-spectral/60 mb-4 text-sm">{product.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-phantom/20">
                <span className="text-2xl font-bold text-glow-green text-eerie">
                  ${(product.price_cents / 100).toFixed(2)}
                </span>
                <span className="text-sm text-spectral/50">
                  {product.stock_count} available
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
