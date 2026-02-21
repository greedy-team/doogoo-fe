import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { PreviewEvent } from '@/features/result/components/CalendarPreview';

interface EventItemProps {
  event: PreviewEvent;
  onClick: () => void;
}

export default function EventItem({ event, onClick }: EventItemProps) {
  return (
    <button
      onClick={onClick}
      className="bg-card border-border hover:border-primary/30 flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all active:scale-[0.98]"
    >
      <div className="min-w-[48px] text-center">
        <div className="text-muted-foreground text-xs font-medium">
          {event.date.split(' ')[0]}
        </div>
        <div className="text-foreground text-lg font-bold">
          {event.date.split(' ')[1].replace('일', '')}
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-1 text-left">
        <div className="text-foreground mb-1 text-sm font-medium">
          {event.title}
        </div>
        <Badge
          variant="outline"
          className={`text-xs ${
            event.serviceType === 'academic'
              ? 'border-primary/30 text-primary'
              : 'border-purple-300 text-purple-600'
          }`}
        >
          {event.category ||
            (event.serviceType === 'academic' ? '학사' : '두드림')}
        </Badge>
      </div>
      <ChevronRight className="text-muted-foreground mt-2 h-4 w-4 shrink-0" />
    </button>
  );
}
