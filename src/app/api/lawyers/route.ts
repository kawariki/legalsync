import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';
import { db } from '@/db';
import { lawyers } from '@/db/schema';
import { eq } from 'drizzle-orm';

const CreateLawyerSchema = z.object({
  name: z.string().min(1),
  firm: z.string().optional(),
  referralSlug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) {
    return NextResponse.json({ error: 'No email found' }, { status: 400 });
  }

  const body = CreateLawyerSchema.parse(await req.json());

  const [newLawyer] = await db.insert(lawyers).values({
    clerkUserId: userId,
    name: body.name,
    email,
    firm: body.firm,
    referralSlug: body.referralSlug,
  }).returning();

  return NextResponse.json({ lawyer: newLawyer });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [lawyer] = await db.select().from(lawyers).where(eq(lawyers.clerkUserId, userId));
  return NextResponse.json({ lawyer: lawyer ?? null });
}
