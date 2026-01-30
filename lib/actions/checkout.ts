'use server'

import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/server'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (!product) throw new Error('Product not found')

  const { data: order } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_cents: product.price_cents,
      status: 'pending',
    })
    .select()
    .single()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price_cents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/products/${productId}`,
    metadata: {
      order_id: order.id,
      product_id: productId,
    },
  })

  await supabase
    .from('orders')
    .update({ stripe_checkout_session_id: session.id })
    .eq('id', order.id)

  redirect(session.url!)
}
