import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventItem from './EventItem';

import type { PreviewEvent } from './CalendarPreview';
import type { MonthData } from './generateMonthsData';

interface ResultListViewProps {
  previewEvents: PreviewEvent[];
  currentMonthData: MonthData;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onEventClick: (event: PreviewEvent) => void;
}

export default function ResultListView({
  previewEvents,
  currentMonthData,
  onPrevMonth,
  onNextMonth,
  onEventClick,
}: ResultListViewProps) {
  return (
    <div className="pt-2">
      {previewEvents.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center text-sm">
          <Calendar className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p className="font-medium">학년과 관심사를 선택하여</p>
          <p>미리보기를 확인하세요</p>
        </div>
      ) : (
        <>
          {/* Month navigation for list view */}
          <div className="mb-4 flex items-center justify-between border-b pb-2">
            <Button variant="ghost" size="sm" onClick={onPrevMonth}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              이전
            </Button>

            <h3 className="text-foreground text-base font-semibold">
              {currentMonthData.name} {currentMonthData.year}
            </h3>

            <Button variant="ghost" size="sm" onClick={onNextMonth}>
              다음 달
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Events for current month */}
          <div className="space-y-2">
            {(() => {
              const monthEvents = previewEvents.filter(
                (e) =>
                  e.year === currentMonthData.year &&
                  e.month === currentMonthData.number,
              );
              return monthEvents.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center text-sm">
                  <p>일정이 없습니다</p>
                </div>
              ) : (
                monthEvents.map((event, index) => {
                  return (
                    <EventItem
                      isListView={true}
                      key={index}
                      event={event}
                      onClick={() => {
                        onEventClick(event);
                      }}
                    />
                  );
                })
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
}
