'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { DropZone } from '@/components/upload/DropZone';
import { FileCard } from '@/components/upload/FileCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  fileName: string;
  fileCategory: 'conversation' | 'contract' | 'audio' | 'photo' | 'other';
  uploadedAt: Date;
}

function UploadPageContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get('caseId');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(f => ({
      id: Math.random().toString(36).slice(2),
      fileName: f.name,
      fileCategory: detectCategory(f.name),
      uploadedAt: new Date(),
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`${files.length} file(s) added`);
  };

  const detectCategory = (name: string): UploadedFile['fileCategory'] => {
    const lower = name.toLowerCase();
    if (lower.includes('kakao') || lower.includes('chat') || lower.includes('message')) return 'conversation';
    if (lower.includes('contract') || lower.endsWith('.pdf')) return 'contract';
    if (lower.endsWith('.mp3') || lower.endsWith('.wav') || lower.endsWith('.m4a')) return 'audio';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) return 'photo';
    return 'other';
  };

  const handleRemove = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async () => {
    if (!caseId || uploadedFiles.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/process-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId }),
      });
      if (!response.ok) throw new Error('Failed to start processing');
      toast.success('Processing started! You will be notified when ready.');
    } catch {
      toast.error('Failed to start processing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Upload Your Evidence</h1>
          <p className="text-[#64748B] mt-2">
            Upload everything related to your case. Evidence is scattered across messages, documents, and photos — we will organize it all.
          </p>
        </div>

        <DropZone onFilesSelected={handleFilesSelected} disabled={submitting} />

        {uploadedFiles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">
              Uploaded Evidence ({uploadedFiles.length})
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {uploadedFiles.map(file => (
                <FileCard
                  key={file.id}
                  fileName={file.fileName}
                  fileCategory={file.fileCategory}
                  uploadedAt={file.uploadedAt}
                  onRemove={() => handleRemove(file.id)}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8"
              >
                {submitting ? 'Processing…' : 'Analyze My Case →'}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense>
      <UploadPageContent />
    </Suspense>
  );
}
