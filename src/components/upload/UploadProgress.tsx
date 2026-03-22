'use client';

import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  fileName: string;
  progress: number;
}

export function UploadProgress({ fileName, progress }: UploadProgressProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#334155] truncate">{fileName}</p>
        <span className="text-xs text-[#64748B]">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
