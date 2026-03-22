import * as React from 'react';

interface PrepLinkEmailProps {
  clientName: string;
  lawyerName: string;
  prepUrl: string;
  firm?: string;
}

export function PrepLinkEmail({ clientName, lawyerName, prepUrl, firm }: PrepLinkEmailProps) {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ background: '#0F1F3D', padding: '24px 32px' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: 24 }}>LegalSync</h1>
      </div>
      <div style={{ padding: '32px', background: '#F8FAFC' }}>
        <h2 style={{ color: '#0F172A', marginTop: 0 }}>Prepare for Your Consultation</h2>
        <p style={{ color: '#334155' }}>Hello {clientName},</p>
        <p style={{ color: '#334155' }}>
          {lawyerName}{firm ? ` from ${firm}` : ''} has invited you to prepare for your legal consultation using LegalSync.
        </p>
        <p style={{ color: '#334155' }}>
          Upload your documents and let our AI help you organize your case before the meeting.
        </p>
        <a
          href={prepUrl}
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
          Prepare My Case
        </a>
      </div>
    </div>
  );
}

export default PrepLinkEmail;
