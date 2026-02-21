import { Calendar, Grid3x3, GraduationCap, List, Sparkles } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import type { PreviewEvent } from './CalendarPreview';

interface ResultHeaderProps {
  previewEvents: PreviewEvent[];
  viewMode: 'list' | 'month';
  onViewModeChange: (mode: 'list' | 'month') => void;
}

export default function ResultHeader({
  previewEvents,
  viewMode,
  onViewModeChange,
}: ResultHeaderProps) {
  const doodreamCount = previewEvents.filter(
    (e) => e.serviceType === 'doodream',
  ).length;
  const academicCount = previewEvents.filter(
    (e) => e.serviceType === 'academic',
  ).length;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-2">
            <Calendar className="text-primary h-5 w-5" />
          </div>
          <div>
            <h2 className="text-foreground text-xl font-semibold">미리보기</h2>
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
          onValueChange={(value) => onViewModeChange(value as 'list' | 'month')}
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
    </>
  );
}
