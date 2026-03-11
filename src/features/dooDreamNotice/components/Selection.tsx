import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetColleges } from '@/shared/hooks/useCommonData';

interface MajorSelectionProps {
  selectedMajor: string;
  onMajorChange: (major: string) => void;
}

export function MajorSelection({
  selectedMajor,
  onMajorChange,
}: MajorSelectionProps) {
  const { data: colleges = [], isLoading } = useGetColleges();

  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">전공 선택</Label>
      <Select value={selectedMajor} onValueChange={onMajorChange} disabled={isLoading}>
        <SelectTrigger className="h-12 w-full">
          <SelectValue placeholder={isLoading ? '로딩 중...' : '전공을 선택하세요'} />
        </SelectTrigger>
        <SelectContent>
          {colleges.map((college, index) => (
            <div key={college.id}>
              {index > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel className="text-foreground bg-accent/30 -mx-1 mt-1 mb-1 px-3 py-2 text-sm font-bold">
                  {college.name}
                </SelectLabel>
                {college.Department.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
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
