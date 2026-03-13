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
import { useGetDodreamNotices } from '@/shared/hooks/useNotices';

interface MajorSelectionProps {
  selectedMajor: string;
  onMajorChange: (major: string) => void;
  targetKeywordId?: string;
}

export function MajorSelection({
  selectedMajor,
  onMajorChange,
  targetKeywordId,
}: MajorSelectionProps) {
  const { data: colleges = [], isLoading } = useGetColleges();
  const { data: notices = [] } = useGetDodreamNotices();

  const departmentEventCount = notices.reduce<Record<string, number>>(
    (acc, notice) => {
      if (!notice.departmentId) {
        return acc;
      }
      if (targetKeywordId && !notice.keywordIds.includes(targetKeywordId)) {
        return acc;
      }
      acc[notice.departmentId] = (acc[notice.departmentId] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">추가할 전공</Label>
      <Select
        value={selectedMajor}
        onValueChange={onMajorChange}
        disabled={isLoading}
      >
        <SelectTrigger className="bg-background h-12 w-full shadow-none">
          <SelectValue
            placeholder={isLoading ? '로딩 중...' : '전공을 선택하세요'}
          />
        </SelectTrigger>
        <SelectContent>
          {colleges.map((college, index) => (
            <div key={college.id}>
              {index > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel className="text-foreground bg-accent/30 -mx-1 mt-1 mb-1 px-3 py-2 text-sm font-bold">
                  {college.name}
                </SelectLabel>
                {college.departments.map((dept) => (
                  <SelectItem
                    key={dept.id}
                    value={dept.id}
                    indicatorContent={departmentEventCount[dept.id] ?? '0'}
                  >
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
