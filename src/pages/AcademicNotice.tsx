import { Card } from '@/components/ui/card';
import { NextButton, BackButton } from '@/shared/components/RouteButton';
import YearTypeSelection from '@/features/academicNotice/components/YearTypeSelection';
import SelectedServiceTypeHeader from '@/shared/components/SelectedServiceTypeHeader';
import YearSelectionLayout from '@/features/academicNotice/components/YearSelectionLayout';
import { useAcademicStore } from '@/shared/stores/useAcademicStore';

interface AcademicNoticeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function AcademicNotice({
  onNext,
  onBack,
}: AcademicNoticeProps) {
  const {
    selectedGradeYear,
    gradeFilterScope,
    setSelectedGradeYear,
    setGradeFilterScope,
  } = useAcademicStore();

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-6">
        {/* Header */}
        <SelectedServiceTypeHeader
          type="academic"
          title="학사일정"
          description="수강 신청, 시험기간 등"
        />

        {/* Year Selection - "내 학년만" 선택 시 학년 선택 */}
        {gradeFilterScope === 'my-year' && (
          <YearSelectionLayout
            selectedYear={selectedGradeYear}
            onYearChange={setSelectedGradeYear}
          />
        )}
        {/* Filter Type Selection - 먼저 수신 범위 선택 */}
        <YearTypeSelection
          yearFilterType={gradeFilterScope}
          onYearFilterTypeChange={setGradeFilterScope}
        />
      </Card>
      <NextButton onClick={onNext} disabled={false} />
      <BackButton onClick={onBack} disabled={false} />
    </div>
  );
}
