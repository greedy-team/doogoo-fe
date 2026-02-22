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
import { useGetDepartments } from '@/shared/hooks/useCommonData';
import { groupDepartmentsByField } from '@/shared/utils/departmentUtils';

interface MajorSelectionProps {
  selectedMajor: string;
  onMajorChange: (major: string) => void;
}

export function MajorSelection({
  selectedMajor,
  onMajorChange,
}: MajorSelectionProps) {
  const { data: departments = [], isLoading } = useGetDepartments();

  // 계열별 → 학부별로 그룹핑
  const groupedByField = groupDepartmentsByField(departments);
  const fields = Object.values(groupedByField);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Label className="text-foreground text-sm font-medium">전공 선택</Label>
        <Select disabled>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="로딩 중..." />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">전공 선택</Label>
      <Select value={selectedMajor} onValueChange={onMajorChange}>
        <SelectTrigger className="h-12 w-full">
          <SelectValue placeholder="전공을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {/* 전체 옵션 */}
          <SelectItem value="all">전체</SelectItem>
          <SelectSeparator />

          {/* 각 계열 → 학부 → 학과 */}
          {fields.map((field, fieldIndex) => (
            <div key={field.fieldId}>
              {fieldIndex > 0 && <SelectSeparator />}

              {/* 계열 레이블 */}
              <SelectGroup>
                <SelectLabel className="text-foreground bg-primary/10 -mx-1 mt-1 mb-1 px-3 py-2.5 text-sm font-extrabold">
                  {field.fieldName}
                </SelectLabel>

                {/* 계열 전체 선택 옵션 */}
                <SelectItem value={field.fieldId} className="font-bold">
                   {field.fieldName} 전체
                </SelectItem>

                {/* 학부들 */}
                {Object.values(field.colleges).map((college) => (
                  <div key={college.collegeId} className="ml-2">
                    {/* 학부 레이블 */}
                    <SelectLabel className="text-muted-foreground mt-2 px-2 text-xs">
                      [{college.collegeName}]
                    </SelectLabel>

                    {/* 학부 전체 선택 옵션 */}
                    <SelectItem value={college.collegeId} className="font-medium pl-4">
                       {college.collegeName} 전체
                    </SelectItem>

                    {/* 학과들 */}
                    {college.departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id} className="pl-6">
                        {dept.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
