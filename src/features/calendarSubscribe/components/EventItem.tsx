import { ChevronRight } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import type { PreviewEvent } from './CalendarPreview';

interface EventItemProps {
  event: PreviewEvent;
  onClick: () => void;
}

export default function EventItem({ event, onClick }: EventItemProps) {
  // ISO 8601 형식을 "월 일" 형식으로 변환하는 헬퍼 함수 - api명세로 통일하기 위하여
  const dateObj = new Date(event.date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return (
    <button
      onClick={onClick}
      className="bg-card border-border hover:border-primary/30 flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all active:scale-[0.98]"
    >
      <div className="min-w-[48px] text-center">
        <div className="text-muted-foreground text-xs font-medium">
          {month}월
        </div>
        <div className="text-foreground text-lg font-bold">
          {day}
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
