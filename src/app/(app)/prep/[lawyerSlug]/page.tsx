import { notFound } from 'next/navigation';
import { db } from '@/db';
import { lawyers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PrepPageClient } from '@/components/prep/PrepPageClient';

export default async function PrepPage({
  params,
}: {
  params: Promise<{ lawyerSlug: string }>;
}) {
  const { lawyerSlug } = await params;
  const [lawyer] = await db.select().from(lawyers).where(eq(lawyers.referralSlug, lawyerSlug));
  if (!lawyer) notFound();

  return <PrepPageClient lawyer={{ id: lawyer.id, name: lawyer.name, firm: lawyer.firm ?? undefined }} />;
}
