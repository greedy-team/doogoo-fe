import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

// Academic Notice Components
import YearTypeSelection from '@/features/academicNotice/components/YearTypeSelection';
import YearSelectionLayout from '@/features/academicNotice/components/YearSelectionLayout';
import SelectedServiceTypeHeader from '@/shared/components/SelectedServiceTypeHeader';

// DooDream Notice Components
import Categories from '@/features/dooDreamNotice/components/Categories';

// Subscription Components
import CalendarPreview from '@/features/subscription/components/calendarPreview/CalendarPreview';
import { SubscriptionModal } from '@/features/subscription/components/subscriptionModal/subscriptionModal';

// Store Hooks
import { useAcademicStore } from '@/shared/stores/useAcademicStore';
import { useDodreamStore } from '@/shared/stores/useDodreamStore';
import { useServiceStore } from '@/shared/stores/useServiceStore';
import { useUIStore } from '@/shared/stores/useUIStore';

// Navigation Button Components
import { SubscribeButton, BackButton } from '@/shared/components/RouteButton';

interface ServiceSubscriptionProps {
  onBack: () => void;
}

export default function ServiceSubscription({
  onBack,
}: ServiceSubscriptionProps) {
  // Stores
  const {
    selectedGradeYear,
    gradeFilterScope,
    setSelectedGradeYear,
    setGradeFilterScope,
  } = useAcademicStore();

  const {
    selectedDepartmentId,
    selectedInterestKeywordIds,
    setSelectedDepartmentId,
    toggleInterestKeyword,
  } = useDodreamStore();

  const { selectedServices } = useServiceStore();

  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal,
  } = useUIStore();

  const isAcademicSelected = selectedServices.has('academic');
  const isDoDreamSelected = selectedServices.has('doodream');
  const hasSelectedDoDreamInterest = selectedInterestKeywordIds.size > 0;
  const isSubscribeDisabled = isDoDreamSelected && !hasSelectedDoDreamInterest;

  // Collapsible state for both mobile and desktop
  const [isAcademicExpanded, setIsAcademicExpanded] = useState(true);
  const [isDoDreamExpanded, setIsDoDreamExpanded] = useState(true);

  console.log('Selected Interests:', selectedInterestKeywordIds);

  return (
    <div className="mx-auto max-w-7xl">
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={closeSubscriptionModal}
        selectedYear={selectedGradeYear}
        yearFilterType={gradeFilterScope}
        selectedMajor={selectedDepartmentId}
        selectedInterests={selectedInterestKeywordIds}
        selectedServices={selectedServices}
      />

      {/* Unified Layout: Responsive grid */}
      <div className="gap-6 lg:grid lg:grid-cols-3">
        {/* Left Column: Academic & DooDream Notices (Collapsible on all devices) */}
        <div className="col-span-2 space-y-6">
          {/* Academic Notice Card - Collapsible */}
          {isAcademicSelected && (
            <Collapsible
              open={isAcademicExpanded}
              onOpenChange={setIsAcademicExpanded}
            >
              <Card className="gap-0 overflow-hidden p-0">
                <CollapsibleTrigger className="flex w-full items-center justify-between bg-white p-4 hover:bg-gray-50">
                  <div className="text-left">
                    <SelectedServiceTypeHeader
                      type="academic"
                      title="학사일정"
                      description="수강 신청, 시험기간 등"
                    />
                  </div>
                  <ChevronDown
                    className={`ml-4 h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isAcademicExpanded ? 'rotate-0' : '-rotate-90'
                    }`}
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="p-4">
                    <div className="space-y-5">
                      {gradeFilterScope === 'my-year' && (
                        <YearSelectionLayout
                          selectedYear={selectedGradeYear}
                          onYearChange={setSelectedGradeYear}
                        />
                      )}
                      <YearTypeSelection
                        yearFilterType={gradeFilterScope}
                        onYearFilterTypeChange={setGradeFilterScope}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {/* DooDream Notice Card - Collapsible */}
          {isDoDreamSelected && (
            <Collapsible
              open={isDoDreamExpanded}
              onOpenChange={setIsDoDreamExpanded}
            >
              <Card className="gap-0 overflow-hidden p-0">
                <CollapsibleTrigger className="flex w-full items-center justify-between bg-white p-4 hover:bg-gray-50">
                  <div className="text-left">
                    <SelectedServiceTypeHeader
                      type="doodream"
                      title="두드림 관심사"
                      description="교내 대회, 학과 행사 등"
                    />
                  </div>
                  <ChevronDown
                    className={`ml-4 h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isDoDreamExpanded ? 'rotate-0' : '-rotate-90'
                    }`}
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="p-4">
                    <div className="space-y-5">
                      <Categories
                        selectedInterests={selectedInterestKeywordIds}
                        onInterestToggle={toggleInterestKeyword}
                        selectedMajor={selectedDepartmentId}
                        onMajorChange={setSelectedDepartmentId}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}
        </div>

        {/* Right Column: Result Preview (Sticky on desktop, stacked on mobile) */}
        <div className="col-span-1 mt-6 lg:mt-0">
          <div className="lg:sticky lg:top-20">
            <CalendarPreview
              selectedYear={selectedGradeYear}
              yearFilterType={gradeFilterScope}
              selectedMajor={selectedDepartmentId}
              selectedInterests={selectedInterestKeywordIds}
              selectedServices={selectedServices}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Always at bottom */}
      <div className="space-y-3 py-6">
        <SubscribeButton
          onClick={openSubscriptionModal}
          disabled={isSubscribeDisabled}
        />
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
}
