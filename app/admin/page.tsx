'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  description: string
  provider: string
  api_type: string
  price_cents: number
  stock_count: number
  is_active: boolean
}

interface ApiKey {
  id: string
  product_id: string
  encrypted_key: string
  status: string
  created_at: string
}

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [newKey, setNewKey] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (profile?.role !== 'admin') {
      router.push('/')
      return
    }
    setIsAdmin(true)
    setLoading(false)
    loadProducts()
    loadApiKeys()
  }

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data || [])
  }

  const loadApiKeys = async () => {
    const { data } = await supabase
      .from('api_keys_inventory')
      .select('*')
      .order('created_at', { ascending: false })
    setApiKeys(data || [])
  }

  const addApiKey = async () => {
    if (!selectedProduct || !newKey.trim()) return
    await supabase.from('api_keys_inventory').insert({
      product_id: selectedProduct,
      encrypted_key: newKey.trim(),
      status: 'available'
    })
    setNewKey('')
    loadApiKeys()
    loadProducts()
  }

  const deleteApiKey = async (id: string) => {
    await supabase.from('api_keys_inventory').delete().eq('id', id)
    loadApiKeys()
  }

  const toggleProduct = async (id: string, isActive: boolean) => {
    await supabase.from('products').update({ is_active: !isActive }).eq('id', id)
    loadProducts()
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-spectral">Loading...</p>
    </div>
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-glow mb-8">Admin Dashboard</h1>
        
        {/* Products Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-spectral mb-4">Products</h2>
          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-void/50 border border-phantom/30 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-spectral">{product.name}</h3>
                  <p className="text-sm text-spectral/60">{product.provider} • ${(product.price_cents / 100).toFixed(2)}</p>
                  <p className="text-sm text-spectral/60">Stock: {product.stock_count} keys</p>
                </div>
                <Button 
                  variant={product.is_active ? "ghost" : "primary"}
                  onClick={() => toggleProduct(product.id, product.is_active)}
                >
                  {product.is_active ? 'Disable' : 'Enable'}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Add API Key Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-spectral mb-4">Add API Key</h2>
          <div className="bg-void/50 border border-phantom/30 rounded-lg p-4">
            <div className="flex gap-4 flex-wrap">
              <select 
                value={selectedProduct || ''} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="bg-void border border-phantom/30 rounded px-3 py-2 text-spectral"
              >
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="API Key"
                className="flex-1 bg-void border border-phantom/30 rounded px-3 py-2 text-spectral"
              />
              <Button onClick={addApiKey}>Add Key</Button>
            </div>
          </div>
        </section>

        {/* API Keys Inventory */}
        <section>
          <h2 className="text-xl font-semibold text-spectral mb-4">API Keys Inventory</h2>
          <div className="bg-void/50 border border-phantom/30 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-phantom/10">
                <tr>
                  <th className="text-left p-3 text-spectral">Product</th>
                  <th className="text-left p-3 text-spectral">Key (masked)</th>
                  <th className="text-left p-3 text-spectral">Status</th>
                  <th className="text-left p-3 text-spectral">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map(key => {
                  const product = products.find(p => p.id === key.product_id)
                  return (
                    <tr key={key.id} className="border-t border-phantom/20">
                      <td className="p-3 text-spectral/80">{product?.name || 'Unknown'}</td>
                      <td className="p-3 text-spectral/80 font-mono">
                        {key.encrypted_key.slice(0, 8)}...{key.encrypted_key.slice(-4)}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          key.status === 'available' ? 'bg-green-500/20 text-green-400' :
                          key.status === 'sold' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {key.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {key.status === 'available' && (
                          <Button variant="ghost" size="sm" onClick={() => deleteApiKey(key.id)}>
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
