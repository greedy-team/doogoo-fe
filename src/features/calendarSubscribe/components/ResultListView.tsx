import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import EventItem from './EventItem';

import type { PreviewEvent } from './CalendarPreview';
import type { MonthData } from './generateMonthsData';

interface ResultListViewProps {
  previewEvents: PreviewEvent[];
  monthsData: MonthData[];
  currentMonthIndex: number;
  onMonthChange: (index: number) => void;
  onEventClick: (events: PreviewEvent[]) => void;
  getEventsForDay: (month: number, day: number) => PreviewEvent[];
}

export default function ResultListView({
  previewEvents,
  monthsData,
  currentMonthIndex,
  onMonthChange,
  onEventClick,
  getEventsForDay,
}: ResultListViewProps) {
  const currentMonth = monthsData[currentMonthIndex];
  const canGoPrev = currentMonthIndex > 0;
  const canGoNext = currentMonthIndex < monthsData.length - 1;

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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMonthChange(Math.max(0, currentMonthIndex - 1))}
              disabled={!canGoPrev}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              이전
            </Button>

            <h3 className="text-foreground text-base font-semibold">
              {currentMonth.name} 2026
            </h3>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onMonthChange(
                  Math.min(monthsData.length - 1, currentMonthIndex + 1),
                )
              }
              disabled={!canGoNext}
            >
              다음 달
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Events for current month */}
          <div className="max-h-[60vh] space-y-2 overflow-y-auto lg:max-h-[70vh]">
            {previewEvents
              .filter((e) => e.month === currentMonth.number)
              .map((event, index) => {
                const dayEvents = getEventsForDay(event.month, event.day);
                return (
                  <EventItem
                    key={index}
                    event={event}
                    onClick={() => {
                      onEventClick(dayEvents);
                    }}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
