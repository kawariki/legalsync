import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, FileCheck, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="bg-[#0F1F3D] border-b border-[#1a3060]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="text-white font-bold text-xl tracking-tight">LegalSync</span>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-[#94A3B8] hover:text-white">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="default">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#0F172A] mb-6">
          Turn Scattered Documents<br />
          Into a <span className="text-[#0D9488]">Ready-to-Use Case Package</span>
        </h1>
        <p className="text-xl text-[#334155] mb-10 max-w-2xl mx-auto">
          Upload your KakaoTalk chats, contracts, photos, and audio. Our AI organizes everything
          into a structured package for your legal consultation.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="px-8">Start Free Trial</Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">Sign In</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FileCheck, title: 'Smart Document Analysis', desc: 'AI extracts key facts from PDFs, images, and audio files automatically.' },
            { icon: Clock, title: 'Chronological Timeline', desc: 'All events organized in order, so nothing gets missed.' },
            { icon: Shield, title: 'Secure & Private', desc: 'Your documents are encrypted and never shared without consent.' },
            { icon: Star, title: 'Lawyer-Ready', desc: 'Structured output designed for Korean legal consultations.' },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardContent className="pt-6">
                <div className="p-2 rounded-lg bg-[#CCFBF1] w-fit mb-4">
                  <Icon className="w-5 h-5 text-[#0D9488]" />
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{title}</h3>
                <p className="text-sm text-[#64748B]">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { tier: 1, price: '29,900', name: 'Starter', desc: 'Up to 20 files', featured: false },
            { tier: 2, price: '49,900', name: 'Standard', desc: 'Up to 60 files', featured: true },
            { tier: 3, price: '79,900', name: 'Complex', desc: 'Unlimited files', featured: false },
          ].map(p => (
            <Card key={p.tier} className={p.featured ? 'border-[#0D9488] border-2 relative' : ''}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D9488] text-white text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </div>
              )}
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-[#64748B]">{p.name}</p>
                <p className="text-4xl font-bold text-[#0F172A] my-2">₩{p.price}</p>
                <p className="text-sm text-[#64748B] mb-6">{p.desc}</p>
                <Button className="w-full" variant={p.featured ? 'default' : 'outline'}>
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1F3D] mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#64748B] text-sm">
          © 2026 LegalSync. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
