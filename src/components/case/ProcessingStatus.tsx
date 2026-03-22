'use client';

import { createSupabaseClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const STEPS = [
  { key: 'upload', label: 'Files received' },
  { key: 'processing', label: 'AI analyzing documents' },
  { key: 'ready', label: 'Case package ready' },
];

const STATUS_ORDER = ['pending_upload', 'processing', 'ready'];

export function ProcessingStatus({ caseId, initialStatus }: { caseId: string; initialStatus: string }) {
  const [status, setStatus] = useState<string>(initialStatus);

  useEffect(() => {
    const supabase = createSupabaseClient();

    const channel = supabase
      .channel(`case-status-${caseId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'cases',
        filter: `id=eq.${caseId}`,
      }, (payload) => {
        setStatus((payload.new as { status: string }).status);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [caseId]);

  const progressValue = status === 'processing' ? 60 : status === 'ready' ? 100 : 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {status === 'ready' ? (
          <CheckCircle className="w-6 h-6 text-[#0D9488]" />
        ) : status === 'error' ? (
          <XCircle className="w-6 h-6 text-[#EF4444]" />
        ) : (
          <Loader2 className="w-6 h-6 text-[#0D9488] animate-spin" />
        )}
        <p className="font-medium text-[#0F172A]">
          {status === 'ready' ? 'Your case package is ready!' : status === 'error' ? 'Processing failed' : 'Processing your documents…'}
        </p>
      </div>

      <Progress value={progressValue} />

      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const isCompleted = STATUS_ORDER.indexOf(status) >= i;
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[#0D9488]' : 'bg-[#E2E8F0]'}`} />
              <span className={`text-sm ${isCompleted ? 'text-[#0F172A] font-medium' : 'text-[#94A3B8]'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
