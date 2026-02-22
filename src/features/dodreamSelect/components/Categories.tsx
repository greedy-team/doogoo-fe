import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

import { getCategoryIcon } from '@/features/dodreamSelect/constants/categoryIcons';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
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
    navigate(`/dodreamSelect/${categoryId}`);
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
        관심 카테고리 선택
      </Label>
      <div className="space-y-2">
        {keywords.map((keyword) => {
          const Icon = getCategoryIcon(keyword.id);
          const isSelected = selectedInterests.has(keyword.id);

          return (
            <Card
              key={keyword.id}
              className={`cursor-pointer p-4 transition-all duration-200 ${isSelected ? 'border-purple-300 bg-purple-50' : 'hover:bg-accent/50'}
 `}
              onClick={() => handleCategoryClick(keyword.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-3">
                  <div
                    className={`mt-0.5 rounded-xl p-2 ${isSelected ? 'bg-purple-600 text-white' : 'bg-accent text-foreground'} `}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Label
                      htmlFor={`switch-${keyword.id}`}
                      className="mb-0.5 block cursor-pointer text-base font-medium"
                    >
                      {keyword.name}
                    </Label>
                    <p className="text-muted-foreground line-clamp-1 text-sm">
                      {keyword.description}
                    </p>
                  </div>
                </div>

                <Switch
                  id={`switch-${keyword.id}`}
                  checked={isSelected}
                  onCheckedChange={() => onInterestToggle(keyword.id)}
                  className="shrink-0"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
