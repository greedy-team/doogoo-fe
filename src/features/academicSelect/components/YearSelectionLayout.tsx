import { Label } from '@/shared/ui/label';
import YearButton from './YearButton';

export default function YearSelectionLayout({
  selectedYear,
  onYearChange,
}: {
  selectedYear: number;
  onYearChange: (year: number) => void;
}) {
  const years = [
    { value: 1, label: '1학년' },
    { value: 2, label: '2학년' },
    { value: 3, label: '3학년' },
    { value: 4, label: '4학년' },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">학년 선택</Label>
      <div className="grid grid-cols-4 gap-2">
        {years.map((year) => (
          <YearButton
            key={year.value}
            year={year}
            isSelected={selectedYear === year.value}
            onClick={() => onYearChange(year.value)}
          />
        ))}
      </div>
    </div>
  );
}
