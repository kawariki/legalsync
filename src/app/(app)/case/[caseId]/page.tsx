import { notFound } from 'next/navigation';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Navbar } from '@/components/shared/Navbar';
import { CasePackageViewer } from '@/components/case/CasePackage';
import { ProcessingStatus } from '@/components/case/ProcessingStatus';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default async function CasePackagePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;

  const [caseRecord] = await db.select().from(cases).where(eq(cases.id, caseId));
  if (!caseRecord) notFound();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Case Package</h1>
            <p className="text-[#64748B] mt-1">
              {caseRecord.clientName ? `Prepared for ${caseRecord.clientName}` : 'Case Analysis'}
            </p>
          </div>
          <StatusBadge status={caseRecord.status as 'pending_payment' | 'pending_upload' | 'processing' | 'ready' | 'error'} />
        </div>

        {caseRecord.status === 'ready' && caseRecord.casePackage ? (
          <CasePackageViewer casePackage={caseRecord.casePackage} />
        ) : (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-8">
            <ProcessingStatus caseId={caseId} initialStatus={caseRecord.status} />
          </div>
        )}
      </main>
    </div>
  );
}
