import type { AcademicNotice, DoDreamNotice } from '@/shared/api/types';

export type YearFilterType = 'my-year' | 'all';

export const filterAcademicNotices = (
  notices: AcademicNotice[],
  selectedYear: number,
  yearFilterType: YearFilterType
): AcademicNotice[] => {
  if (yearFilterType === 'all') {
    return notices;
  }
  const selectedYearId = selectedYear.toString();
  return notices.filter(
    (notice) => notice.gradeId === selectedYearId || notice.gradeId === 'all'
  );
};

export const filterDodreamNotices = (
  notices: DoDreamNotice[],
  selectedMajor: string,
  selectedInterests: Set<string>
): DoDreamNotice[] => {
  let filtered = notices;

  if (selectedMajor !== 'all') {
    filtered = filtered.filter(
      (notice) =>
        notice.departmentId === selectedMajor ||
        notice.departmentId === 'all' ||
        notice.departmentId === null
    );
  }

  if (selectedInterests.size > 0) {
    filtered = filtered.filter((notice) =>
      notice.keywordIds.some((keywordId) => selectedInterests.has(keywordId))
    );
  }

  return filtered;
};
