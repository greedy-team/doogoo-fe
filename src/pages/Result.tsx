import { BackButton, SubscribeButton } from '@/components/layout/RouteButton';
import CalendarPreview from '@/features/result/components/CalendarPreview';
import {
  AcademicNoticeSummaryCard,
  DooDreamSummaryCard,
} from '@/features/result/components/SelectedServiceSummaryCard';
import { SubscriptionModal } from '@/features/result/components/subscriptionModal/subscriptionModal';

interface ResultProps {
  isSubscriptionModalOpen: boolean;
  setIsSubscriptionModalOpen: (open: boolean) => void;
  selectedServices: Set<'academic' | 'doodream'>;
  selectedYear: number;
  selectedMajor: string;
  selectedInterests: Set<string>;
  yearFilterType: 'my-year' | 'all';
  getMajorLabel: (value: string) => string;
}

export default function Result({
  isSubscriptionModalOpen,
  setIsSubscriptionModalOpen,
  selectedServices,
  selectedYear,
  selectedMajor,
  selectedInterests,
  yearFilterType,
  getMajorLabel,
}: ResultProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* configuration summary */}
        <div className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">선택한 구독</h3>

          {/* 학사공지 요약 카드 */}
          {selectedServices.has('academic') && (
            <AcademicNoticeSummaryCard
              selectedYear={selectedYear}
              yearFilterType={yearFilterType}
            />
          )}

          {/* 두드림 요약 카드 */}
          {selectedServices.has('doodream') && (
            <DooDreamSummaryCard
              selectedMajor={selectedMajor}
              selectedInterests={selectedInterests}
              getMajorLabel={getMajorLabel}
            />
          )}
        </div>

        <CalendarPreview />
      </div>

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        selectedYear={selectedYear}
        selectedMajor={selectedMajor}
        selectedInterests={selectedInterests}
        yearFilterType={yearFilterType}
        selectedServices={selectedServices}
      />

      <SubscribeButton onClick={() => setIsSubscriptionModalOpen(true)} />
      <BackButton onClick={() => {}} disabled={false} />
    </div>
  );
}
