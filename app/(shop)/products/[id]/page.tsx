import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { createCheckoutSession } from '@/lib/actions/checkout'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-void/50 border border-phantom/30 rounded-lg p-8 ghost-glow">
          <h1 className="text-4xl font-bold text-glow mb-4">{product.name}</h1>
          <p className="text-spectral/70 text-lg mb-8">{product.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-spectral/70 text-sm">Provider</p>
                <p className="text-spectral font-medium">{product.provider}</p>
              </div>
              <div>
                <p className="text-spectral/70 text-sm">API Type</p>
                <p className="text-spectral font-medium">{product.api_type}</p>
              </div>
              {product.quota_requests && (
                <div>
                  <p className="text-spectral/70 text-sm">Request Quota</p>
                  <p className="text-spectral font-medium">{product.quota_requests.toLocaleString()}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {product.validity_days && (
                <div>
                  <p className="text-spectral/70 text-sm">Validity</p>
                  <p className="text-spectral font-medium">{product.validity_days} days</p>
                </div>
              )}
              <div>
                <p className="text-spectral/70 text-sm">Stock</p>
                <p className="text-spectral font-medium">{product.stock_count} available</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-phantom/30">
            <p className="text-4xl font-bold text-eerie">
              ${(product.price_cents / 100).toFixed(2)}
            </p>
            <form action={createCheckoutSession.bind(null, product.id)}>
              <Button type="submit" variant="primary" className="text-lg px-8 py-4">
                Purchase Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
