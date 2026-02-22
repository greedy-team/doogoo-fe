import { Label } from '@/components/ui/label';
import YearButton from './YearButton';
import { useGetGrades } from '@/shared/hooks/useCommonData';

export default function YearSelectionLayout({
  selectedYear,
  onYearChange,
}: {
  selectedYear: number;
  onYearChange: (year: number) => void;
}) {
  const { data: grades = [] } = useGetGrades();

  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">학년 선택</Label>
      <div className="grid grid-cols-4 gap-2">
        {grades.map((grade) => (
          <YearButton
            key={grade.id}
            grade={grade}
            isSelected={selectedYear === parseInt(grade.id)}
            onClick={() => onYearChange(parseInt(grade.id))}
          />
        ))}
      </div>
    </div>
  );
}
