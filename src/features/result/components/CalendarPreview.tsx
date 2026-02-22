import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';

import ResultListView from './ResultListView';
import ResultHeader from './ResultHeader';
import ResultMonthView from './ResultMonthView';
import EventDetailsDialog from './EventDetailsDialog';
import generateMonthsData from './generateMonthsData';

import type { MonthData } from './generateMonthsData';
import {
  useGetAcademicNotices,
  useGetDodreamNotices,
} from '@/features/academicNotice/hooks/useNotices';
import {
  filterAcademicNotices,
  filterDodreamNotices,
} from '@/features/academicNotice/utils/noticeFilters';

export interface PreviewEvent {
  date: string;
  day: number;
  month: number;
  title: string;
  serviceType: 'academic' | 'doodream';
  category?: string;
  link?: string;
}

interface CalendarPreviewProps {
  selectedYear: number;
  yearFilterType: 'my-year' | 'all';
  selectedMajor: string;
  selectedInterests: Set<string>;
  selectedServices: Set<'academic' | 'doodream'>;
}

export default function CalendarPreview({
  selectedYear,
  yearFilterType,
  selectedMajor,
  selectedInterests,
  selectedServices,
}: CalendarPreviewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [selectedDayEvents, setSelectedDayEvents] = useState<PreviewEvent[]>(
    [],
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // API 데이터 가져오기
  const { data: academicNotices = [] } = useGetAcademicNotices();
  const { data: dodreamNotices = [] } = useGetDodreamNotices();

  // 필터링된 공지 데이터
  const previewEvents = useMemo((): PreviewEvent[] => {
    const events: PreviewEvent[] = [];

    // 학사공지 필터링 및 변환
    if (selectedServices.has('academic')) {
      const filteredAcademicNotices = filterAcademicNotices(
        academicNotices,
        selectedYear,
        yearFilterType,
      );

      filteredAcademicNotices.forEach((notice) => {
        const startDate = new Date(notice.startAt);
        events.push({
          date: notice.startAt,
          day: startDate.getDate(),
          month: startDate.getMonth() + 1,
          title: notice.title,
          serviceType: 'academic',
        });
      });
    }

    // 두드림 공지 필터링 및 변환
    if (selectedServices.has('doodream')) {
      const filteredDodreamNotices = filterDodreamNotices(
        dodreamNotices,
        selectedMajor,
        selectedInterests,
      );

      filteredDodreamNotices.forEach((notice) => {
        const startDate = new Date(notice.operatingStartAt);
        events.push({
          date: notice.operatingStartAt,
          day: startDate.getDate(),
          month: startDate.getMonth() + 1,
          title: notice.title,
          serviceType: 'doodream',
          link: notice.detailUrl,
        });
      });
    }

    // 날짜순 정렬
    return events.sort((a, b) => {
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });
  }, [
    academicNotices,
    dodreamNotices,
    selectedYear,
    yearFilterType,
    selectedMajor,
    selectedInterests,
    selectedServices,
  ]);
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
