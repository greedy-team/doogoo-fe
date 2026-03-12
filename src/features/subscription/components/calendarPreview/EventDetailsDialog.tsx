import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { PreviewEvent } from './CalendarPreview';

interface EventDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEvent: PreviewEvent | null;
}

export default function EventDetailsDialog({
  isOpen,
  onOpenChange,
  selectedEvent,
}: EventDetailsDialogProps) {
  const formatDate = (isoDate?: string | null) => {
    if (!isoDate) {
      return '-';
    }

    const dateObj = new Date(isoDate);
    if (Number.isNaN(dateObj.getTime())) {
      return '-';
    }

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${month}월 ${day}일`;
  };

  const eventTypeLabel =
    selectedEvent?.serviceType === 'academic' ? '학사 일정' : '두드림 일정';

  console.log('Selected Event in Dialog:', selectedEvent); // 디버깅용 로그

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-5 sm:max-w-120">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-lg leading-tight wrap-break-word">
            {selectedEvent?.title ?? '행사 상세 정보'}
          </DialogTitle>
        </DialogHeader>
        {selectedEvent && (
          <div className="space-y-4 py-1">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className={
                  selectedEvent.serviceType === 'academic'
                    ? 'border-primary/30 bg-primary/5 text-primary'
                    : 'border-purple/30 bg-purple/5 text-purple'
                }
              >
                {selectedEvent.category ?? eventTypeLabel}
              </Badge>
              {selectedEvent.descriptionSummary ? (
                <p className="text-muted-foreground line-clamp text-sm leading-6">
                  {selectedEvent.descriptionSummary}
                </p>
              ) : (
                <p className="text-muted-foreground line-clamp-3 text-sm leading-6">
                  {selectedEvent.description || '상세 내용이 없습니다.'}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span className="text-foreground">
                {formatDate(selectedEvent.startAt)}
                {' - '}
                {formatDate(selectedEvent.endAt ?? selectedEvent.startAt)}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-1 w-full bg-white text-black shadow-none hover:bg-white/90"
              onClick={() => {
                if (selectedEvent.link) {
                  const url = selectedEvent.link.startsWith('http')
                    ? selectedEvent.link
                    : `https://${selectedEvent.link}`;
                  window.open(url, '_blank');
                }
              }}
              disabled={!selectedEvent.link}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {selectedEvent.link
                ? '이벤트 페이지로 이동'
                : '이벤트 페이지 링크 없음'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
