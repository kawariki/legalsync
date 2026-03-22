'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export function LawyerOnboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', firm: '', referralSlug: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/lawyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Failed to create profile');
      }
      toast.success('Profile created!');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Lawyer Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              placeholder="Kim Ji-woo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-1">Law Firm</label>
            <input
              type="text"
              value={form.firm}
              onChange={e => setForm(p => ({ ...p, firm: e.target.value }))}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              placeholder="Kim & Associates"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-1">Referral Slug *</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#64748B]">legalsync.io/prep/</span>
              <input
                type="text"
                required
                pattern="^[a-z0-9-]+$"
                value={form.referralSlug}
                onChange={e => setForm(p => ({ ...p, referralSlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
                className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                placeholder="kim-jw"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating…' : 'Create Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
