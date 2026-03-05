import type { AcademicNotice, DoDreamNotice } from '../api/types';

export type YearFilterType = 'my-year' | 'all';

/**
 * 학사공지 필터링
 * @param notices 전체 학사공지 목록
 * @param selectedYear 선택된 학년 (1~4)
 * @param yearFilterType 학년 필터 타입 ('my-year' | 'all')
 * @returns 필터링된 학사공지 목록
 */
export const filterAcademicNotices = (
  notices: AcademicNotice[],
  selectedYear: number,
  yearFilterType: YearFilterType
): AcademicNotice[] => {
  // 'all'이면 모든 공지 반환
  if (yearFilterType === 'all') {
    return notices;
  }

  // 'my-year'이면 선택된 학년의 공지만 반환
  const selectedYearId = selectedYear.toString();
  return notices.filter(
    (notice) => notice.gradeId === selectedYearId || notice.gradeId === 'all'
  );
};

/**
 * 두드림 공지 필터링
 * @param notices 전체 두드림 공지 목록
 * @param selectedMajor 선택된 학과 ID ('all' 또는 department ID)
 * @param selectedInterests 선택된 키워드 Set
 * @returns 필터링된 두드림 공지 목록
 */
export const filterDodreamNotices = (
  notices: DoDreamNotice[],
  selectedMajor: string,
  selectedInterests: Set<string>
): DoDreamNotice[] => {
  let filtered = notices;

  // 학과 필터링 (selectedMajor가 'all'이 아니면)
  if (selectedMajor !== 'all') {
    filtered = filtered.filter(
      (notice) =>
        notice.departmentId === selectedMajor ||
        notice.departmentId === 'all' ||
        notice.departmentId === null // 학과 미지정 공지는 보수적으로 모든 학과에 표시
    );
  }

  // 키워드 필터링 (selectedInterests가 비어있지 않으면)
  if (selectedInterests.size > 0) {
    filtered = filtered.filter((notice) =>
      notice.keywordIds.some((keywordId) => selectedInterests.has(keywordId))
    );
  }

  return filtered;
};
