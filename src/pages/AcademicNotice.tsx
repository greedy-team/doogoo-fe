import { Card } from '@/components//ui/card';
import { NextButton, BackButton } from '@/components/layout/RouteButton';
import YearTypeSelection from '../features/academicNotice/components/YearTypeSelection';
import SelectedEventTypeHeader from '@/components/layout/SelectedEventTypeHeader';
import YearSelectionLayout from '@/features/academicNotice/components/YearSelectionLayout';

interface AcademicNoticeSelectorProps {
  selectedYear: number;
  yearFilterType: 'my-year' | 'all';
  onYearChange: (year: number) => void;
  onYearFilterTypeChange: (type: 'my-year' | 'all') => void;
}

export default function AcademicNotice({
  selectedYear,
  yearFilterType,
  onYearChange,
  onYearFilterTypeChange,
}: AcademicNoticeSelectorProps) {
  return (
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

        <NextButton onClick={() => {}} disabled={false} />
        <BackButton onClick={() => {}} disabled={false} />
      </div>
    </Card>
  );
}
