import { Card } from '@/components/ui/card';
import Categories from '@/features/dooDreamNotice/components/Categories';
import SelectedServiceTypeHeader from '@/shared/components/SelectedServiceTypeHeader';
import { NextButton, BackButton } from '@/shared/components/RouteButton';
import { useDodreamStore } from '@/shared/stores/useDodreamStore';

interface DooDreamNoticeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DooDreamNotice({
  onNext,
  onBack,
}: DooDreamNoticeProps) {
  const {
    selectedDepartmentId,
    selectedInterestKeywordIds,
    setSelectedDepartmentId,
    toggleInterestKeyword,
  } = useDodreamStore();

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-6">
        {/* Header */}
        <SelectedServiceTypeHeader
          type="doodream"
          title="두드림 관심사"
          description="교내 대회, 학과 행사 등"
        />
        <div className="space-y-5">
          {/* Interest Categories */}
          <Categories
            selectedInterests={selectedInterestKeywordIds}
            onInterestToggle={toggleInterestKeyword}
            selectedMajor={selectedDepartmentId}
            onMajorChange={setSelectedDepartmentId}
          />
        </div>
      </Card>

      <NextButton
        onClick={onNext}
        disabled={selectedInterestKeywordIds.size === 0}
      />
      <BackButton onClick={onBack} disabled={false} />
    </div>
  );
}
