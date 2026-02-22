import { Card } from '@/shared/ui/card';
import { NextButton, BackButton } from '@/features/step-indicator/RouteButton';
import YearTypeSelection from './components/YearTypeSelection';
import SelectedEventTypeHeader from '@/features/step-indicator/SelectedEventTypeHeader';
import YearSelectionLayout from './components/YearSelectionLayout';

interface AcademicNoticeSelectorProps {
  selectedYear: number;
  yearFilterType: 'my-year' | 'all';
  onYearChange: (year: number) => void;
  onYearFilterTypeChange: (type: 'my-year' | 'all') => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AcademicPage({
  selectedYear,
  yearFilterType,
  onYearChange,
  onYearFilterTypeChange,
  onNext,
  onBack,
}: AcademicNoticeSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-sm">
        {/* Header */}
        <SelectedEventTypeHeader
          type="academic"
          title="학사공지"
          description="학사 일정 및 공지사항"
        />

        <div className="space-y-4 px-6 pb-6">
          {/* Filter Type Selection - 먼저 수신 범위 선택 */}
          <YearTypeSelection
            yearFilterType={yearFilterType}
            onYearFilterTypeChange={onYearFilterTypeChange}
          />

          {/* Year Selection - "내 학년만" 선택 시 학년 선택 */}
          {yearFilterType === 'my-year' && (
            <YearSelectionLayout
              selectedYear={selectedYear}
              onYearChange={onYearChange}
            />
          )}
        </div>
      </Card>
      <NextButton onClick={onNext} disabled={false} />
      <BackButton onClick={onBack} disabled={false} />
    </div>
  );
}
