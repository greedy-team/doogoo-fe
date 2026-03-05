import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { getCategoryIcon } from '@/features/dooDreamNotice/constants/categoryIcons';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
import { Check, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CategoriesProps {
  selectedInterests: Set<string>;
  onInterestToggle: (id: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

export default function Categories({
  selectedInterests,
  onInterestToggle,
  onCategoryClick,
}: CategoriesProps) {
  const navigate = useNavigate();
  const { data: keywords = [], isLoading } = useGetKeywords();

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick(categoryId);
    navigate(`/dooDreamNotice/${categoryId}`);
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
      <Label className="text-foreground text-sm font-medium">
        관심 카테고리 선택(공통)
      </Label>
      <div className="space-y-2">
        {keywords.map((keyword) => {
          const Icon = getCategoryIcon(keyword.id);
          const isSelected = selectedInterests.has(keyword.id);

          return (
            <Card
              key={keyword.id}
              className={`p-4 transition-all duration-200 ${isSelected ? 'border-purple-300 bg-purple-50 shadow-sm' : 'hover:bg-accent/50'} `}
            >
              <div className="flex items-center gap-3">
                {/* Icon and text */}
                <div
                  className={`shrink-0 rounded-xl p-2 transition-colors ${isSelected ? 'bg-purple-600 text-white' : 'bg-accent text-foreground'} `}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium">{keyword.name}</h3>
                  <p className="text-muted-foreground line-clamp-1 hidden text-sm md:block">
                    {keyword.description}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCategoryClick(keyword.id)}
                    className="h-9 px-3"
                    aria-label={`${keyword.name} 예시 행사 보기`}
                  >
                    <Eye className="mr-1.5 h-4 w-4" />
                    <span className="hidden sm:inline">예시</span>
                  </Button>
                  <Button
                    variant={isSelected ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onInterestToggle(keyword.id)}
                    className={`h-9 min-w-[80px] px-3 ${isSelected ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                    aria-label={`${keyword.name} 카테고리 ${isSelected ? '구독 취소' : '구독'}`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="mr-1.5 h-4 w-4" />
                        <span>구독중</span>
                      </>
                    ) : (
                      <>
                        <Plus className="mr-1.5 h-4 w-4" />
                        <span>구독</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
