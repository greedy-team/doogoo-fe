import { DOO_DREAM_CATEGORIES } from '@/features/dodreamSelect/constants/dooDreamCategories';
import { useGetDepartments } from '@/shared/hooks/useCommonData';
import { getDepartmentName } from '@/shared/utils/departmentUtils';

function getSelectedDooDreamCategoryLabels(selectedInterests: Set<string>) {
  return DOO_DREAM_CATEGORIES.filter((cat) =>
    selectedInterests.has(cat.id),
  ).map((cat) => cat.label);
}

export function AcademicNoticeSummaryCard({
  selectedYear,
  yearFilterType,
}: {
  selectedYear: number;
  yearFilterType: 'my-year' | 'all';
}) {
  return (
    <div className="bg-primary/5 border-primary/20 rounded-xl border p-4">
      <h4 className="text-foreground mb-2 font-semibold">📚 학사공지</h4>
      <div className="text-muted-foreground space-y-1 text-sm">
        <p>• 학년: {selectedYear}학년</p>
        <p>
          • 범위: {yearFilterType === 'my-year' ? '내 학년만' : '전체 학년'}
        </p>
      </div>
    </div>
  );
}

export function DooDreamSummaryCard({
  selectedMajor,
  selectedInterests,
}: {
  selectedMajor: string;
  selectedInterests: Set<string>;
}) {
  const { data: departments = [] } = useGetDepartments();
  const majorName = getDepartmentName(departments, selectedMajor);

  return (
    <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
      <h4 className="text-foreground mb-2 font-semibold">✨ 두드림</h4>
      <div className="text-muted-foreground space-y-1 text-sm">
        <p>• 전공: {majorName}</p>
        {/* <p>• 부전공: {getminorlabel(selectedminor)}</p> */}
        <p>
          • 관심사:{' '}
          {getSelectedDooDreamCategoryLabels(selectedInterests).length > 0
            ? getSelectedDooDreamCategoryLabels(selectedInterests).join(', ')
            : '선택 안 함'}
        </p>
      </div>
    </div>
  );
}
