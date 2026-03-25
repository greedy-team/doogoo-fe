import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Apple, Chrome, Mail, Download, ExternalLink } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);

  const createAcademicIcs = useCreateAcademicIcs();
  const createDodreamIcs = useCreateDodreamIcs();
  const { data: keywords = [] } = useGetKeywords();
  const { data: grades = [] } = useGetGrades();

  const selectedServiceList = Array.from(selectedServices);
  const allGradeIds = grades.map((grade) => grade.id);
  const isAllGradesSelected =
    allGradeIds.length > 0 &&
    allGradeIds.every((gradeId) => selectedGradeIds.includes(gradeId));

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
    return `https://outlook.live.com/calendar/addfromweb?url=${encodeURIComponent(sourceUrl)}`;
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
      onClose();
      navigate('/result');

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
      onClose();
      navigate('/result');

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

  const renderPlatformButtons = () => (
    <div className="flex flex-col space-y-3 py-4">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        const isExpanded = expandedPlatformId === platform.id;

        return (
          <Collapsible
            key={platform.id}
            open={isExpanded}
            onOpenChange={(isOpen) => {
              setExpandedPlatformId(isOpen ? platform.id : null);
            }}
          >
            <div className="border-border space-y-3 rounded-xl border p-4">
              <CollapsibleTrigger className="flex w-full flex-row items-center justify-between gap-4">
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
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">
                    플랫폼 선택
                  </span>
                  <ExternalLink className="h-5 w-5 opacity-50" />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="space-y-2 pt-3">
                  {selectedServiceList.map((serviceType) => (
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
                      className="w-full justify-between"
                    >
                      <span>{getServiceLabel(serviceType)} 구독하기</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                    </Button>
                  ))}
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
      <Button
        variant="outline"
        className="h-14 w-full text-base"
        onClick={() => handleDownload(selectedServiceList[0] ?? 'academic')}
        disabled={isProcessing || selectedServiceList.length !== 1}
      >
        <Download className="mr-2 h-5 w-5" />
        {isProcessing
          ? '처리 중...'
          : selectedServiceList.length === 1
            ? `${getServiceLabel(selectedServiceList[0])} .ics 파일 다운로드`
            : '.ics 파일 다운로드 (서비스별 구독을 이용하세요)'}
      </Button>
      <p className="text-muted-foreground text-center text-xs">
        서비스별로 분리 구독을 지원합니다.
      </p>
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
