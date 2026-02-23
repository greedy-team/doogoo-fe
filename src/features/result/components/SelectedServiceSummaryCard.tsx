import { useGetColleges, useGetKeywords } from '@/shared/hooks/useCommonData';
import type { CollegeResponse } from '@/shared/api/types';

function getSelectedDooDreamCategoryLabels(
  selectedInterests: Set<string>,
  keywords: { id: string; name: string }[]
) {
  return keywords
    .filter((keyword) => selectedInterests.has(keyword.id))
    .map((keyword) => keyword.name);
}

function getDepartmentName(colleges: CollegeResponse[], id: string): string {
  for (const college of colleges) {
    const dept = college.Department.find((d) => d.id === id);
    if (dept) return dept.name;
  }
  return id;
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
        {yearFilterType === 'my-year' ? (
          <p>• {selectedYear}학년 공지만 받습니다</p>
        ) : (
          <p>• 전체 학년 공지를 받습니다</p>
        )}
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
  const { data: colleges = [] } = useGetColleges();
  const { data: keywords = [] } = useGetKeywords();
  const majorName = getDepartmentName(colleges, selectedMajor);

  const categoryLabels = getSelectedDooDreamCategoryLabels(selectedInterests, keywords);

  return (
    <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
      <h4 className="text-foreground mb-2 font-semibold">✨ 두드림</h4>
      <div className="text-muted-foreground space-y-1 text-sm">
        <p>• 전공: {majorName}</p>
        {/* <p>• 부전공: {getminorlabel(selectedminor)}</p> */}
        <p>
          • 관심사:{' '}
          {categoryLabels.length > 0
            ? categoryLabels.join(', ')
            : '선택 안 함'}
        </p>
      </div>
    </div>
  );
}
