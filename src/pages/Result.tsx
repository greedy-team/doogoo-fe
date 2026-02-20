import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  GraduationCap,
  Sparkles,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CalendarPreviewProps {
  selectedYear: number;
  selectedMajor: string;
  selectedInterests: Set<string>;
}

interface PreviewEvent {
  date: string;
  day: number;
  month: number;
  title: string;
  type: 'academic' | 'doodream';
  category?: string;
  link?: string;
}

export default function Result({
  selectedYear,
  selectedMajor,
  selectedInterests,
}: CalendarPreviewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [selectedDayEvents, setSelectedDayEvents] = useState<PreviewEvent[]>(
    [],
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock preview events based on selections
  const getPreviewEvents = (): PreviewEvent[] => {
    const events: PreviewEvent[] = [];

    // Academic events
    events.push(
      {
        date: '2월 12일',
        day: 12,
        month: 2,
        title: '중간고사 기간 시작',
        type: 'academic',
      },
      {
        date: '3월 1일',
        day: 1,
        month: 3,
        title: '삼일절 (휴교)',
        type: 'academic',
      },
      {
        date: '4월 21일',
        day: 21,
        month: 4,
        title: '기말고사 기간',
        type: 'academic',
      },
      { date: '3월 3일', day: 3, month: 3, title: '개강', type: 'academic' },
      {
        date: '2월 28일',
        day: 28,
        month: 2,
        title: '수강정정 기간',
        type: 'academic',
      },
      {
        date: '4월 5일',
        day: 5,
        month: 4,
        title: '중간 성적 공시',
        type: 'academic',
      },
    );

    // Doodream events based on interests - 대회 및 학술제
    if (selectedInterests.has('competition')) {
      events.push(
        {
          date: '2월 25일',
          day: 25,
          month: 2,
          title: '2026 세종 해커톤 대회',
          type: 'doodream',
          category: '대회 및 학술제',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '3월 15일',
          day: 15,
          month: 3,
          title: 'SW 융합 경진대회',
          type: 'doodream',
          category: '대회 및 학술제',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '4월 8일',
          day: 8,
          month: 4,
          title: '창의아이디어 공모전',
          type: 'doodream',
          category: '대회 및 학술제',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '2월 22일',
          day: 22,
          month: 2,
          title: '학술논문 발표대회',
          type: 'doodream',
          category: '대회 및 학술제',
          link: 'https://doodream.sejong.ac.kr',
        },
      );
    }

    // 취창업
    if (selectedInterests.has('career')) {
      events.push(
        {
          date: '3월 5일',
          day: 5,
          month: 3,
          title: '창업 아이디어 경진대회',
          type: 'doodream',
          category: '취창업',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '4월 10일',
          day: 10,
          month: 4,
          title: '스타트업 IR 데이',
          type: 'doodream',
          category: '취창업',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '2월 18일',
          day: 18,
          month: 2,
          title: '대기업 채용 설명회',
          type: 'doodream',
          category: '취창업',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '3월 20일',
          day: 20,
          month: 3,
          title: '면접 스킬업 특강',
          type: 'doodream',
          category: '취창업',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '4월 15일',
          day: 15,
          month: 4,
          title: '취업 멘토링 프로그램',
          type: 'doodream',
          category: '취창업',
          link: 'https://doodream.sejong.ac.kr',
        },
      );
    }

    // 봉사·사회참여
    if (selectedInterests.has('volunteer')) {
      events.push(
        {
          date: '3월 8일',
          day: 8,
          month: 3,
          title: '지역사회 봉사활동',
          type: 'doodream',
          category: '봉사·사회참여',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '4월 12일',
          day: 12,
          month: 4,
          title: '환경정화 캠페인',
          type: 'doodream',
          category: '봉사·사회참여',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '2월 20일',
          day: 20,
          month: 2,
          title: '독거노인 돌봄 봉사',
          type: 'doodream',
          category: '봉사·사회참여',
          link: 'https://doodream.sejong.ac.kr',
        },
      );
    }

    // 상담
    if (selectedInterests.has('counseling')) {
      events.push(
        {
          date: '2월 14일',
          day: 14,
          month: 2,
          title: '심리상담 워크샵',
          type: 'doodream',
          category: '상담',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '3월 18일',
          day: 18,
          month: 3,
          title: '진로탐색 상담 프로그램',
          type: 'doodream',
          category: '상담',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '4월 22일',
          day: 22,
          month: 4,
          title: '학업 멘토링 상담',
          type: 'doodream',
          category: '상담',
          link: 'https://doodream.sejong.ac.kr',
        },
      );
    }

    // 글로벌
    if (selectedInterests.has('global')) {
      events.push(
        {
          date: '3월 11일',
          day: 11,
          month: 3,
          title: '교환학생 설명회',
          type: 'doodream',
          category: '글로벌',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '4월 18일',
          day: 18,
          month: 4,
          title: '국제교류 프로그램',
          type: 'doodream',
          category: '글로벌',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '2월 26일',
          day: 26,
          month: 2,
          title: '해외 인턴십 박람회',
          type: 'doodream',
          category: '글로벌',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '3월 28일',
          day: 28,
          month: 3,
          title: '글로벌 문화체험',
          type: 'doodream',
          category: '글로벌',
          link: 'https://doodream.sejong.ac.kr',
        },
      );
    }

    // 캠퍼스
    if (selectedInterests.has('campus')) {
      events.push(
        {
          date: '3월 12일',
          day: 12,
          month: 3,
          title: '동아리 박람회',
          type: 'doodream',
          category: '캠퍼스',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '4월 25일',
          day: 25,
          month: 4,
          title: '세종 봄 축제',
          type: 'doodream',
          category: '캠퍼스',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '2월 16일',
          day: 16,
          month: 2,
          title: '신입생 환영회',
          type: 'doodream',
          category: '캠퍼스',
          link: 'https://doodream.sejong.ac.kr',
        },
        {
          date: '3월 25일',
          day: 25,
          month: 3,
          title: '학과 체육대회',
          type: 'doodream',
          category: '캠퍼스',
          link: 'https://doodream.sejong.ac.kr',
        },
      );
    }

    // Sort by month and day
    return events.sort((a, b) => {
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });
  };

  const previewEvents = getPreviewEvents();
  const doodreamCount = previewEvents.filter(
    (e) => e.type === 'doodream',
  ).length;
  const academicCount = previewEvents.filter(
    (e) => e.type === 'academic',
  ).length;

  // Generate month view calendar data for February-April 2026
  const monthsData = [
    { name: '2월', number: 2, days: 28, startDay: 0 }, // Feb 2026 starts on Sunday
    { name: '3월', number: 3, days: 31, startDay: 0 }, // Mar 2026 starts on Sunday
    { name: '4월', number: 4, days: 30, startDay: 3 }, // Apr 2026 starts on Wednesday
  ];

  const getEventsForDay = (month: number, day: number) => {
    return previewEvents.filter((e) => e.month === month && e.day === day);
  };

  const currentMonth = monthsData[currentMonthIndex];
  const canGoPrev = currentMonthIndex > 0;
  const canGoNext = currentMonthIndex < monthsData.length - 1;

  return (
    <Card className="from-card to-accent/20 bg-gradient-to-br p-6 shadow-lg lg:shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Calendar className="text-primary h-5 w-5" />
            </div>
            <div>
              <h2 className="text-foreground text-xl font-semibold">
                미리보기
              </h2>
              <p className="text-muted-foreground text-xs">
                {previewEvents.length}개 행사가 동기화됩니다
              </p>
            </div>
          </div>
          <Sparkles className="text-primary h-5 w-5" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <GraduationCap className="mr-1 h-3 w-3" />
              {academicCount}개 학사
            </Badge>
            {doodreamCount > 0 && (
              <Badge
                variant="secondary"
                className="border-purple-200 bg-purple-100 text-purple-700"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                {doodreamCount}개 두드림
              </Badge>
            )}
          </div>

          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as 'list' | 'month')}
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
                    onClick={() =>
                      setCurrentMonthIndex((prev) => Math.max(0, prev - 1))
                    }
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
                      setCurrentMonthIndex((prev) =>
                        Math.min(monthsData.length - 1, prev + 1),
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
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedDayEvents(dayEvents);
                            setIsDialogOpen(true);
                          }}
                          className="bg-card border-border hover:border-primary/30 flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all active:scale-[0.98]"
                        >
                          <div className="min-w-[48px] text-center">
                            <div className="text-muted-foreground text-xs font-medium">
                              {event.date.split(' ')[0]}
                            </div>
                            <div className="text-foreground text-lg font-bold">
                              {event.date.split(' ')[1].replace('일', '')}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 pt-1 text-left">
                            <div className="text-foreground mb-1 text-sm font-medium">
                              {event.title}
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                event.type === 'academic'
                                  ? 'border-primary/30 text-primary'
                                  : 'border-purple-300 text-purple-600'
                              }`}
                            >
                              {event.category ||
                                (event.type === 'academic' ? '학사' : '두드림')}
                            </Badge>
                          </div>
                          <ChevronRight className="text-muted-foreground mt-2 h-4 w-4 shrink-0" />
                        </button>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {/* Month navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentMonthIndex((prev) => prev - 1)}
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
                onClick={() => setCurrentMonthIndex((prev) => prev + 1)}
                disabled={!canGoNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Calendar grid */}
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
                        setSelectedDayEvents(dayEvents);
                        setIsDialogOpen(true);
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
                              event.type === 'academic'
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
                            event.type === 'academic'
                              ? 'border-primary/30 text-primary'
                              : 'border-purple-300 text-purple-600'
                          }`}
                        >
                          {event.category ||
                            (event.type === 'academic' ? '학사' : '두드림')}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>행사 상세 정보</DialogTitle>
            <DialogDescription>
              {selectedDayEvents.length > 1
                ? `${selectedDayEvents[0]?.date}에 ${selectedDayEvents.length}개의 행사가 있습니다.`
                : `${selectedDayEvents[0]?.date}에 열리는 행사입니다.`}
            </DialogDescription>
          </DialogHeader>
          {selectedDayEvents.length > 0 && (
            <div className="space-y-3 py-2">
              {selectedDayEvents.map((event, index) => (
                <Card key={index} className="p-4 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="min-w-[48px] text-center">
                        <div className="text-muted-foreground text-xs font-medium">
                          {event.date.split(' ')[0]}
                        </div>
                        <div className="text-primary text-2xl font-bold">
                          {event.date.split(' ')[1].replace('일', '')}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <h4 className="text-foreground mb-2 text-base font-semibold">
                          {event.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            event.type === 'academic'
                              ? 'border-primary/30 text-primary bg-primary/5'
                              : 'border-purple-300 bg-purple-50 text-purple-600'
                          }`}
                        >
                          {event.category ||
                            (event.type === 'academic' ? '학사' : '두드림')}
                        </Badge>
                      </div>
                    </div>

                    {event.link && (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          window.open(event.link, '_blank');
                        }}
                      >
                        자세히 보기
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
