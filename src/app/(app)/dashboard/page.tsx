import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { cases, lawyers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Navbar } from '@/components/shared/Navbar';
import { CaseList } from '@/components/lawyer/CaseList';
import { ReferralLinkCard } from '@/components/lawyer/ReferralLinkCard';
import { Card, CardContent } from '@/components/ui/card';
import { LawyerOnboarding } from '@/components/lawyer/LawyerOnboarding';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const [lawyer] = await db.select().from(lawyers).where(eq(lawyers.clerkUserId, userId));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-10">
          <LawyerOnboarding />
        </main>
      </div>
    );
  }

  const lawyerCases = await db.select().from(cases)
    .where(eq(cases.lawyerId, lawyer.id))
    .orderBy(cases.createdAt);

  const stats = {
    total: lawyerCases.length,
    ready: lawyerCases.filter(c => c.status === 'ready').length,
    processing: lawyerCases.filter(c => c.status === 'processing').length,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              Welcome back, {lawyer.name}
            </h1>
            <p className="text-[#64748B] mt-1">{lawyer.firm ?? 'LegalSync'}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Cases', value: stats.total },
            { label: 'Ready', value: stats.ready },
            { label: 'Processing', value: stats.processing },
          ].map(stat => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
                <p className="text-sm text-[#64748B] mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ReferralLinkCard lawyerSlug={lawyer.referralSlug} appUrl={appUrl} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
              <div className="p-6 border-b border-[#E2E8F0]">
                <h2 className="font-semibold text-[#0F172A]">Recent Cases</h2>
              </div>
              <CaseList cases={lawyerCases} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
