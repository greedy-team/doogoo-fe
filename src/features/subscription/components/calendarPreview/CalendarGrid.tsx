import { Calendar } from '@/components/ui/calendar';
import { ko } from 'date-fns/locale';
import type { PreviewEvent } from './CalendarPreview';

interface CalendarGridProps {
  onDayClick: (date: Date, events: PreviewEvent[]) => void;
  getEventsForDay: (month: number, day: number) => PreviewEvent[];
  initialMonth?: Date;
  onMonthChange?: (month: Date) => void;
}

export default function CalendarGrid({
  onDayClick,
  getEventsForDay,
  initialMonth,
  onMonthChange,
}: CalendarGridProps) {
  // Use initial month or default to current date
  const defaultMonth = initialMonth || new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Calendar
      mode="single"
      defaultMonth={defaultMonth}
      locale={ko}
      onMonthChange={onMonthChange}
      onDayClick={(date) => {
        if (date) {
          const dayEvents = getEventsForDay(
            date.getMonth() + 1,
            date.getDate(),
          );
          if (dayEvents.length > 0) {
            onDayClick(date, dayEvents);
          }
        }
      }}
      classNames={{
        week: 'mt-2 flex w-full gap-1',
      }}
      components={{
        DayButton: ({ day, ...props }) => {
          const dayDate = new Date(day.date);
          dayDate.setHours(0, 0, 0, 0);
          const dayEvents = getEventsForDay(
            day.date.getMonth() + 1,
            day.date.getDate(),
          );
          const hasEvents = dayEvents.length > 0;
          const isPastEventDay = hasEvents && dayDate < today;

          return (
            <button
              {...props}
              className={`relative m-0.5 flex h-full w-full flex-col items-center justify-center rounded-lg p-1 text-xs transition-all lg:text-sm xl:p-2 ${
                isPastEventDay
                  ? 'text-muted-foreground border-muted bg-muted/30 cursor-pointer border'
                  : hasEvents
                    ? 'bg-primary/10 border-primary/20 hover:bg-primary/20 cursor-pointer border font-medium active:scale-95'
                    : 'cursor-default'
              }`}
              onClick={(e) => {
                if (!hasEvents) {
                  e.preventDefault();
                  return;
                }
                props.onClick?.(e);
              }}
            >
              <div>{day.date.getDate()}</div>
              {hasEvents && (
                <div className="mt-0.5 flex justify-center gap-0.5 xl:mt-1">
                  {dayEvents.slice(0, 3).map((event, idx) => (
                    <div
                      key={idx}
                      className={`h-1 w-1 rounded-full lg:h-1.5 lg:w-1.5 ${
                        isPastEventDay
                          ? 'bg-muted-foreground/60'
                          : event.serviceType === 'academic'
                            ? 'bg-primary'
                            : 'bg-purple-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        },
      }}
      className="w-full"
      formatters={{
        formatWeekdayName: (date) => {
          const days = ['일', '월', '화', '수', '목', '금', '토'];
          return days[date.getDay()];
        },
      }}
    />
  );
}
