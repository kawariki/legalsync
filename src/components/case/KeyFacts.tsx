import { Info } from 'lucide-react';

type KeyFact = {
  fact: string;
  source: string;
};

export function KeyFacts({ facts }: { facts: KeyFact[] }) {
  return (
    <div className="space-y-3">
      {facts.map((item, i) => (
        <div key={i} className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#334155]">{item.fact}</p>
              <p className="text-xs text-[#64748B] mt-1">Source: {item.source}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
