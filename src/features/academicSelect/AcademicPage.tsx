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
}

export default function AcademicPage({
  selectedYear,
  yearFilterType,
  onYearChange,
  onYearFilterTypeChange,
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
          {/* Year Selection for "My Year" filter */}
          {yearFilterType === 'my-year' && (
            <YearSelectionLayout
              selectedYear={selectedYear}
              onYearChange={onYearChange}
            />
          )}

          {/* Filter Type Selection */}
          <YearTypeSelection
            yearFilterType={yearFilterType}
            onYearFilterTypeChange={onYearFilterTypeChange}
          />
        </div>
      </Card>
      <NextButton onClick={() => {}} disabled={false} />
      <BackButton onClick={() => {}} disabled={false} />
    </div>
  );
}
