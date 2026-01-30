import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-glow mb-12">Your Vault</h1>

        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="p-6 bg-void/50 border border-phantom/30 rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-spectral/70 text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-2xl font-bold text-eerie">
                    ${(order.total_cents / 100).toFixed(2)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'completed' ? 'bg-eerie/20 text-eerie' : 'bg-phantom/20 text-phantom'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-spectral">{item.products?.name}</span>
                    <span className="text-spectral/70">${(item.price_cents / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
