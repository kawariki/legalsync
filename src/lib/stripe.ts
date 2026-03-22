import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-02-25.clover',
    });
  }
  return _stripe;
}

export const TIER_PRICES: Record<number, number> = {
  1: 29900,
  2: 49900,
  3: 79900,
};

export async function createCheckoutSession({
  caseId,
  tier,
  successUrl,
  cancelUrl,
}: {
  caseId: string;
  tier: number;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripe();
  const amount = TIER_PRICES[tier] ?? TIER_PRICES[2];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'krw',
          product_data: {
            name: `LegalSync Case Preparation — Tier ${tier}`,
            description: `AI-powered case package preparation`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { caseId, tier: String(tier) },
  });

  return session;
}
