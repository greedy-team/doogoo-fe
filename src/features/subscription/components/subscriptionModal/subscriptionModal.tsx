import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Apple,
  Check,
  Chrome,
  Mail,
  Download,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useCreateAcademicIcs,
  useCreateDodreamIcs,
  getWebcalUrl,
} from '@/features/subscription/hooks/useIcsLink';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useGetGrades, useGetKeywords } from '@/shared/hooks/useCommonData';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGradeIds: string[];
  selectedMajor: string;
  selectedInterests: Set<string>;
  selectedServices: Set<'academic' | 'doodream'>;
}

export function SubscriptionModal({
  isOpen,
  onClose,
  selectedGradeIds,
  selectedMajor,
  selectedInterests,
  selectedServices,
}: SubscriptionModalProps) {
  const navigate = useNavigate();
  const [expandedPlatformId, setExpandedPlatformId] = useState<string | null>(
    null,
  );
  const [expandedDownload, setExpandedDownload] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedActions, setCompletedActions] = useState<
    Record<string, boolean>
  >({});

  const createAcademicIcs = useCreateAcademicIcs();
  const createDodreamIcs = useCreateDodreamIcs();
  const { data: keywords = [] } = useGetKeywords();
  const { data: grades = [] } = useGetGrades();

  const selectedServiceList = Array.from(selectedServices);
  const hasBothServices = selectedServiceList.length === 2;
  const allGradeIds = grades.map((grade) => grade.id);
  const isAllGradesSelected =
    allGradeIds.length > 0 &&
    allGradeIds.every((gradeId) => selectedGradeIds.includes(gradeId));

  // Reset completed actions when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCompletedActions({});
    }
  }, [isOpen]);

  const markActionCompleted = (actionKey: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [actionKey]: true,
    }));
  };

  const isPlatformFullyCompleted = (
    platform: 'apple' | 'google' | 'outlook',
    actions: Record<string, boolean>,
  ) => {
    return selectedServiceList.every(
      (serviceType) => actions[`subscribe-${platform}-${serviceType}`],
    );
  };

  const isDownloadFullyCompleted = (actions: Record<string, boolean>) => {
    return selectedServiceList.every(
      (serviceType) => actions[`download-${serviceType}`],
    );
  };

  // API 호출 헬퍼 함수들
  const callAcademicApi = async (): Promise<{
    token: string;
    downloadUrl: string;
  }> => {
    const response = await createAcademicIcs.mutateAsync({
      selectedGradeIds: isAllGradesSelected ? null : selectedGradeIds,
    });
    return response;
  };

  const callDodreamApi = async (): Promise<{
    token: string;
    downloadUrl: string;
  }> => {
    const response = await createDodreamIcs.mutateAsync({
      selectedDepartmentId:
        !selectedMajor || selectedMajor === 'all' ? null : selectedMajor, //백앤드에서  "null"은 전체로 처리,
      // 모든 키워드 선택 시 빈 배열 → 백엔드에서 "전체"로 처리(백앤드 요구사항)
      selectedKeywordId:
        selectedInterests.size === keywords.length
          ? []
          : Array.from(selectedInterests),
    });
    return response;
  };

  const callApiByService = async (serviceType: 'academic' | 'doodream') => {
    if (serviceType === 'academic') {
      return await callAcademicApi();
    } else {
      return await callDodreamApi();
    }
  };

  const buildPlatformUrl = (
    platform: 'apple' | 'google' | 'outlook',
    sourceUrl: string,
  ) => {
    if (platform === 'apple') {
      return sourceUrl;
    }
    if (platform === 'google') {
      return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(sourceUrl)}`;
    }
    return `https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(sourceUrl)}`;
  };

  const handleSplitSubscribe = async (
    platform: 'apple' | 'google' | 'outlook',
    serviceType: 'academic' | 'doodream',
  ) => {
    setIsProcessing(true);
    try {
      const response = await callApiByService(serviceType);

      // token으로 webcal URL 생성 (API_BASE_URL 기반으로 포트 포함)
      const webcalUrl = getWebcalUrl(response.token);
      const finalUrl = buildPlatformUrl(platform, webcalUrl);

      // Open in new window/tab
      window.open(finalUrl, '_blank');

      const actionKey = `subscribe-${platform}-${serviceType}`;
      const nextActions = {
        ...completedActions,
        [actionKey]: true,
      };
      markActionCompleted(actionKey);

      if (!hasBothServices || isPlatformFullyCompleted(platform, nextActions)) {
        onClose();
        navigate('/result');
      }

      toast.success(
        `${serviceType === 'academic' ? '학사일정' : '두드림'} 구독 링크를 열었습니다`,
        {
          description: '새 창에서 구독을 완료하세요.',
          duration: 4000,
        },
      );
    } catch (error) {
      console.error('ICS 링크 생성 실패:', error);
      toast.error('캘린더 링크 생성에 실패했습니다', {
        description: '잠시 후 다시 시도해주세요.',
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async (serviceType: 'academic' | 'doodream') => {
    setIsProcessing(true);
    try {
      const response = await callApiByService(serviceType);

      // 서버가 Content-Disposition: attachment 헤더를 제공하면 자동 다운로드됨
      window.open(response.downloadUrl, '_blank');

      const actionKey = `download-${serviceType}`;
      const nextActions = {
        ...completedActions,
        [actionKey]: true,
      };
      markActionCompleted(actionKey);

      if (!hasBothServices || isDownloadFullyCompleted(nextActions)) {
        onClose();
        navigate('/result');
      }

      toast.success('캘린더 파일 다운로드를 시작합니다!', {
        description: '캘린더 앱에 .ics 파일을 가져오세요.',
        duration: 4000,
      });
    } catch (error) {
      console.error('ICS 다운로드 실패:', error);
      toast.error('캘린더 파일 다운로드에 실패했습니다', {
        description: '잠시 후 다시 시도해주세요.',
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const platforms = [
    {
      id: 'apple',
      icon: Apple,
      name: 'Apple 캘린더',
      description: 'iPhone, iPad, Mac',
    },
    {
      id: 'google',
      icon: Chrome,
      name: 'Google 캘린더',
      description: 'Gmail과 동기화',
    },
    {
      id: 'outlook',
      icon: Mail,
      name: 'Outlook 캘린더',
      description: 'Microsoft 계정',
    },
  ];

  const getServiceLabel = (serviceType: 'academic' | 'doodream') =>
    serviceType === 'academic' ? '학사일정' : '두드림';

  const getServiceIcon = (serviceType: 'academic' | 'doodream') =>
    serviceType === 'academic' ? GraduationCap : Sparkles;

  const renderPlatformButtons = () => (
    <div className="flex flex-col space-y-3 py-4">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        const isExpanded = expandedPlatformId === platform.id;

        if (!hasBothServices) {
          const onlyService = selectedServiceList[0] ?? 'academic';
          const actionKey = `subscribe-${platform.id}-${onlyService}`;
          const isCompleted = completedActions[actionKey];

          return (
            <Button
              key={platform.id}
              variant="outline"
              disabled={isProcessing}
              onClick={() =>
                handleSplitSubscribe(
                  platform.id as 'apple' | 'google' | 'outlook',
                  onlyService,
                )
              }
              className={`h-auto w-full justify-between p-4 ${isCompleted ? 'opacity-65' : ''}`}
            >
              <div className="flex items-center gap-4">
                <Icon className="size-8" />
                <div className="flex flex-col items-start">
                  <div className="text-base font-semibold">{platform.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {platform.description}
                  </div>
                </div>
              </div>
              {isCompleted ? (
                <Check className="text-primary h-5 w-5" />
              ) : (
                <span className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          );
        }

        return (
          <Collapsible
            key={platform.id}
            open={isExpanded}
            onOpenChange={(isOpen) => {
              setExpandedPlatformId(isOpen ? platform.id : null);
            }}
          >
            <div className="border-border rounded-xl border p-4">
              <CollapsibleTrigger className="flex w-full flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <Icon className="size-8" />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="text-base font-semibold">
                      {platform.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {platform.description}
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="space-y-2 pt-3">
                  {selectedServiceList.map((serviceType) => {
                    const ServiceIcon = getServiceIcon(serviceType);
                    const actionKey = `subscribe-${platform.id}-${serviceType}`;
                    const isCompleted = completedActions[actionKey];

                    return (
                      <Button
                        key={`${platform.id}-${serviceType}`}
                        onClick={() =>
                          handleSplitSubscribe(
                            platform.id as 'apple' | 'google' | 'outlook',
                            serviceType,
                          )
                        }
                        variant="outline"
                        disabled={isProcessing}
                        className={`grid w-full grid-cols-[1fr_auto_1fr] items-center ${isCompleted ? 'opacity-65' : ''}`}
                      >
                        <span className="h-4 w-4" aria-hidden="true" />
                        <span className="flex items-center justify-center gap-1.5">
                          <ServiceIcon
                            className={`h-3.5 w-3.5 ${serviceType === 'doodream' ? 'text-purple' : 'text-primary'}`}
                          />
                          <span>{getServiceLabel(serviceType)} 구독하기</span>
                          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                        </span>
                        <span className="flex justify-end">
                          {isCompleted ? (
                            <Check className="text-primary h-4 w-4" />
                          ) : (
                            <span className="h-4 w-4" aria-hidden="true" />
                          )}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card text-muted-foreground px-2">또는</span>
        </div>
      </div>

      {/* Download ICS */}
      {hasBothServices ? (
        <Collapsible open={expandedDownload} onOpenChange={setExpandedDownload}>
          <div className="border-border rounded-xl border p-3">
            <CollapsibleTrigger className="flex w-full items-center justify-center px-2 py-2">
              <span className="flex items-center text-base font-medium">
                <Download className="mr-2 h-5 w-5" />
                .ics 파일 다운로드
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-2 pb-1">
                {selectedServiceList.map((serviceType) => {
                  const ServiceIcon = getServiceIcon(serviceType);
                  const actionKey = `download-${serviceType}`;
                  const isCompleted = completedActions[actionKey];

                  return (
                    <Button
                      key={`download-${serviceType}`}
                      variant="outline"
                      className={`grid w-full grid-cols-[1fr_auto_1fr] items-center ${isCompleted ? 'opacity-65' : ''}`}
                      onClick={() => handleDownload(serviceType)}
                      disabled={isProcessing}
                    >
                      <span className="h-4 w-4" aria-hidden="true" />
                      <span className="flex items-center justify-center gap-1.5">
                        <ServiceIcon
                          className={`h-3.5 w-3.5 ${serviceType === 'doodream' ? 'text-purple' : 'text-primary'}`}
                        />
                        <span>{getServiceLabel(serviceType)} 다운로드</span>
                        <Download className="h-3.5 w-3.5 opacity-60" />
                      </span>
                      <span className="flex justify-end">
                        {isCompleted ? (
                          <Check className="text-primary h-4 w-4" />
                        ) : (
                          <span className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ) : (
        <Button
          variant="outline"
          className={`h-14 w-full text-base ${completedActions[`download-${selectedServiceList[0] ?? 'academic'}`] ? 'opacity-65' : ''}`}
          onClick={() => handleDownload(selectedServiceList[0] ?? 'academic')}
          disabled={isProcessing}
        >
          <Download className="mr-2 h-5 w-5" />
          {isProcessing
            ? '처리 중...'
            : `${getServiceLabel(selectedServiceList[0] ?? 'academic')} .ics 파일 다운로드`}
          {completedActions[
            `download-${selectedServiceList[0] ?? 'academic'}`
          ] && <Check className="text-primary ml-2 h-4 w-4" />}
        </Button>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl">캘린더 구독하기</DialogTitle>
          <DialogDescription>
            사용하시는 플랫폼을 선택하고 서비스별 구독을 진행하세요
          </DialogDescription>
        </DialogHeader>

        {renderPlatformButtons()}
      </DialogContent>
    </Dialog>
  );
}
