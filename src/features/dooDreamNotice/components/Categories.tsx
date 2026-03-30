import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Calendar,
  ClipboardList,
  ExternalLink,
  MapPin,
  Plus,
} from 'lucide-react';

import { getCategoryIcon } from '@/features/dooDreamNotice/constants/categoryIcons';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
import { useGetDodreamNotices } from '@/shared/hooks/useNotices';
import { MajorSelection } from './Selection';

export interface CategoriesProps {
  selectedInterests: Set<string>;
  onInterestToggle: (id: string) => void;
  onSetInterests: (ids: Set<string>) => void;
  selectedMajor: string;
  onMajorChange: (major: string) => void;
}

export default function Categories({
  selectedInterests,
  onInterestToggle,
  onSetInterests,
  selectedMajor,
  onMajorChange,
}: CategoriesProps) {
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    {},
  );
  const { data: rawKeywords = [], isLoading } = useGetKeywords();
  const { data: notices = [] } = useGetDodreamNotices();
  const keywords = rawKeywords.filter((k) => k.id !== 'k_7');

  const noticesByKeyword = useMemo(() => {
    return keywords.reduce<Record<string, typeof notices>>(
      (acc, keyword) => {
        const keywordNotices = notices.filter((notice) => {
          if (!notice.keywordIds.includes(keyword.id)) {
            return false;
          }

          if (keyword.id === 'k_0' && selectedMajor) {
            return notice.departmentId === selectedMajor;
          }

          return true;
        });

        acc[keyword.id] = keywordNotices.sort(
          (a, b) =>
            new Date(a.operatingStartAt).getTime() -
            new Date(b.operatingStartAt).getTime(),
        );
        return acc;
      },
      {},
    );
  }, [notices, selectedMajor, keywords]);

  const showMore = (categoryId: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] ?? 5) + 5,
    }));
  };

  const formatDate = (isoDate?: string | null) => {
    if (!isoDate) {
      return null;
    }
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Label className="text-foreground text-sm font-medium">
          관심 카테고리 선택
        </Label>
        <div className="text-muted-foreground text-sm">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-foreground text-sm font-medium">
          관심 카테고리 선택
        </Label>
        <label className="text-foreground flex cursor-pointer items-center gap-2 text-xs font-medium">
          <Checkbox
            className="data-[state=checked]:bg-purple data-[state=checked]:border-purple"
            checked={selectedInterests.size === keywords.length}
            onCheckedChange={(checked) => {
              if (checked) {
                onSetInterests(new Set(keywords.map(k => k.id)));
              } else {
                onSetInterests(new Set());
              }
            }}
          />
          전체 선택
        </label>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {keywords.map((interest) => {
          const Icon = getCategoryIcon(interest.icon);
          const isSelected = selectedInterests.has(interest.id);
          const allNotices = noticesByKeyword[interest.id] ?? [];
          const visibleCount = visibleCounts[interest.id] ?? 5;
          const visibleNotices = allNotices.slice(0, visibleCount);

          return (
            <AccordionItem
              key={interest.id}
              value={interest.id}
              className={`rounded-lg border px-4 transition-all duration-200 last:border-b ${isSelected ? 'border-purple bg-purple/10' : 'hover:bg-accent/50 data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent'}`}
            >
              <div className="flex items-center justify-between gap-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <div
                      className={`shrink-0 rounded-xl p-2 transition-colors ${isSelected ? 'bg-purple text-white' : 'bg-accent text-foreground'}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <h3 className="text-base font-medium">{interest.name}</h3>
                      <p className="text-muted-foreground line-clamp-1 text-sm">
                        {interest.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <div className="shrink-0">
                  <Switch
                    checked={isSelected}
                    onCheckedChange={() => {
                      if (interest.id === 'k_0' && isSelected) {
                        onMajorChange('');
                      }
                      onInterestToggle(interest.id);
                    }}
                    aria-label={`${interest.name} 카테고리 ${isSelected ? '구독 취소' : '구독'}`}
                    className="data-[state=checked]:bg-purple"
                  />
                </div>
              </div>

              <AccordionContent className="px-0 pt-0 pb-4">
                <div className="space-y-4 border-t pt-4">
                  {interest.id === 'k_0' && (
                    <MajorSelection
                      selectedMajor={selectedMajor}
                      onMajorChange={onMajorChange}
                      targetKeywordId={interest.id}
                    />
                  )}

                  <div className="space-y-3">
                    <h4 className="text-foreground text-sm font-semibold">
                      이 카테고리에 포함되는 행사
                    </h4>

                    {visibleNotices.length === 0 ? (
                      <div className="text-muted-foreground rounded-xl px-4 py-6 text-center text-sm">
                        등록된 행사가 없습니다.
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        {visibleNotices.map((notice) => (
                          <Card
                            key={notice.noticeId}
                            className="bg-card/70 space-y-2 p-3 shadow-none"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="text-foreground text-sm font-semibold">
                                {notice.title}
                              </h5>
                              {notice.detailUrl && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const url = notice.detailUrl?.startsWith(
                                      'http',
                                    )
                                      ? notice.detailUrl
                                      : `https://${notice.detailUrl}`;
                                    window.open(url, '_blank');
                                  }}
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>

                            {notice.descriptionSummary && (
                              <p className="text-muted-foreground line-clamp-2 text-xs">
                                {notice.descriptionSummary}
                              </p>
                            )}

                            <div className="text-muted-foreground space-y-1 text-xs">
                              {notice.departmentName && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{notice.departmentName}</span>
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>
                                  {formatDate(notice.operatingStartAt)}
                                  {notice.operatingEndAt &&
                                    ` ~ ${formatDate(notice.operatingEndAt)}`}
                                </span>
                              </div>

                              {notice.applicationStartAt && (
                                <div className="flex items-center gap-2">
                                  <ClipboardList className="h-3.5 w-3.5" />
                                  <span>
                                    {formatDate(notice.applicationStartAt)}
                                    {notice.applicationEndAt &&
                                      ` ~ ${formatDate(notice.applicationEndAt)}`}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}

                        {allNotices.length > visibleCount && (
                          <Button
                            variant="outline"
                            onClick={() => showMore(interest.id)}
                          >
                            더 보기
                            <Plus />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
