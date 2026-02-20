import { Card } from '@/components/ui/card';
import { MajorSelection } from '@/features/dooDreamNotice/components/Selection';
import Categories from '@/features/dooDreamNotice/components/Categories';
import SelectedEventTypeHeader from '@/components/layout/SelectedEventTypeHeader';
import { NextButton, BackButton } from '@/components/layout/RouteButton';

interface DoodreamSelectorProps {
  selectedMajor: string;
  // selectedMinor: string;
  selectedInterests: Set<string>;
  onMajorChange: (major: string) => void;
  // onMinorChange: (minor: string) => void;
  onInterestToggle: (id: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

export default function DooDreamNotice({
  selectedMajor,
  selectedInterests,
  onMajorChange,
  onInterestToggle,
  onCategoryClick,
}: DoodreamSelectorProps) {
  return (
    <>
      <Card className="shadow-sm">
        {/* Header */}
        <SelectedEventTypeHeader
          type="dooDream"
          title="두드림 관심사"
          description="교내 활동 및 프로그램"
        />
        <div className="space-y-5 px-6 pb-6">
          {/* Major Selection */}
          <MajorSelection
            selectedMajor={selectedMajor}
            onMajorChange={onMajorChange}
          />

          {/* Interest Categories */}
          <Categories
            selectedInterests={selectedInterests}
            onInterestToggle={onInterestToggle}
            onCategoryClick={onCategoryClick}
          />
        </div>
      </Card>
      <NextButton onClick={() => {}} disabled={false} />
      <BackButton onClick={() => {}} disabled={false} />
    </>
  );
}
