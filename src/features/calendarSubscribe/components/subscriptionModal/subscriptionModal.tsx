import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Download, ExternalLink, Apple, Chrome } from 'lucide-react';
import { toast } from 'sonner';

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
  yearFilterType,
  selectedServices,
}: SubscriptionModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate webcal URL
  const getWebcalUrl = () => {
    const params = new URLSearchParams();
    if (selectedServices.has('academic')) {
      params.append('academic', 'true');
      params.append('year', selectedYear.toString());
      if (yearFilterType) params.append('yearFilter', yearFilterType);
    }
    if (selectedServices.has('doodream')) {
      params.append('doodream', 'true');
      params.append('major', selectedMajor);
      params.append('interests', Array.from(selectedInterests).join(','));
    }
    return `webcal://sejong-sync.app/calendar?${params.toString()}`;
  };

  const handlePlatformSubscribe = (
    platform: 'apple' | 'google' | 'outlook',
  ) => {
    const webcalUrl = getWebcalUrl();
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
  };

  const handleDownload = () => {
    setIsDownloading(true);

    // Generate ICS file content
    const icsContent = generateMockICS(
      selectedYear,
      selectedMajor,
      selectedInterests,
      selectedServices,
    );
    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sejong-sync.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setIsDownloading(false);
      toast.success('캘린더 파일이 다운로드되었습니다!', {
        description: '캘린더 앱에 .ics 파일을 가져오세요.',
        duration: 4000,
      });
    }, 500);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">캘린더 구독하기</DialogTitle>
          <DialogDescription>
            사용하시는 캘린더 플랫폼을 선택하세요
          </DialogDescription>
        </DialogHeader>

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
                className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-200 ${platform.color} hover:border-primary/30 border-2 border-transparent active:scale-[0.98]`}
              >
                <div className="shrink-0">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold">{platform.name}</div>
                  <div className="text-sm opacity-70">
                    {platform.description}
                  </div>
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
            disabled={isDownloading}
          >
            <Download className="mr-2 h-5 w-5" />
            {isDownloading ? '다운로드 중...' : '.ics 파일 다운로드'}
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            다운로드한 파일을 캘린더 앱으로 가져오세요
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to generate mock ICS content
function generateMockICS(
  year: number,
  major: string,
  _interests: Set<string>,
  services: Set<'academic' | 'doodream'>,
): string {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  let calendarName = '세종대학교';
  if (services.has('academic') && services.has('doodream')) {
    calendarName += ' 학사공지 & 두드림';
  } else if (services.has('academic')) {
    calendarName += ' 학사공지';
  } else if (services.has('doodream')) {
    calendarName += ' 두드림';
  }

  let events = '';

  // Academic events
  if (services.has('academic')) {
    events += `
BEGIN:VEVENT
UID:${timestamp}-1@sejong-sync.app
DTSTAMP:${timestamp}
DTSTART:20260212T090000Z
DTEND:20260212T100000Z
SUMMARY:중간고사 기간 시작
DESCRIPTION:${year}학년 학사일정
CATEGORIES:학사
END:VEVENT

BEGIN:VEVENT
UID:${timestamp}-2@sejong-sync.app
DTSTAMP:${timestamp}
DTSTART:20260301T000000Z
DTEND:20260301T235900Z
SUMMARY:삼일절 (휴교)
DESCRIPTION:국경일 - 휴교
CATEGORIES:학사
END:VEVENT
`;
  }

  // Doodream events
  if (services.has('doodream')) {
    events += `
BEGIN:VEVENT
UID:${timestamp}-3@sejong-sync.app
DTSTAMP:${timestamp}
DTSTART:20260225T130000Z
DTEND:20260225T170000Z
SUMMARY:2026 세종 해커톤
DESCRIPTION:두드림 행사 - ${major}
CATEGORIES:두드림
END:VEVENT
`;
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sejong Sync//Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${calendarName}
X-WR-TIMEZONE:Asia/Seoul
X-WR-CALDESC:맞춤형 세종대학교 캘린더
${events}
END:VCALENDAR`;
}
