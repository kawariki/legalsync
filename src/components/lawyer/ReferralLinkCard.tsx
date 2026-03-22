'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReferralLinkCardProps {
  lawyerSlug: string;
  appUrl?: string;
}

export function ReferralLinkCard({ lawyerSlug, appUrl = 'https://legalsync.io' }: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const url = `${appUrl}/prep/${lawyerSlug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your Client Prep Link</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[#64748B] mb-3">
          Share this link with your client before their consultation.
        </p>
        <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3">
          <span className="text-sm text-[#334155] flex-1 truncate">{url}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="flex-shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-[#0D9488]" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
