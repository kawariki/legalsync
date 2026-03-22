import { Badge } from '@/components/ui/badge';

type CaseStatus = 'pending_payment' | 'pending_upload' | 'processing' | 'ready' | 'error';

const statusConfig: Record<CaseStatus, { label: string; variant: 'pending' | 'processing' | 'ready' | 'error' | 'default' }> = {
  pending_payment: { label: 'Awaiting Payment', variant: 'pending' },
  pending_upload: { label: 'Awaiting Upload', variant: 'pending' },
  processing: { label: 'Processing', variant: 'processing' },
  ready: { label: 'Ready', variant: 'ready' },
  error: { label: 'Error', variant: 'error' },
};

export function StatusBadge({ status }: { status: CaseStatus }) {
  const config = statusConfig[status] ?? { label: status, variant: 'default' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
