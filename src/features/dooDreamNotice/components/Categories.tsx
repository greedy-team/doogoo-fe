import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { getCategoryIcon } from '@/features/dooDreamNotice/constants/categoryIcons';
import { useGetKeywords } from '@/shared/hooks/useCommonData';
import { useNavigate } from 'react-router-dom';
import { MajorSelection } from './Selection';

export interface CategoriesProps {
  selectedInterests: Set<string>;
  onInterestToggle: (id: string) => void;
  selectedMajor: string;
  onMajorChange: (major: string) => void;
}

export default function Categories({
  selectedInterests,
  onInterestToggle,
  selectedMajor,
  onMajorChange,
}: CategoriesProps) {
  const navigate = useNavigate();
  const { data: keywords = [], isLoading } = useGetKeywords();

  const handleCategoryClick = (categoryId: string) => {
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
        관심 카테고리 선택
      </Label>
      <div className="space-y-2">
        {keywords.map((interest) => {
          const Icon = getCategoryIcon(interest.icon);
          const isSelected = selectedInterests.has(interest.id);

          return (
            <Card
              key={interest.id}
              className={`cursor-pointer p-4 shadow-none transition-all duration-200 ${isSelected ? 'border-purple bg-purple/10' : 'hover:bg-accent/50'} `}
              onClick={() => handleCategoryClick(interest.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* Icon and text */}
                  <div
                    className={`shrink-0 rounded-xl p-2 transition-colors ${isSelected ? 'bg-purple text-white' : 'bg-accent text-foreground'} `}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium">{interest.name}</h3>
                    <p className="text-muted-foreground line-clamp-1 text-sm">
                      {interest.description}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <div className="shrink-0">
                    <Switch
                      checked={isSelected}
                      onCheckedChange={() => {
                        onInterestToggle(interest.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${interest.name} 카테고리 ${isSelected ? '구독 취소' : '구독'}`}
                      className="data-[state=checked]:bg-purple"
                    />
                  </div>
                </div>
                {isSelected && interest.id === 'k_0' && (
                  <MajorSelection
                    selectedMajor={selectedMajor}
                    onMajorChange={onMajorChange}
                  />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
