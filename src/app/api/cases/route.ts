import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { db } from '@/db';
import { cases, lawyers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';

const CreateCaseSchema = z.object({
  clientEmail: z.string().email().optional(),
  clientName: z.string().optional(),
  tier: z.number().int().min(1).max(3).default(2),
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = CreateCaseSchema.parse(await req.json());

  const [lawyer] = await db.select().from(lawyers).where(eq(lawyers.clerkUserId, userId));
  if (!lawyer) {
    return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 });
  }

  const shareToken = randomBytes(16).toString('hex');

  const [newCase] = await db.insert(cases).values({
    lawyerId: lawyer.id,
    clientEmail: body.clientEmail,
    clientName: body.clientName,
    tier: body.tier,
    shareToken,
    status: 'pending_payment',
  }).returning();

  return NextResponse.json({ case: newCase });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [lawyer] = await db.select().from(lawyers).where(eq(lawyers.clerkUserId, userId));
  if (!lawyer) {
    return NextResponse.json({ cases: [] });
  }

  const lawyerCases = await db.select().from(cases)
    .where(eq(cases.lawyerId, lawyer.id))
    .orderBy(cases.createdAt);

  return NextResponse.json({ cases: lawyerCases });
}
