/**
 * Department 관련 유틸리티 함수
 */
import type { Department, GroupedField } from '@/shared/api/types';

/**
 * Department ID로 이름 찾기
 * "전체", "계열", "학부", "학과" 모두 지원
 *
 * @param departments - Department 배열 (flat 구조)
 * @param id - 찾을 ID
 * @returns Department 이름 또는 ID (못 찾으면)
 *
 * @example
 * getDepartmentName(departments, "all") // "전체"
 * getDepartmentName(departments, "field-1") // "IT계열"
 * getDepartmentName(departments, "college-1") // "공과대학"
 * getDepartmentName(departments, "dept-1") // "컴퓨터공학과"
 */
export const getDepartmentName = (
  departments: Department[],
  id: string
): string => {
  // 1. "전체" 옵션
  if (id === 'all') return '전체';

  // 2. 계열 ID인지 확인 (field-1, field-2, ...)
  if (id.startsWith('field-')) {
    const dept = departments.find((d) => d.fieldId === id);
    return dept?.field || id;
  }

  // 3. 학부 ID인지 확인 (college-1, college-2, ...)
  if (id.startsWith('college-')) {
    const dept = departments.find((d) => d.collegeId === id);
    return dept?.college || id;
  }

  // 4. 학과 ID (dept-1, dept-2, ...)
  const dept = departments.find((d) => d.id === id);
  return dept?.name || id;
};

/**
 * Department 배열을 계열 → 학부 → 학과로 그룹핑
 *
 * @param departments - Department 배열 (flat 구조)
 * @returns 계열별로 그룹핑된 데이터
 *
 * @example
 * const grouped = groupDepartmentsByField(departments);
 * // {
 * //   "field-1": {
 * //     fieldName: "IT계열",
 * //     fieldId: "field-1",
 * //     colleges: {
 * //       "college-1": {
 * //         collegeName: "인공지능융합대학",
 * //         collegeId: "college-1",
 * //         departments: [...]
 * //       }
 * //     }
 * //   }
 * // }
 */
export const groupDepartmentsByField = (
  departments: Department[]
): Record<string, GroupedField> => {
  return departments.reduce((acc, dept) => {
    const fieldName = dept.field || '기타';
    const fieldId = dept.fieldId || 'other';

    if (!acc[fieldId]) {
      acc[fieldId] = { fieldName, fieldId, colleges: {} };
    }

    const collegeName = dept.college;
    const collegeId = dept.collegeId || collegeName;

    if (!acc[fieldId].colleges[collegeId]) {
      acc[fieldId].colleges[collegeId] = {
        collegeName,
        collegeId,
        departments: [],
      };
    }

    acc[fieldId].colleges[collegeId].departments.push(dept);
    return acc;
  }, {} as Record<string, GroupedField>);
};
