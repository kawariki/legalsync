import Link from 'next/link';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import type { cases } from '@/db/schema';
import type { InferSelectModel } from 'drizzle-orm';

type Case = InferSelectModel<typeof cases>;

export function CaseList({ cases: caseList }: { cases: Case[] }) {
  if (caseList.length === 0) {
    return (
      <div className="text-center py-12 text-[#64748B]">
        <p className="text-sm">No cases yet. Generate a prep link to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="text-left py-3 px-4 text-xs text-[#64748B] font-medium uppercase tracking-wide">Client</th>
            <th className="text-left py-3 px-4 text-xs text-[#64748B] font-medium uppercase tracking-wide">Status</th>
            <th className="text-left py-3 px-4 text-xs text-[#64748B] font-medium uppercase tracking-wide">Date</th>
            <th className="text-left py-3 px-4 text-xs text-[#64748B] font-medium uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {caseList.map(c => (
            <tr key={c.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
              <td className="py-3 px-4">
                <p className="font-medium text-[#0F172A]">{c.clientName ?? 'Unknown'}</p>
                <p className="text-xs text-[#64748B]">{c.clientEmail ?? '—'}</p>
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={c.status as 'pending_payment' | 'pending_upload' | 'processing' | 'ready' | 'error'} />
              </td>
              <td className="py-3 px-4 text-[#64748B]">
                {new Date(c.createdAt).toLocaleDateString('ko-KR')}
              </td>
              <td className="py-3 px-4">
                {c.status === 'ready' && (
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/case/${c.id}`}>View Package</Link>
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
