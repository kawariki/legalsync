import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'LegalSync — Evidence Collection Platform',
  description: 'Turn fragmented legal documents into consultation-ready packages.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <body className="antialiased">
          {children}
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
