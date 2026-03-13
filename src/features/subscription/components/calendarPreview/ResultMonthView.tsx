import { useState } from 'react';
import EventItem from './EventItem';
import CalendarGrid from './CalendarGrid';
import type { PreviewEvent } from './CalendarPreview';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ResultMonthViewProps {
  getEventsForDay: (year: number, month: number, day: number) => PreviewEvent[];
  onEventClick: (event: PreviewEvent) => void;
}

export default function ResultMonthView({
  getEventsForDay,
  onEventClick,
}: ResultMonthViewProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<PreviewEvent[]>(
    [],
  );

  return (
    <div className="space-y-3 pt-2">
      {/* Calendar grid with built-in navigation */}
      <CalendarGrid
        onDayClick={(date, events) => {
          setSelectedDay(date.getDate());
          setSelectedDayEvents(events);
        }}
        getEventsForDay={getEventsForDay}
        initialMonth={currentMonth}
        onMonthChange={(month) => {
          setCurrentMonth(month);
          setSelectedDay(null);
          setSelectedDayEvents([]);
        }}
      />
      {/* Event list for selected date */}
      <div className="block border-t pt-4">
        <h4 className="text-foreground mb-3 text-sm font-semibold">
          {selectedDay !== null ? `${selectedDay}일` : '일별'} 행사 목록
        </h4>
        <ScrollArea className="max-h-[30vh]">
          <div className="space-y-2 pr-4">
            {selectedDayEvents.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-sm">
                날짜를 선택하면 일정을 확인할 수 있습니다
              </p>
            ) : (
              selectedDayEvents.map((event, index) => (
                <EventItem
                  isListView={false}
                  key={index}
                  event={event}
                  onClick={() => onEventClick(event)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
