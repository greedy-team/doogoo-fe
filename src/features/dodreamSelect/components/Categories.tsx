import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

import { DOO_DREAM_CATEGORIES } from '@/features/dodreamSelect/constants/dooDreamCategories';
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

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick(categoryId);
    navigate(`/dooDreamNotice/${categoryId}`);
  };
  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">
        관심 카테고리 선택
      </Label>
      <div className="space-y-2">
        {DOO_DREAM_CATEGORIES.map((interest) => {
          const Icon = interest.icon;
          const isSelected = selectedInterests.has(interest.id);

          return (
            <Card
              key={interest.id}
              className={`cursor-pointer p-4 transition-all duration-200 ${isSelected ? 'border-purple-300 bg-purple-50' : 'hover:bg-accent/50'}
 `}
              onClick={() => handleCategoryClick(interest.id)}
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
                      htmlFor={`switch-${interest.id}`}
                      className="mb-0.5 block cursor-pointer text-base font-medium"
                    >
                      {interest.label}
                    </Label>
                    <p className="text-muted-foreground line-clamp-1 text-sm">
                      {interest.description}
                    </p>
                  </div>
                </div>

                <Switch
                  id={`switch-${interest.id}`}
                  checked={isSelected}
                  onCheckedChange={() => onInterestToggle(interest.id)}
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
