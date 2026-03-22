import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { inngest } from '@/inngest/client';

const Schema = z.object({
  caseId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  const body = Schema.parse(await req.json());
  await inngest.send({ name: 'case/files.uploaded', data: { caseId: body.caseId } });
  return NextResponse.json({ ok: true });
}
