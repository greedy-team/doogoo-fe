import { Badge } from '@/components/ui/badge';
import type { PreviewEvent } from './CalendarPreview';
import { Card } from '@/components/ui/card';

interface EventItemProps {
  isListView?: boolean;
  event: PreviewEvent;
  onClick: () => void;
}

export default function EventItem({
  isListView,
  event,
  onClick,
}: EventItemProps) {
  // ISO 8601 형식을 "월 일" 형식으로 변환하는 헬퍼 함수 - api명세로 통일하기 위하여
  const dateObj = new Date(event.date);
  const day = dateObj.getDate();

  //일정(특히 두드림)의 실제일정만 표시하고, 신청기간은 나타내지 않은상태
  return (
    <Card
      className="flex cursor-pointer flex-row gap-3 p-3 shadow-none"
      onClick={onClick}
    >
      {isListView && (
        <div className="min-w-8 text-center">
          <div className="text-foreground text-lg font-bold">{day}</div>
        </div>
      )}
      <div className="flex-1 pt-1 text-left">
        <div className="text-foreground mb-1 text-sm font-medium">
          {event.title}
        </div>
        <Badge
          variant="outline"
          className={`text-xs ${
            event.serviceType === 'academic'
              ? 'border-primary/30 text-primary'
              : 'border-purple/30 text-purple'
          }`}
        >
          {event.category ?? event.serviceType}
        </Badge>
      </div>

      {/* {event.serviceType === 'doodream' && event.link && (
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5"
          onClick={() => window.open(event.link, '_blank')}
        >
          <ExternalLink />
        </Button>
      )} */}
    </Card>
  );
}
