type TimelineItem = {
  date: string;
  event: string;
  significance: 'high' | 'medium' | 'low';
};

const significanceColor = {
  high: 'bg-[#EF4444]',
  medium: 'bg-[#F59E0B]',
  low: 'bg-[#0D9488]',
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${significanceColor[item.significance]}`} />
            {i < items.length - 1 && <div className="w-0.5 h-full bg-[#E2E8F0] mt-1" />}
          </div>
          <div className="pb-4">
            <p className="text-xs text-[#64748B] font-medium">{item.date}</p>
            <p className="text-sm text-[#334155] mt-0.5">{item.event}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
