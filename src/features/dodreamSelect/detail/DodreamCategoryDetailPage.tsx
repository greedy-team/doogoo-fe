import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryIcon } from '@/features/dodreamSelect/constants/categoryIcons';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
import doodreamExampleEvents from '@/mock/data/doodreamExamples.json';

type DoodreamExampleEvent = {
  interestType: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees?: string;
};

export default function DodreamCategoryDetailPage() {
  const { categoryId: categoryIdParam } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { data: keywords = [], isLoading } = useGetKeywords();

  const category = keywords.find((k) => k.id === categoryIdParam);
  const Icon = getCategoryIcon(categoryIdParam || '');

  if (isLoading) {
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

  const events = (doodreamExampleEvents as DoodreamExampleEvent[]).filter(
    (event) => event.interestType === category.id,
  );

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
