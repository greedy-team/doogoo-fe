import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import majorsData from '@/mock/data/majors.json';

interface MajorSelectionProps {
  selectedMajor: string;
  onMajorChange: (major: string) => void;
}

export function MajorSelection({
  selectedMajor,
  onMajorChange,
}: MajorSelectionProps) {
  const majorsByCollege = majorsData;

  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">전공 선택</Label>
      <Select value={selectedMajor} onValueChange={onMajorChange}>
        <SelectTrigger className="h-12 w-full">
          <SelectValue placeholder="전공을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {majorsByCollege.map((college, index) => (
            <div key={college.college}>
              {index > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel className="text-foreground bg-accent/30 -mx-1 mt-1 mb-1 px-3 py-2 text-sm font-bold">
                  {college.college}
                </SelectLabel>
                {college.majors.map((major) => (
                  <SelectItem key={major.value} value={major.value}>
                    {major.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
