'use client';

import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function DropZone({ onFilesSelected, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) onFilesSelected(files);
  }, [onFilesSelected]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) onFilesSelected(files);
  }, [onFilesSelected]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors
        ${isDragging ? 'border-[#0D9488] bg-[#CCFBF1]' : 'border-[#E2E8F0] bg-white hover:border-[#0D9488] hover:bg-[#F8FAFC]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={() => !disabled && document.getElementById('file-input')?.click()}
    >
      <div className="p-4 rounded-full bg-[#CCFBF1]">
        <Upload className="w-8 h-8 text-[#0D9488]" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-[#334155]">
          Drag & drop files here, or click to browse
        </p>
        <p className="text-xs text-[#64748B] mt-1">
          PDF, Images, Audio — Any format accepted
        </p>
      </div>
      <input
        id="file-input"
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.gif,.mp3,.wav,.m4a,.txt"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
