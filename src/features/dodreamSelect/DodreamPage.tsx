import { Card } from '@/shared/ui/card';
import { MajorSelection } from './components/Selection';
import Categories from './components/Categories';
import SelectedEventTypeHeader from '@/features/step-indicator/SelectedEventTypeHeader';
import { NextButton, BackButton } from '@/features/step-indicator/RouteButton';

interface DoodreamSelectorProps {
  selectedMajor: string;
  selectedInterests: Set<string>;
  onMajorChange: (major: string) => void;
  onInterestToggle: (id: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

export default function DodreamPage({
  selectedMajor,
  selectedInterests,
  onMajorChange,
  onInterestToggle,
  onCategoryClick,
}: DoodreamSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
}
