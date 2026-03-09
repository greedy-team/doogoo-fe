import { Card } from '@/components/ui/card';
import { MajorSelection } from '@/features/dooDreamNotice/components/Selection';
import Categories from '@/features/dooDreamNotice/components/Categories';
import SelectedServiceTypeHeader from '@/shared/components/SelectedServiceTypeHeader';
import {
  NextButton,
  BackButton,
} from '@/shared/components/RouteButton';
import { useDodreamStore } from '@/shared/stores/useDodreamStore';

interface DooDreamNoticeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DooDreamNotice({ onNext, onBack }: DooDreamNoticeProps) {
  const {
    selectedDepartmentId,
    selectedInterestKeywordIds,
    setSelectedDepartmentId,
    toggleInterestKeyword,
  } = useDodreamStore();

  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-sm">
        {/* Header */}
        <SelectedServiceTypeHeader
          type="doodream"
          title="두드림 관심사"
          description="교내 활동 및 프로그램"
        />
        <div className="space-y-5 px-6 pb-6">
          {/* Major Selection */}
          <MajorSelection
            selectedMajor={selectedDepartmentId}
            onMajorChange={setSelectedDepartmentId}
          />

          {/* Interest Categories */}
          <Categories
            selectedInterests={selectedInterestKeywordIds}
            onInterestToggle={toggleInterestKeyword}
          />
        </div>
      </Card>

      <NextButton onClick={onNext} disabled={selectedInterestKeywordIds.size === 0} />
      <BackButton onClick={onBack} disabled={false} />
    </div>
  );
}
