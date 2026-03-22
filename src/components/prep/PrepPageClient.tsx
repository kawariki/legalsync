'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Lawyer {
  id: string;
  name: string;
  firm?: string;
}

const TIERS = [
  { tier: 1, price: '₩29,900', name: 'Starter', desc: 'Up to 20 files' },
  { tier: 2, price: '₩49,900', name: 'Standard', desc: 'Up to 60 files', featured: true },
  { tier: 3, price: '₩79,900', name: 'Complex', desc: 'Unlimited files' },
];

export function PrepPageClient({ lawyer }: { lawyer: Lawyer }) {
  const [selectedTier, setSelectedTier] = useState(2);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const caseRes = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: selectedTier }),
      });
      if (!caseRes.ok) throw new Error('Failed to create case');
      const { case: newCase } = await caseRes.json();

      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: newCase.id, tier: selectedTier }),
      });
      if (!checkoutRes.ok) throw new Error('Failed to create checkout');
      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="bg-[#0F1F3D] h-16 flex items-center px-6">
        <span className="text-white font-bold text-lg">LegalSync</span>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Prepare for Your Consultation</h1>
          <p className="text-[#64748B] mt-2">
            {lawyer.name}{lawyer.firm ? ` · ${lawyer.firm}` : ''} has invited you to organize your case materials.
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {TIERS.map(t => (
            <button
              key={t.tier}
              onClick={() => setSelectedTier(t.tier)}
              className={`text-left rounded-xl border p-4 transition-all ${
                selectedTier === t.tier
                  ? 'border-[#0D9488] bg-[#CCFBF1]'
                  : 'border-[#E2E8F0] bg-white hover:border-[#0D9488]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#0F172A]">{t.name}</p>
                  <p className="text-sm text-[#64748B]">{t.desc}</p>
                </div>
                <p className="text-xl font-bold text-[#0D9488]">{t.price}</p>
              </div>
            </button>
          ))}
        </div>

        <Button size="lg" className="w-full" onClick={handlePayment} disabled={loading}>
          {loading ? 'Redirecting to payment…' : 'Prepare My Case →'}
        </Button>

        <p className="text-xs text-center text-[#94A3B8] mt-4">
          Secure payment via Stripe · Your documents are end-to-end encrypted
        </p>
      </main>
    </div>
  );
}
