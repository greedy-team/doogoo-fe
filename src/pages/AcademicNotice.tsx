import { Card } from '@/components/ui/card';
import {
  NextButton,
  BackButton,
} from '@/features/StepIndicator/components/RouteButton';
import YearTypeSelection from '@/features/academicNotice/components/YearTypeSelection';
import SelectedEventTypeHeader from '@/features/StepIndicator/components/SelectedEventTypeHeader';
import YearSelectionLayout from '@/features/academicNotice/components/YearSelectionLayout';
import { useAcademicStore } from '@/shared/stores/useAcademicStore';

interface AcademicNoticeProps {

  onNext: () => void;
  onBack: () => void;
}

export default function AcademicNotice({ onNext, onBack }: AcademicNoticeProps) {
  const {
    selectedGradeYear,
    gradeFilterScope,
    setSelectedGradeYear,
    setGradeFilterScope,
  } = useAcademicStore();

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
            yearFilterType={gradeFilterScope}
            onYearFilterTypeChange={setGradeFilterScope}
          />

          {/* Year Selection - "내 학년만" 선택 시 학년 선택 */}
          {gradeFilterScope === 'my-year' && (
            <YearSelectionLayout
              selectedYear={selectedGradeYear}
              onYearChange={setSelectedGradeYear}
            />
          )}
        </div>
      </Card>
      <NextButton onClick={onNext} disabled={false} />
      <BackButton onClick={onBack} disabled={false} />
    </div>
  );
}
