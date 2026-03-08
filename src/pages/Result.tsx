import {
  BackButton,
  SubscribeButton,
} from '@/shared/components/RouteButton';
import CalendarPreview from '@/features/result/components/CalendarPreview';
import {
  AcademicNoticeSummaryCard,
  DooDreamSummaryCard,
} from '@/features/result/components/SelectedServiceSummaryCard';
import { SubscriptionModal } from '@/features/result/components/subscriptionModal/subscriptionModal';
import { useServiceStore } from '@/shared/stores/useServiceStore';
import { useAcademicStore } from '@/shared/stores/useAcademicStore';
import { useDodreamStore } from '@/shared/stores/useDodreamStore';
import { useUIStore } from '@/shared/stores/useUIStore';

interface ResultProps {
  onBack: () => void;
}

export default function ResultPage({ onBack }: ResultProps) {
  const { selectedServices } = useServiceStore();
  const { selectedGradeYear, gradeFilterScope } = useAcademicStore();
  const { selectedDepartmentId, selectedInterestKeywordIds } = useDodreamStore();
  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal,
  } = useUIStore();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* configuration summary */}
        <div className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">선택한 구독</h3>

          {/* 학사공지 요약 카드 */}
          {selectedServices.has('academic') && (
            <AcademicNoticeSummaryCard
              selectedYear={selectedGradeYear}
              yearFilterType={gradeFilterScope}
            />
          )}

          {/* 두드림 요약 카드 */}
          {selectedServices.has('doodream') && (
            <DooDreamSummaryCard
              selectedMajor={selectedDepartmentId}
              selectedInterests={selectedInterestKeywordIds}
            />
          )}
        </div>

        <CalendarPreview
          selectedYear={selectedGradeYear}
          yearFilterType={gradeFilterScope}
          selectedMajor={selectedDepartmentId}
          selectedInterests={selectedInterestKeywordIds}
          selectedServices={selectedServices}
        />
      </div>

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={closeSubscriptionModal}
        selectedYear={selectedGradeYear}
        selectedMajor={selectedDepartmentId}
        selectedInterests={selectedInterestKeywordIds}
        selectedServices={selectedServices}
      />

      <SubscribeButton onClick={openSubscriptionModal} />
      <BackButton onClick={onBack} disabled={false} />
    </div>
  );
}
