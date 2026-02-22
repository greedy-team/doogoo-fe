import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryIcon } from '@/features/dodreamSelect/constants/categoryIcons';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
import { useGetDodreamNotices } from '@/features/academicSelect/hooks/useNotices';

interface DodreamCategoryDetailPageProps {
  selectedMajor: string;
}

export default function DodreamCategoryDetailPage({
  selectedMajor,
}: DodreamCategoryDetailPageProps) {
  const { categoryId: categoryIdParam } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { data: keywords = [], isLoading: keywordsLoading } = useGetKeywords();
  const { data: allNotices = [], isLoading: noticesLoading } = useGetDodreamNotices();

  const category = keywords.find((k) => k.id === categoryIdParam);
  const Icon = getCategoryIcon(categoryIdParam || '');

  // 해당 카테고리의 공지 필터링 (키워드 && 학과)
  const notices = allNotices.filter((notice) => {
    const matchesKeyword = notice.keywordIds.includes(categoryIdParam || '');
    const matchesMajor =
      selectedMajor === 'all' ||
      notice.departmentId === selectedMajor ||
      notice.departmentId === 'all' ||
      notice.departmentId === null; // 학과 미지정 공지는 보수적으로 모든 학과에 표시
    return matchesKeyword && matchesMajor;
  });

// ISO 8601 형식을 "월 일" 형식으로 변환하는 헬퍼 함수 - api명세로 통일하기 위하여
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  if (keywordsLoading || noticesLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold">
            카테고리를 찾을 수 없습니다
          </h1>
          <Button onClick={() => navigate(-1)}>뒤로 가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-background sticky top-0 z-10 border-b">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="h-10 w-10 p-0"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">뒤로 가기</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-purple-100 p-2">
                <Icon className="h-5 w-5 text-purple-600" />
              </div>
              <h1 className="text-xl font-semibold">{category.name}</h1>
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
            최근 두드림에 등록된 {category.name} 관련 행사 예시입니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {notices.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                현재 등록된 {category.name} 행사가 없습니다.
              </p>
            </div>
          ) : (
            notices.map((notice) => (
              <Card key={notice.noticeId} className="p-4 transition-shadow hover:shadow-md">
                <h3 className="mb-2 text-base font-semibold">{notice.title}</h3>
                {notice.departmentName && (
                  <p className="text-muted-foreground mb-3 text-sm">
                    {notice.departmentName}
                  </p>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">
                      {formatDate(notice.operatingStartAt)}
                      {notice.operatingEndAt && ` - ${formatDate(notice.operatingEndAt)}`}
                    </span>
                  </div>
                  {notice.applicationStartAt && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      <span className="text-foreground">
                        신청: {formatDate(notice.applicationStartAt)}
                        {notice.applicationEndAt && ` - ${formatDate(notice.applicationEndAt)}`}
                      </span>
                    </div>
                  )}
                  {notice.detailUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => window.open(notice.detailUrl, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      자세히 보기
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-20" />
      </div>
    </div>
  );
}
