import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';

interface CategoryEvent {
  title: string;
  description: string;
  date: string;
  location: string;
  attendees?: string;
}

interface CategoryDetailProps {
  categoryId: string;
  categoryLabel: string;
  categoryIcon: React.ElementType;
  onBack: () => void;
}

// Mock event data for each category
const categoryEvents: Record<string, CategoryEvent[]> = {
  competition: [
    {
      title: '2026 세종 창의 아이디어 경진대회',
      description: '학생들의 창의적인 아이디어를 발굴하고 지원하는 대회',
      date: '2026년 3월 15일',
      location: '광개토관 컨벤션홀',
      attendees: '전체 학년',
    },
    {
      title: 'AI 해커톤 2026',
      description: '인공지능 기술을 활용한 문제 해결 경진대회',
      date: '2026년 4월 20일',
      location: '군자관 AI 랩',
      attendees: 'AI융합대학생',
    },
    {
      title: '전국 대학생 논문 공모전',
      description: '학술적 연구 성과를 공유하는 논문 대회',
      date: '2026년 5월 10일',
      location: '온라인 제출',
      attendees: '전체 학년',
    },
    {
      title: '창업 아이템 경진대회',
      description: '혁신적인 창업 아이디어 발표 및 투자 유치 기회',
      date: '2026년 6월 5일',
      location: '대양홀',
      attendees: '전체 학부생',
    },
  ],
  career: [
    {
      title: '글로벌 기업 채용 박람회',
      description: '국내외 주요 기업들과의 채용 상담 및 네트워킹',
      date: '2026년 3월 25일',
      location: '대양홀',
      attendees: '3-4학년',
    },
    {
      title: '스타트업 커리어 데이',
      description: '스타트업 취업을 위한 정보 세션 및 면접 기회',
      date: '2026년 4월 12일',
      location: '광개토관',
      attendees: '전체 학년',
    },
    {
      title: '이력서 작성 및 면접 특강',
      description: '전문가가 알려주는 취업 준비 노하우',
      date: '2026년 5월 3일',
      location: '진로개발센터',
      attendees: '전체 학년',
    },
    {
      title: '창업 멘토링 프로그램',
      description: '성공한 창업가와의 1:1 멘토링 기회',
      date: '2026년 6월 15일',
      location: '창업지원센터',
      attendees: '창업 관심자',
    },
  ],
  volunteer: [
    {
      title: '지역사회 봉사의 날',
      description: '광진구 지역 사회를 위한 봉사활동',
      date: '2026년 3월 30일',
      location: '광진구 일대',
      attendees: '전체 학년',
    },
    {
      title: '해외 봉사단 모집',
      description: '개발도상국 교육 봉사 프로그램',
      date: '2026년 4월 25일',
      location: '베트남, 캄보디아',
      attendees: '전체 학년',
    },
    {
      title: '환경 보호 캠페인',
      description: '캠퍼스 및 지역 환경 정화 활동',
      date: '2026년 5월 20일',
      location: '세종대 캠퍼스',
      attendees: '전체 학년',
    },
  ],
  counseling: [
    {
      title: '학업 스트레스 관리 워크숍',
      description: '효과적인 스트레스 관리 기법 배우기',
      date: '2026년 3월 18일',
      location: '학생상담센터',
      attendees: '전체 학년',
    },
    {
      title: '진로 탐색 집단상담',
      description: '나의 진로를 찾아가는 그룹 상담 프로그램',
      date: '2026년 4월 8일',
      location: '학생상담센터',
      attendees: '1-2학년',
    },
    {
      title: '대인관계 향상 프로그램',
      description: '건강한 대인관계를 위한 심리 교육',
      date: '2026년 5월 15일',
      location: '학생상담센터',
      attendees: '전체 학년',
    },
  ],
  global: [
    {
      title: '2026-2학기 교환학생 설명회',
      description: '해외 자매대학 교환학생 프로그램 안내',
      date: '2026년 3월 20일',
      location: '국제교류센터',
      attendees: '전체 학년',
    },
    {
      title: '글로벌 서머스쿨 모집',
      description: '미국, 유럽 대학의 여름 단기 과정',
      date: '2026년 4월 5일',
      location: '온라인/오프라인',
      attendees: '2-4학년',
    },
    {
      title: '국제 학생 문화 축제',
      description: '다양한 국가의 문화를 체험하는 글로벌 축제',
      date: '2026년 5월 25일',
      location: '대양홀 광장',
      attendees: '전체',
    },
    {
      title: '해외 인턴십 프로그램',
      description: '글로벌 기업 인턴십 기회',
      date: '2026년 6월 10일',
      location: '국제교류센터',
      attendees: '3-4학년',
    },
  ],
  campus: [
    {
      title: '2026 세종 대동제',
      description: '대학 축제 - 공연, 부스, 이벤트',
      date: '2026년 5월 14-16일',
      location: '세종대 캠퍼스 전역',
      attendees: '전체',
    },
    {
      title: '신입생 환영회',
      description: '새내기를 환영하는 오리엔테이션 행사',
      date: '2026년 3월 5일',
      location: '대양홀',
      attendees: '1학년',
    },
    {
      title: '동아리 박람회',
      description: '200+ 동아리 소개 및 가입 안내',
      date: '2026년 3월 12일',
      location: '군자관 앞 광장',
      attendees: '전체 학년',
    },
    {
      title: '세종 체육대회',
      description: '단과대 대항 체육 경기',
      date: '2026년 4월 22일',
      location: '세종 체육관',
      attendees: '전체 학년',
    },
  ],
};

export default function DooDreamCategoryDetail({
  categoryId,
  categoryLabel,
  categoryIcon: Icon,
  onBack,
}: CategoryDetailProps) {
  const events = categoryEvents[categoryId] || [];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-background sticky top-0 z-10 border-b">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-10 w-10 p-0"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">뒤로 가기</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-purple-100 p-2">
                <Icon className="h-5 w-5 text-purple-600" />
              </div>
              <h1 className="text-xl font-semibold">{categoryLabel}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4">
          <h2 className="text-foreground mb-1 text-lg font-semibold">
            이 카테고리에 포함되는 행사
          </h2>
          <p className="text-muted-foreground text-sm">
            최근 두드림에 등록된 {categoryLabel} 관련 행사 예시입니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {events.map((event, index) => (
            <Card key={index} className="p-4 transition-shadow hover:shadow-md">
              <h3 className="mb-2 text-base font-semibold">{event.title}</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                {event.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-foreground">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <span className="text-foreground">{event.location}</span>
                </div>
                {event.attendees && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">{event.attendees}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-20" />
      </div>
    </div>
  );
}
