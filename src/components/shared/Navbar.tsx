import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export function Navbar() {
  return (
    <nav className="bg-[#0F1F3D] border-b border-[#1a3060]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-white font-bold text-lg tracking-tight">
              LegalSync
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-[#94A3B8] hover:text-white text-sm transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
