import { useEffect, useMemo, useState } from 'react';
import { Grid3x3, GraduationCap, List, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EventDetailsDialog from './EventDetailsDialog';
import ResultListView from './ResultListView';
import ResultMonthView from './ResultMonthView';
import { getMonthData } from './generateMonthsData';
import type { PreviewEvent } from './CalendarPreview';
import {
  useGetAcademicNotices,
  useGetDodreamNotices,
} from '@/shared/hooks/useNotices';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
import {
  filterAcademicNotices,
  filterDodreamNotices,
} from '@/shared/utils/noticeFilters';

interface MobileCalendarPreviewProps {
  selectedGradeIds: string[];
  selectedMajor: string;
  selectedInterests: Set<string>;
  selectedServices: Set<'academic' | 'doodream'>;
  onUpcomingCountChange: (count: number) => void;
}

export default function MobileCalendarPreview({
  selectedGradeIds,
  selectedMajor,
  selectedInterests,
  selectedServices,
  onUpcomingCountChange,
}: MobileCalendarPreviewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [selectedEvent, setSelectedEvent] = useState<PreviewEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: academicNotices = [] } = useGetAcademicNotices();
  const { data: dodreamNotices = [] } = useGetDodreamNotices();
  const { data: keywords = [] } = useGetKeywords();

  const previewEvents = useMemo((): PreviewEvent[] => {
    const events: PreviewEvent[] = [];

    if (selectedServices.has('academic')) {
      const filteredAcademicNotices = filterAcademicNotices(
        academicNotices,
        selectedGradeIds,
      );

      filteredAcademicNotices.forEach((notice) => {
        const startDate = new Date(notice.startAt);
        events.push({
          date: notice.startAt,
          startAt: notice.startAt,
          endAt: notice.endAt,
          year: startDate.getFullYear(),
          day: startDate.getDate(),
          month: startDate.getMonth() + 1,
          title: notice.title,
          description: '학사 일정 안내입니다.',
          serviceType: 'academic',
          category: '학사',
        });
      });
    }

    if (selectedServices.has('doodream')) {
      const filteredDodreamNotices = filterDodreamNotices(
        dodreamNotices,
        selectedMajor,
        selectedInterests,
      );

      filteredDodreamNotices.forEach((notice) => {
        const displayDateString = notice.applicationStartAt || notice.operatingStartAt;
        const startDate = new Date(displayDateString);
        const keywordName = keywords.find((k) =>
          notice.keywordIds.includes(k.id),
        )?.name;
        events.push({
          date: displayDateString,
          startAt: notice.operatingStartAt,
          endAt: notice.operatingEndAt,
          year: startDate.getFullYear(),
          day: startDate.getDate(),
          month: startDate.getMonth() + 1,
          title: notice.title,
          description: notice.description,
          descriptionSummary: notice.descriptionSummary,
          serviceType: 'doodream',
          category: keywordName,
          link: notice.detailUrl,
        });
      });
    }

    return events.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });
  }, [
    academicNotices,
    dodreamNotices,
    keywords,
    selectedGradeIds,
    selectedMajor,
    selectedInterests,
    selectedServices,
  ]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return previewEvents.filter((e) => {
      const eventDate = new Date(e.year, e.month - 1, e.day);
      eventDate.setHours(0, 0, 0, 0);

      let isOngoingApplication = false;
      if (e.applicationStartAt && e.applicationEndAt) {
        const appStart = new Date(e.applicationStartAt);
        appStart.setHours(0, 0, 0, 0);
        const appEnd = new Date(e.applicationEndAt);
        appEnd.setHours(23, 59, 59, 999);
        isOngoingApplication = today >= appStart && today <= appEnd;
      }

      return eventDate >= today || isOngoingApplication;
    });
  }, [previewEvents]);

  useEffect(() => {
    onUpcomingCountChange(upcomingEvents.length);
  }, [onUpcomingCountChange, upcomingEvents.length]);

  const doodreamCount = upcomingEvents.filter(
    (e) => e.serviceType === 'doodream',
  ).length;
  const academicCount = upcomingEvents.filter(
    (e) => e.serviceType === 'academic',
  ).length;

  const currentMonthData = getMonthData(currentYear, currentMonth);

  const goToPrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventsForDay = (year: number, month: number, day: number) => {
    return previewEvents.filter(
      (e) => e.year === year && e.month === month && e.day === day,
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {selectedServices.has('academic') && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <GraduationCap className="mr-1 h-3 w-3" />
              {academicCount}개 학사
            </Badge>
          )}
          {selectedServices.has('doodream') && (
            <Badge
              variant="secondary"
              className="bg-purple/10 text-purple border-purple"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              {doodreamCount}개 두드림
            </Badge>
          )}
        </div>

        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as 'list' | 'month')}
          className="w-auto"
        >
          <TabsList className="grid h-8 w-auto grid-cols-2">
            <TabsTrigger value="list" className="px-3 text-xs">
              <List className="mr-1 h-3 w-3" />
              목록
            </TabsTrigger>
            <TabsTrigger value="month" className="px-3 text-xs">
              <Grid3x3 className="mr-1 h-3 w-3" />
              월간
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === 'list' ? (
        <ResultListView
          previewEvents={upcomingEvents}
          currentMonthData={currentMonthData}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onEventClick={(event) => {
            setSelectedEvent(event);
            setIsDialogOpen(true);
          }}
        />
      ) : (
        <ResultMonthView
          getEventsForDay={getEventsForDay}
          onEventClick={(event) => {
            setSelectedEvent(event);
            setIsDialogOpen(true);
          }}
        />
      )}

      <EventDetailsDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedEvent(null);
          }
        }}
        selectedEvent={selectedEvent}
      />
    </>
  );
}
