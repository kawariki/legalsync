import * as React from 'react';

interface CaseReadyEmailProps {
  clientName: string;
  lawyerName: string;
  caseUrl: string;
}

export function CaseReadyEmail({ clientName, lawyerName, caseUrl }: CaseReadyEmailProps) {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ background: '#0F1F3D', padding: '24px 32px' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: 24 }}>LegalSync</h1>
      </div>
      <div style={{ padding: '32px', background: '#F8FAFC' }}>
        <h2 style={{ color: '#0F172A', marginTop: 0 }}>Your Case Package is Ready</h2>
        <p style={{ color: '#334155' }}>Hello {clientName},</p>
        <p style={{ color: '#334155' }}>
          Your AI-generated case package has been prepared and is ready for your consultation with {lawyerName}.
        </p>
        <a
          href={caseUrl}
          style={{
            display: 'inline-block',
            background: '#0D9488',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          View Your Case Package
        </a>
        <p style={{ color: '#64748B', fontSize: 14, marginTop: 32 }}>
          This package includes a summary, timeline, evidence list, and suggested questions for your consultation.
        </p>
      </div>
    </div>
  );
}

export default CaseReadyEmail;
