import { useState } from 'react';
import { Card } from '@/shared/ui/card';

import ResultListView from './ResultListView';
import ResultHeader from './ResultHeader';
import ResultMonthView from './ResultMonthView';
import EventDetailsDialog from './EventDetailsDialog';
import generateMonthsData from './generateMonthsData';

import resultPreviewEventsData from '@/mock/data/resultPreviewEvents.json';
import type { MonthData } from './generateMonthsData';

interface RawPreviewEvent {
  date: string;
  day: number;
  month: number;
  title: string;
  serviceType: string;
  category?: string;
  link?: string;
}

type RawData = {
  academicEvents: RawPreviewEvent[];
  doodreamEvents: Record<string, RawPreviewEvent[]>;
};

const data = resultPreviewEventsData as RawData;

export interface PreviewEvent {
  date: string;
  day: number;
  month: number;
  title: string;
  serviceType: 'academic' | 'doodream';
  category?: string;
  link?: string;
}

export default function CalendarPreview() {
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [selectedDayEvents, setSelectedDayEvents] = useState<PreviewEvent[]>(
    [],
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isValidEvent = (e: RawPreviewEvent): e is PreviewEvent => {
    return e.serviceType === 'academic' || e.serviceType === 'doodream';
  };

  const safeAcademicEvents: PreviewEvent[] =
    data.academicEvents.filter(isValidEvent);

  const safeDooDreamEvents: PreviewEvent[] = Object.values(data.doodreamEvents)
    .flat()
    .filter(isValidEvent);

  // Mock preview events based on selections
  const getPreviewEvents = (): PreviewEvent[] => {
    const events: PreviewEvent[] = [];

    events.push(...safeAcademicEvents);
    events.push(...safeDooDreamEvents);

    return events.sort((a, b) => {
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });
  };

  const previewEvents = getPreviewEvents();
  const monthsData: MonthData[] = generateMonthsData();

  const getEventsForDay = (month: number, day: number) => {
    return previewEvents.filter((e) => e.month === month && e.day === day);
  };

  const currentMonth = monthsData[currentMonthIndex];

  return (
    <Card className="from-card to-accent/20 bg-linear-to-br p-6 shadow-lg lg:shadow-xl">
      <div className="space-y-4">
        <ResultHeader
          previewEvents={previewEvents}
          viewMode={viewMode}
          onViewModeChange={(mode) => setViewMode(mode)}
        />

        {viewMode === 'list' ? (
          <ResultListView
            previewEvents={previewEvents}
            monthsData={monthsData}
            currentMonthIndex={currentMonthIndex}
            onMonthChange={setCurrentMonthIndex}
            onEventClick={(events) => {
              setSelectedDayEvents(events);
              setIsDialogOpen(true);
            }}
            getEventsForDay={getEventsForDay}
          />
        ) : (
          <ResultMonthView
            currentMonth={currentMonth}
            monthsData={monthsData}
            currentMonthIndex={currentMonthIndex}
            previewEvents={previewEvents}
            onMonthChange={setCurrentMonthIndex}
            onDayClick={(events) => {
              setSelectedDayEvents(events);
              setIsDialogOpen(true);
            }}
            getEventsForDay={getEventsForDay}
          />
        )}
      </div>

      <EventDetailsDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDayEvents={selectedDayEvents}
      />
    </Card>
  );
}
