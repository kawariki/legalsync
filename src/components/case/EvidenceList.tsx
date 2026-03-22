import { FileText, MessageSquare, Mic, Image, File } from 'lucide-react';

type Evidence = {
  item: string;
  fileName: string;
  relevance: string;
  category: string;
};

const categoryIcon: Record<string, React.ElementType> = {
  conversation: MessageSquare,
  contract: FileText,
  audio: Mic,
  photo: Image,
  document: FileText,
  other: File,
};

const categoryStyle: Record<string, string> = {
  conversation: 'bg-blue-50 text-blue-600',
  contract: 'bg-amber-50 text-amber-600',
  audio: 'bg-purple-50 text-purple-600',
  photo: 'bg-red-50 text-red-600',
  document: 'bg-amber-50 text-amber-600',
  other: 'bg-gray-50 text-gray-600',
};

export function EvidenceList({ items }: { items: Evidence[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const Icon = categoryIcon[item.category] ?? File;
        const style = categoryStyle[item.category] ?? categoryStyle.other;
        return (
          <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg ${style}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0F172A]">{item.item}</p>
                <p className="text-xs text-[#64748B] mt-0.5">{item.fileName}</p>
                <p className="text-xs text-[#334155] mt-1">{item.relevance}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
