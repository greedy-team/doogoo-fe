import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import YearButton from './YearButton';
import { useGetGrades } from '@/shared/hooks/useCommonData';

export default function YearSelectionLayout({
  selectedYears,
  onYearsChange,
}: {
  selectedYears: string[];
  onYearsChange: (years: string[]) => void;
}) {
  const { data: grades = [] } = useGetGrades();
  const allGradeIds = grades.map((grade) => grade.id);
  const isAllSelected =
    allGradeIds.length > 0 &&
    allGradeIds.every((id) => selectedYears.includes(id));

  const handleYearToggle = (gradeId: string) => {
    if (selectedYears.includes(gradeId)) {
      onYearsChange(selectedYears.filter((id) => id !== gradeId));
      return;
    }

    onYearsChange([...selectedYears, gradeId]);
  };

  const handleToggleAll = () => {
    onYearsChange(isAllSelected ? [] : allGradeIds);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-foreground text-sm font-medium">학년 선택</Label>
        <label className="text-foreground flex cursor-pointer items-center gap-2 text-xs font-medium">
          <Checkbox checked={isAllSelected} onCheckedChange={handleToggleAll} />
          전체 선택
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {grades.map((grade) => (
          <YearButton
            key={grade.id}
            grade={grade}
            isSelected={selectedYears.includes(grade.id)}
            onClick={() => handleYearToggle(grade.id)}
          />
        ))}
      </div>
    </div>
  );
}
