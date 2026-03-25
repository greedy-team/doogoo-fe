import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Calendar, ChevronDown } from 'lucide-react';

// Academic Notice Components
import YearSelectionLayout from '@/features/academicNotice/components/YearSelectionLayout';
import SelectedServiceTypeHeader from '@/shared/components/SelectedServiceTypeHeader';

// DooDream Notice Components
import Categories from '@/features/dooDreamNotice/components/Categories';

// Subscription Components
import CalendarPreview from '@/features/subscription/components/calendarPreview/CalendarPreview';
import MobileCalendarPreview from '@/features/subscription/components/calendarPreview/MobileCalendarPreview';
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
  const { selectedGradeIds, setSelectedGradeIds } = useAcademicStore();

  const {
    selectedDepartmentId,
    selectedInterestKeywordIds,
    setSelectedDepartmentId,
    toggleInterestKeyword,
  } = useDodreamStore();

  const { selectedServices, toggleServiceSelection } = useServiceStore();

  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal,
  } = useUIStore();

  const isAcademicSelected = selectedServices.has('academic');
  const isDoDreamSelected = selectedServices.has('doodream');
  const hasAnySelectedService = selectedServices.size > 0;
  const hasSelectedAcademicYears = selectedGradeIds.length > 0;
  const hasSelectedDoDreamInterest = selectedInterestKeywordIds.size > 0;
  const isSubscribeDisabled =
    !hasAnySelectedService ||
    (isAcademicSelected && !hasSelectedAcademicYears) ||
    (isDoDreamSelected && !hasSelectedDoDreamInterest);

  // Mobile bottom-sheet state
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [mobileUpcomingCount, setMobileUpcomingCount] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncMobileState = () => setIsMobile(mediaQuery.matches);
    syncMobileState();
    mediaQuery.addEventListener('change', syncMobileState);
    return () => mediaQuery.removeEventListener('change', syncMobileState);
  }, []);

  const sheetStyle = isMobilePreviewOpen
    ? { maxHeight: '90dvh' }
    : { height: '76px' };

  const handleServiceToggle = (service: 'academic' | 'doodream') => {
    toggleServiceSelection(service);
  };

  return (
    <div className="mx-auto max-w-7xl pb-24 lg:pb-0">
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={closeSubscriptionModal}
        selectedGradeIds={selectedGradeIds}
        selectedMajor={selectedDepartmentId}
        selectedInterests={selectedInterestKeywordIds}
        selectedServices={selectedServices}
      />

      {/* Unified Layout: Responsive grid */}
      <div className="gap-6 lg:grid lg:grid-cols-3">
        {/* Left Column: Academic & DooDream Notices */}
        <div className="col-span-2">
          <div>
            <div
              className={`flex w-full cursor-pointer items-center justify-between rounded-xl bg-white p-4 ${isAcademicSelected ? 'hover:bg-gray-50' : ''}`}
              onClick={() => handleServiceToggle('academic')}
            >
              <div className="text-left">
                <SelectedServiceTypeHeader
                  type="academic"
                  title="학사일정"
                  description="수강 신청, 시험기간 등"
                />
              </div>

              <div className="ml-4 flex items-center gap-3">
                <Switch
                  checked={isAcademicSelected}
                  onCheckedChange={() => handleServiceToggle('academic')}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div
              className={`p-4 ${
                isAcademicSelected
                  ? ''
                  : 'pointer-events-none opacity-45 grayscale'
              }`}
            >
              <YearSelectionLayout
                selectedYears={selectedGradeIds}
                onYearsChange={setSelectedGradeIds}
              />
            </div>
          </div>

          <div className="border-border my-2 border-t" />

          <div>
            <div
              className={`flex w-full cursor-pointer items-center justify-between rounded-xl bg-white p-4 ${isDoDreamSelected ? 'hover:bg-gray-50' : ''}`}
              onClick={() => handleServiceToggle('doodream')}
            >
              <div className="text-left">
                <SelectedServiceTypeHeader
                  type="doodream"
                  title="두드림"
                  description="교내 대회, 학과 행사 등"
                />
              </div>

              <div className="ml-4 flex items-center gap-3">
                <Switch
                  checked={isDoDreamSelected}
                  onCheckedChange={() => handleServiceToggle('doodream')}
                  onClick={(e) => e.stopPropagation()}
                  className="data-[state=checked]:bg-purple"
                />
              </div>
            </div>

            <div
              className={`p-4 ${
                isDoDreamSelected
                  ? ''
                  : 'pointer-events-none opacity-45 grayscale'
              }`}
            >
              <Categories
                selectedInterests={selectedInterestKeywordIds}
                onInterestToggle={toggleInterestKeyword}
                selectedMajor={selectedDepartmentId}
                onMajorChange={setSelectedDepartmentId}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Result Preview (desktop only) */}
        <div className="col-span-1 mt-6 hidden lg:mt-0 lg:block">
          <div className="lg:sticky lg:top-20">
            <CalendarPreview
              selectedGradeIds={selectedGradeIds}
              selectedMajor={selectedDepartmentId}
              selectedInterests={selectedInterestKeywordIds}
              selectedServices={selectedServices}
            />
          </div>
        </div>
      </div>

      {/* Desktop action buttons */}
      <div className="hidden space-y-3 py-6 lg:block">
        <SubscribeButton
          onClick={openSubscriptionModal}
          disabled={isSubscribeDisabled}
        />
        <BackButton onClick={onBack} text="처음으로" />
      </div>

      {/* Mobile bottom-sheet preview */}
      {isMobile && (
        <div
          className="bg-card/98 border-border fixed inset-x-0 bottom-0 z-40 overflow-hidden rounded-t-3xl border shadow-2xl transition-all duration-300 lg:hidden"
          style={sheetStyle}
        >
          <button
            type="button"
            className="w-full px-4 pt-2"
            onClick={() => setIsMobilePreviewOpen((prev) => !prev)}
          >
            <div className="mb-2 flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary h-5 w-5" />
                <span className="text-foreground text-lg font-semibold">
                  캘린더 미리보기
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isMobilePreviewOpen ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </div>
            {isMobilePreviewOpen && (
              <p className="text-muted-foreground mb-2 text-left text-xs">
                {mobileUpcomingCount}개 행사가 동기화 됩니다
              </p>
            )}
          </button>

          <div
            className="overflow-y-auto px-4 pb-6"
            style={{ maxHeight: 'calc(90dvh - 74px)' }}
          >
            {isMobilePreviewOpen && (
              <div className="space-y-3">
                <MobileCalendarPreview
                  selectedGradeIds={selectedGradeIds}
                  selectedMajor={selectedDepartmentId}
                  selectedInterests={selectedInterestKeywordIds}
                  selectedServices={selectedServices}
                  onUpcomingCountChange={setMobileUpcomingCount}
                />
                <SubscribeButton
                  onClick={openSubscriptionModal}
                  disabled={isSubscribeDisabled}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
