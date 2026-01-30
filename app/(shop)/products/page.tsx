import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-glow mb-12">API Keys</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="p-6 bg-void/50 border border-phantom/30 rounded-lg hover:ghost-glow transition-all"
            >
              <h3 className="text-xl font-bold text-phantom mb-2">{product.name}</h3>
              <p className="text-spectral/70 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-eerie">
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
