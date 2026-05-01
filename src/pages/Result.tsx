import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Calendar, Download, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionModal } from '@/features/subscription/components/subscriptionModal/subscriptionModal';
import { useServiceStore } from '@/shared/stores/useServiceStore';
import { useAcademicStore } from '@/shared/stores/useAcademicStore';
import { useDodreamStore } from '@/shared/stores/useDodreamStore';
import { useUIStore } from '@/shared/stores/useUIStore';
import { useGetColleges, useGetKeywords } from '@/shared/hooks/useCommonData';
import {
  useGetAcademicNotices,
  useGetDodreamNotices,
  useGetFilteredAcademicNotices,
  useGetFilteredDodreamNotices,
} from '@/shared/hooks/useNotices';
import {
  filterAcademicNotices,
  filterDodreamNotices,
} from '@/shared/utils/noticeFilters';

interface ResultProps {
  onBack: () => void;
}

export default function ResultPage({ onBack }: ResultProps) {
  const navigate = useNavigate();
  const { selectedServices } = useServiceStore();
  const { selectedGradeIds } = useAcademicStore();
  const { selectedDepartmentId, selectedInterestKeywordIds } =
    useDodreamStore();
  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal,
  } = useUIStore();
  const { data: colleges = [] } = useGetColleges();
  const { data: rawKeywords = [] } = useGetKeywords();
  const keywords = rawKeywords.filter((k) => k.id !== 'k_7');

  const isAcademicSelected = selectedServices.has('academic');
  const isDodreamSelected =
    selectedServices.has('doodream') && selectedInterestKeywordIds.size > 0;

  const dodreamFilterBody = useMemo(
    () => ({
      selectedDepartmentId:
        !selectedDepartmentId || selectedDepartmentId === 'all'
          ? 'all'
          : selectedDepartmentId,
      selectedKeywordId: Array.from(selectedInterestKeywordIds),
    }),
    [selectedDepartmentId, selectedInterestKeywordIds],
  );

  const { data: allAcademicNotices = [], isLoading: isAllAcademicLoading } = useGetAcademicNotices();
  const { data: allDodreamNotices = [], isLoading: isAllDodreamLoading } = useGetDodreamNotices();
  const {
    data: serverAcademicNotices,
    isLoading: isAcademicLoading,
  } = useGetFilteredAcademicNotices(selectedGradeIds, isAcademicSelected);
  const {
    data: serverDodreamNotices,
    isLoading: isDodreamLoading,
  } = useGetFilteredDodreamNotices(dodreamFilterBody, isDodreamSelected);

  const isVerifying =
    (isAcademicSelected && (isAcademicLoading || isAllAcademicLoading)) ||
    (isDodreamSelected && (isDodreamLoading || isAllDodreamLoading));

  const hasMismatch = useMemo(() => {
    if (isVerifying) return false;

    const hasDiff = (a: Set<string>, b: Set<string>) =>
      [...b].some((id) => !a.has(id)) || [...a].some((id) => !b.has(id));

    if (isAcademicSelected && serverAcademicNotices) {
      const clientIds = new Set(
        filterAcademicNotices(allAcademicNotices, selectedGradeIds).map((n) => n.noticeId),
      );
      const serverIds = new Set(serverAcademicNotices.map((n) => n.noticeId));
      if (hasDiff(clientIds, serverIds)) return true;
    }

    if (isDodreamSelected && serverDodreamNotices) {
      const clientIds = new Set(
        filterDodreamNotices(allDodreamNotices, selectedDepartmentId, selectedInterestKeywordIds).map((n) => n.noticeId),
      );
      const serverIds = new Set(serverDodreamNotices.map((n) => n.noticeId));
      if (hasDiff(clientIds, serverIds)) return true;
    }

    return false;
  }, [
    isVerifying,
    isAcademicSelected,
    isDodreamSelected,
    serverAcademicNotices,
    serverDodreamNotices,
    allAcademicNotices,
    allDodreamNotices,
    selectedGradeIds,
    selectedDepartmentId,
    selectedInterestKeywordIds,
  ]);

  useEffect(() => {
    if (!isVerifying && hasMismatch) {
      toast.error(
        '예상하지 못한 ICS가 추가되었습니다. sejong.doogoo@gmail.com으로 연락주세요.',
      );
    }
  }, [isVerifying, hasMismatch]);

  const selectedDepartmentName = selectedDepartmentId
    ? colleges
        .flatMap((college) => college.departments)
        .find((department) => department.id === selectedDepartmentId)?.name
    : null;

  const selectedInterestLabels = Array.from(selectedInterestKeywordIds)
    .map((id) => keywords.find((keyword) => keyword.id === id)?.name || id)
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={closeSubscriptionModal}
        selectedGradeIds={selectedGradeIds}
        selectedMajor={selectedDepartmentId}
        selectedInterests={selectedInterestKeywordIds}
        selectedServices={selectedServices}
      />

      <Card className="p-8 text-center">
        <div className="mb-4 flex justify-center">
          {hasMismatch ? (
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          ) : (
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
          )}
        </div>
        {isVerifying ? (
          <p className="text-muted-foreground text-sm">구독 내용을 확인하는 중입니다...</p>
        ) : hasMismatch ? (
          <p className="text-muted-foreground text-sm">
            예상하지 못한 ICS가 추가되었습니다. sejong.doogoo@gmail.com으로 연락주세요.
          </p>
        ) : (
          <>
            <h2 className="text-foreground mb-2 text-2xl font-bold">
              구독이 완료되었습니다!
            </h2>
            <p className="text-muted-foreground">
              선택하신 캘린더가 성공적으로 추가되었습니다.
            </p>
          </>
        )}
        <Button
          type="button"
          variant="link"
          onClick={openSubscriptionModal}
          className="text-muted-foreground mt-2 h-auto p-0 text-xs"
        >
          캘린더 추가가 잘 안 되셨나요? 여기에서 다시 선택해보세요.
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-foreground mb-4 text-lg font-semibold">
          구독한 내용
        </h3>

        <div className="space-y-4">
          {selectedServices.has('academic') && (
            <div className="border-primary/20 bg-primary/5 rounded-xl border p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Calendar className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-1 font-semibold">
                    학사공지
                  </h4>
                  <div className="text-muted-foreground space-y-1 text-sm">
                    <p>
                      •{' '}
                      {selectedGradeIds.length > 0
                        ? selectedGradeIds.join(', ')
                        : '선택 없음'}
                      학년
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedServices.has('doodream') && (
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-1 font-semibold">두드림</h4>
                  <div className="text-muted-foreground space-y-1 text-sm">
                    <p>• {selectedDepartmentName || '선택된 학과 없음'}</p>
                    {selectedInterestLabels.length > 0 && (
                      <p>• {selectedInterestLabels.join(', ')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="bg-accent/30 p-6">
        <h3 className="text-foreground mb-3 text-lg font-semibold">
          다음 단계
        </h3>
        <div className="text-muted-foreground space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 mt-0.5 rounded p-1">
              <Calendar className="text-primary h-4 w-4" />
            </div>
            <div>
              <p className="text-foreground font-medium">
                캘린더 앱을 확인하세요
              </p>
              <p>
                Apple 캘린더, Google 캘린더, 또는 Outlook에서 구독한 일정을
                확인할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 mt-0.5 rounded p-1">
              <Download className="text-primary h-4 w-4" />
            </div>
            <div>
              <p className="text-foreground font-medium">자동 업데이트</p>
              <p>새로운 행사가 추가되면 캘린더가 자동으로 업데이트됩니다.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        <Button
          size="lg"
          className="h-12 w-full font-semibold"
          onClick={() => navigate('/')}
        >
          처음으로 이동
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="hover:bg-accent/50 h-12 w-full border font-semibold"
          onClick={onBack}
        >
          이전
        </Button>
      </div>
    </div>
  );
}
