import { CheckCircle2 } from 'lucide-react';
import type { Grade } from '@/shared/api/types';

interface YearButtonProps {
  grade: Grade;
  isSelected: boolean;
  onClick: () => void;
}

export default function YearButton({
  grade,
  isSelected,
  onClick,
}: YearButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        isSelected
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'bg-accent text-foreground hover:bg-accent/80'
      } `}
      style={{ minHeight: '44px' }}
    >
      {grade.name}
      {isSelected && (
        <CheckCircle2 className="absolute top-1 right-1 h-4 w-4" />
      )}
    </button>
  );
}
