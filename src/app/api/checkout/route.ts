import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/lib/stripe';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { eq } from 'drizzle-orm';

const CheckoutSchema = z.object({
  caseId: z.string().uuid(),
  tier: z.number().int().min(1).max(3),
});

export async function POST(req: NextRequest) {
  const body = CheckoutSchema.parse(await req.json());
  const { caseId, tier } = body;

  const [caseRecord] = await db.select().from(cases).where(eq(cases.id, caseId));
  if (!caseRecord) {
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const session = await createCheckoutSession({
    caseId,
    tier,
    successUrl: `${appUrl}/upload?caseId=${caseId}`,
    cancelUrl: `${appUrl}/prep`,
  });

  return NextResponse.json({ url: session.url });
}
