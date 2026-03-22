import { MessageSquare, FileText, Mic, Image, File } from 'lucide-react';

type FileCategory = 'conversation' | 'contract' | 'audio' | 'photo' | 'other';

const categoryConfig = {
  conversation: {
    icon: MessageSquare,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tagBg: 'bg-blue-50 text-blue-700',
    label: 'Conversation',
  },
  contract: {
    icon: FileText,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    tagBg: 'bg-amber-50 text-amber-700',
    label: 'Contract',
  },
  audio: {
    icon: Mic,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    tagBg: 'bg-purple-50 text-purple-700',
    label: 'Audio',
  },
  photo: {
    icon: Image,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    tagBg: 'bg-red-50 text-red-700',
    label: 'Photo',
  },
  other: {
    icon: File,
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    tagBg: 'bg-gray-50 text-gray-700',
    label: 'Document',
  },
};

interface FileCardProps {
  fileName: string;
  fileCategory: FileCategory;
  uploadedAt: Date;
  onRemove?: () => void;
}

export function FileCard({ fileName, fileCategory, uploadedAt, onRemove }: FileCardProps) {
  const config = categoryConfig[fileCategory] ?? categoryConfig.other;
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${config.iconBg}`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-[#94A3B8] hover:text-[#EF4444] transition-colors text-xs"
          >
            ✕
          </button>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-[#0F172A] truncate">{fileName}</p>
        <p className="text-xs text-[#64748B] mt-1">
          {uploadedAt.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </p>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${config.tagBg}`}>
        {config.label}
      </span>
    </div>
  );
}
