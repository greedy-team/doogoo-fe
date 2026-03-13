import type { AcademicNotice, DoDreamNotice } from '@/shared/api/types';

export type YearFilterType = 'my-year' | 'all';

export const filterAcademicNotices = (
  notices: AcademicNotice[],
  selectedYear: number,
  yearFilterType: YearFilterType,
): AcademicNotice[] => {
  if (yearFilterType === 'all') {
    return notices;
  }
  const selectedYearId = selectedYear.toString();
  return notices.filter(
    (notice) =>
      notice.gradeId === selectedYearId ||
      notice.gradeId === 'all' ||
      notice.gradeId === null,
  );
};

export const filterDodreamNotices = (
  notices: DoDreamNotice[],
  selectedMajor: string,
  selectedInterests: Set<string>,
): DoDreamNotice[] => {
  // 아무 키워드도 선택하지 않으면 공지 없음
  if (selectedInterests.size === 0) {
    return [];
  }

  const filteredByInterest = notices.filter((notice) =>
    notice.keywordIds.some((keywordId) => selectedInterests.has(keywordId)),
  );

  // major가 필요한 카테고리(k_0)에만 학과 필터를 적용하고,
  // 그 외 카테고리는 선택한 관심사 기준으로 모두 노출한다.
  if (!selectedMajor) {
    return filteredByInterest;
  }

  return filteredByInterest.filter((notice) => {
    const isMajorRequiredNotice = notice.keywordIds.includes('k_0');

    if (!isMajorRequiredNotice) {
      return true;
    }

    return notice.departmentId === selectedMajor;
  });
};
