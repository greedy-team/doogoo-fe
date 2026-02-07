import { CalendarFilter } from "../features/calendar/components/CalendarFilter";
import { EventBrowser } from "../features/events/components/EventBrowser";

export default function EventsPage() {
  return (
    <div className="pt-16">
      <CalendarFilter />
      <EventBrowser />
    </div>
  );
}
