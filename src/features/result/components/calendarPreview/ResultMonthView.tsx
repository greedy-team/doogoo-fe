import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CalendarGrid from './CalendarGrid';
import type { PreviewEvent } from './CalendarPreview';
import type { MonthData } from './generateMonthsData';

interface ResultMonthViewProps {
  currentMonth: MonthData;
  monthsData: MonthData[];
  currentMonthIndex: number;
  previewEvents: PreviewEvent[];
  onMonthChange: (index: number) => void;
  onDayClick: (events: PreviewEvent[]) => void;
  getEventsForDay: (month: number, day: number) => PreviewEvent[];
}

export default function ResultMonthView({
  currentMonth,
  monthsData,
  currentMonthIndex,
  previewEvents,
  onMonthChange,
  onDayClick,
  getEventsForDay,
}: ResultMonthViewProps) {
  const canGoPrev = currentMonthIndex > 0;
  const canGoNext = currentMonthIndex < monthsData.length - 1;

  return (
    <div className="space-y-3 pt-2">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onMonthChange(currentMonthIndex - 1)}
          disabled={!canGoPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h3 className="text-foreground text-base font-semibold">
          {currentMonth.name} 2026
        </h3>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onMonthChange(currentMonthIndex + 1)}
          disabled={!canGoNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <CalendarGrid
        currentMonth={currentMonth}
        onDayClick={onDayClick}
        getEventsForDay={getEventsForDay}
      />

      {/* Event list for current month (Desktop only) */}
      <div className="hidden border-t pt-4 lg:block">
        <h4 className="text-foreground mb-3 text-sm font-semibold">
          {currentMonth.name} 행사 목록
        </h4>
        <div className="max-h-[30vh] space-y-2 overflow-y-auto">
          {previewEvents
            .filter((e) => e.month === currentMonth.number)
            .map((event, index) => (
              <div
                key={index}
                className="bg-card border-border flex items-start gap-2 rounded-lg border p-2 text-sm"
              >
                <div className="min-w-[36px] pt-0.5 text-center">
                  <div className="text-foreground text-base font-bold">
                    {event.day}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-foreground text-sm font-medium">
                    {event.title}
                  </div>
                  <Badge
                    variant="outline"
                    className={`mt-1 text-xs ${
                      event.serviceType === 'academic'
                        ? 'border-primary/30 text-primary bg-primary/5'
                        : 'border-purple-300 bg-purple-50 text-purple-600'
                    }`}
                  >
                    {event.category ||
                      (event.serviceType === 'academic' ? '학사' : '두드림')}
                  </Badge>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
