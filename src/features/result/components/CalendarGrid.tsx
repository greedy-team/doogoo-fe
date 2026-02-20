import type { PreviewEvent } from '@/features/result/components/CalendarPreview';
import type { MonthData } from '@/features/result/components/generateMonthsData';

interface CalendarGridProps {
  currentMonth: MonthData;
  onDayClick: (events: PreviewEvent[]) => void;
  getEventsForDay: (month: number, day: number) => PreviewEvent[];
}

export default function CalendarGrid({
  currentMonth,
  onDayClick,
  getEventsForDay,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-1.5 lg:gap-2">
      {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
        <div
          key={day}
          className="text-muted-foreground p-1 text-center text-xs font-medium lg:p-2"
        >
          {day}
        </div>
      ))}
      {Array.from({ length: currentMonth.startDay }).map((_, i) => (
        <div key={`empty-${i}`} className="p-1" />
      ))}
      {Array.from({ length: currentMonth.days }).map((_, dayIdx) => {
        const day = dayIdx + 1;
        const dayEvents = getEventsForDay(currentMonth.number, day);
        const hasEvents = dayEvents.length > 0;

        return (
          <button
            key={day}
            className={`relative min-h-[36px] rounded-lg p-1 text-center text-xs transition-all lg:min-h-[44px] lg:p-2 lg:text-sm ${hasEvents ? 'bg-primary/10 border-primary/20 cursor-pointer border font-medium active:scale-95' : 'text-muted-foreground cursor-default'} `}
            onClick={() => {
              if (hasEvents) {
                onDayClick(dayEvents);
              }
            }}
            disabled={!hasEvents}
          >
            <div>{day}</div>
            {dayEvents.length > 0 && (
              <div className="mt-0.5 flex justify-center gap-0.5 lg:mt-1">
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <div
                    key={idx}
                    className={`h-1 w-1 rounded-full lg:h-1.5 lg:w-1.5 ${
                      event.serviceType === 'academic'
                        ? 'bg-primary'
                        : 'bg-purple-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
