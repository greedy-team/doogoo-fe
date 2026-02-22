import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Download, ExternalLink, Apple, Chrome } from 'lucide-react';
import { toast } from 'sonner';
import {
  useCreateAcademicIcs,
  useCreateDodreamIcs,
} from '@/features/result/hooks/useIcsLink';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: number;
  selectedMajor: string;
  selectedInterests: Set<string>;
  yearFilterType?: 'my-year' | 'all';
  selectedServices: Set<'academic' | 'doodream'>;
}

export function SubscriptionModal({
  isOpen,
  onClose,
  selectedYear,
  selectedMajor,
  selectedInterests,
  selectedServices,
}: SubscriptionModalProps) {
  const [activeTab, setActiveTab] = useState<'academic' | 'doodream'>(
    'academic',
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const createAcademicIcs = useCreateAcademicIcs();
  const createDodreamIcs = useCreateDodreamIcs();

  const hasBothServices =
    selectedServices.has('academic') && selectedServices.has('doodream');

  // API 호출 헬퍼 함수들
  const callAcademicApi = async () => {
    // TODO: yearFilterType이 'all'일 때 처리 (엣지케이스 - 현재 보류)
    const response = await createAcademicIcs.mutateAsync({
      selectedDepartmentId: selectedMajor,
      selectedGradeId: selectedYear,
      alarmEnabled: false, // 미리알림 비활성화
    });
    return response;
  };

  const callDodreamApi = async () => {
    const response = await createDodreamIcs.mutateAsync({
      selectedDepartmentId: selectedMajor,
      selectedKeywordId: Array.from(selectedInterests),
      alarmEnabled: false, // 미리알림 비활성화
    });
    return response;
  };

  // 현재 활성화된 서비스에 따라 API 호출
  const callApiForActiveService = async (
    serviceType: 'academic' | 'doodream',
  ) => {
    if (serviceType === 'academic') {
      return await callAcademicApi();
    } else {
      return await callDodreamApi();
    }
  };

  const handlePlatformSubscribe = async (
    platform: 'apple' | 'google' | 'outlook',
  ) => {
    setIsProcessing(true);
    try {
      // 현재 서비스 결정 (탭이 있으면 activeTab, 없으면 단일 서비스)
      const currentService = hasBothServices
        ? activeTab
        : selectedServices.has('academic')
          ? 'academic'
          : 'doodream';

      // API 호출
      const response = await callApiForActiveService(currentService);

      // icsUrl을 webcal 프로토콜로 변환
      const webcalUrl = response.icsUrl.replace(/^https?:\/\//, 'webcal://');
      let finalUrl = webcalUrl;

      switch (platform) {
        case 'apple':
          // iOS/macOS Calendar handles webcal:// directly
          finalUrl = webcalUrl;
          break;
        case 'google':
          // Google Calendar subscription URL
          finalUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(
            webcalUrl.replace('webcal://', 'https://'),
          )}`;
          break;
        case 'outlook':
          // Outlook.com subscription URL
          finalUrl = `https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&url=${encodeURIComponent(
            webcalUrl.replace('webcal://', 'https://'),
          )}&name=${encodeURIComponent('세종대학교 캘린더')}`;
          break;
      }

      // Open in new window/tab
      window.open(finalUrl, '_blank');

      toast.success(
        `${platform === 'apple' ? 'Apple' : platform === 'google' ? 'Google' : 'Outlook'} 캘린더로 이동합니다`,
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

  const handleDownload = async () => {
    setIsProcessing(true);
    try {
      // 현재 서비스 결정-두드림/학사공지중 선택
      const currentService = hasBothServices
        ? activeTab
        : selectedServices.has('academic')
          ? 'academic'
          : 'doodream';

      // API 호출
      const response = await callApiForActiveService(currentService);

      // downloadUrl로 다운로드
      const link = document.createElement('a');
      link.href = response.downloadUrl;
      link.download = `sejong-sync-${currentService}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('캘린더 파일이 다운로드되었습니다!', {
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
      name: 'Apple 캘린더',
      description: 'iPhone, iPad, Mac',
      icon: Apple,
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    },
    {
      id: 'google',
      name: 'Google 캘린더',
      description: 'Gmail과 동기화',
      icon: Chrome,
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
    },
    {
      id: 'outlook',
      name: 'Outlook 캘린더',
      description: 'Microsoft 계정',
      icon: ExternalLink,
      color: 'bg-sky-50 hover:bg-sky-100 text-sky-600',
    },
  ];

  // 플랫폼 버튼 및 다운로드 버튼 렌더링
  const renderContent = () => (
    <div className="space-y-3 py-4">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <button
            key={platform.id}
            onClick={() =>
              handlePlatformSubscribe(
                platform.id as 'apple' | 'google' | 'outlook',
              )
            }
            disabled={isProcessing}
            className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-200 ${platform.color} hover:border-primary/30 border-2 border-transparent active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <div className="shrink-0">
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold">{platform.name}</div>
              <div className="text-sm opacity-70">{platform.description}</div>
            </div>
            <ExternalLink className="h-5 w-5 opacity-50" />
          </button>
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
        onClick={handleDownload}
        disabled={isProcessing}
      >
        <Download className="mr-2 h-5 w-5" />
        {isProcessing ? '처리 중...' : '.ics 파일 다운로드'}
      </Button>
      <p className="text-muted-foreground text-center text-xs">
        다운로드한 파일을 캘린더 앱으로 가져오세요
      </p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">캘린더 구독하기</DialogTitle>
          <DialogDescription>
            사용하시는 캘린더 플랫폼을 선택하세요
          </DialogDescription>
        </DialogHeader>

        {hasBothServices ? (
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as 'academic' | 'doodream')}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="academic">📚 학사공지</TabsTrigger>
              <TabsTrigger value="doodream">✨ 두드림</TabsTrigger>
            </TabsList>
            <TabsContent value="academic">{renderContent()}</TabsContent>
            <TabsContent value="doodream">{renderContent()}</TabsContent>
          </Tabs>
        ) : (
          renderContent()
        )}
      </DialogContent>
    </Dialog>
  );
}
