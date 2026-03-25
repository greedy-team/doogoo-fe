import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';

import ResultListView from './ResultListView';
import ResultHeader from './ResultHeader';
import ResultMonthView from './ResultMonthView';
import EventDetailsDialog from './EventDetailsDialog';
import { getMonthData } from './generateMonthsData';
import {
  useGetAcademicNotices,
  useGetDodreamNotices,
} from '@/shared/hooks/useNotices';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
import {
  filterAcademicNotices,
  filterDodreamNotices,
} from '@/shared/utils/noticeFilters';

export interface PreviewEvent {
  date: string;
  startAt: string;
  endAt?: string | null;
  year: number;
  day: number;
  month: number;
  title: string;
  description?: string;
  descriptionSummary?: string;
  serviceType: 'academic' | 'doodream';
  category?: string;
  link?: string;
}

interface CalendarPreviewProps {
  selectedGradeIds: string[];
  selectedMajor: string;
  selectedInterests: Set<string>;
  selectedServices: Set<'academic' | 'doodream'>;
}

export default function CalendarPreview({
  selectedGradeIds,
  selectedMajor,
  selectedInterests,
  selectedServices,
}: CalendarPreviewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [selectedEvent, setSelectedEvent] = useState<PreviewEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // API 데이터 가져오기
  const { data: academicNotices = [] } = useGetAcademicNotices();
  const { data: dodreamNotices = [] } = useGetDodreamNotices();
  const { data: keywords = [] } = useGetKeywords();

  // 필터링된 공지 데이터
  const previewEvents = useMemo((): PreviewEvent[] => {
    const events: PreviewEvent[] = [];

    // 학사공지 필터링 및 변환
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

    // 두드림 공지 필터링 및 변환
    if (selectedServices.has('doodream')) {
      const filteredDodreamNotices = filterDodreamNotices(
        dodreamNotices,
        selectedMajor,
        selectedInterests,
      );

      filteredDodreamNotices.forEach((notice) => {
        const startDate = new Date(notice.operatingStartAt);
        const keywordName = keywords.find((k) =>
          notice.keywordIds.includes(k.id),
        )?.name;
        events.push({
          date: notice.operatingStartAt,
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

    // 날짜순 정렬
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
  // 오늘 이후 이벤트만 (헤더 개수, 리스트 뷰용)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return previewEvents.filter((e) => {
      const eventDate = new Date(e.year, e.month - 1, e.day);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    });
  }, [previewEvents]);

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
    <Card className="from-card to-accent/20 bg-linear-to-br p-6">
      <div className="space-y-4">
        <ResultHeader
          previewEvents={upcomingEvents}
          selectedServices={selectedServices}
          viewMode={viewMode}
          onViewModeChange={(mode) => setViewMode(mode)}
        />

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
      </div>

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
    </Card>
  );
}
