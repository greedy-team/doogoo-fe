import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import type { PreviewEvent } from './CalendarPreview';

interface EventDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDayEvents: PreviewEvent[];
}

export default function EventDetailsDialog({
  isOpen,
  onOpenChange,
  selectedDayEvents,
}: EventDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>행사 상세 정보</DialogTitle>
          <DialogDescription>
            {selectedDayEvents.length > 1
              ? `${selectedDayEvents[0]?.date}에 ${selectedDayEvents.length}개의 행사가 있습니다.`
              : `${selectedDayEvents[0]?.date}에 열리는 행사입니다.`}
          </DialogDescription>
        </DialogHeader>
        {selectedDayEvents.length > 0 && (
          <div className="space-y-3 py-2">
            {selectedDayEvents.map((event, index) => (
              <Card key={index} className="p-4 shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="min-w-[48px] text-center">
                      <div className="text-muted-foreground text-xs font-medium">
                        {event.date.split(' ')[0]}
                      </div>
                      <div className="text-primary text-2xl font-bold">
                        {event.date.split(' ')[1].replace('일', '')}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <h4 className="text-foreground mb-2 text-base font-semibold">
                        {event.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          event.serviceType === 'academic'
                            ? 'border-primary/30 text-primary bg-primary/5'
                            : 'border-purple-300 bg-purple-50 text-purple-600'
                        }`}
                      >
                        {event.category ||
                          (event.serviceType === 'academic'
                            ? '학사'
                            : '두드림')}
                      </Badge>
                    </div>
                  </div>

                  {event.link && (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        window.open(event.link, '_blank');
                      }}
                    >
                      자세히 보기
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
