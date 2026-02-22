/**
 * 학과 정보 (flat 구조)
 * ⚠️ field, fieldId는 백엔드 미구현 - 프론트에서 추가
 */
export type Department = {
  id: string;           // 학과 ID (예: "dept-1")
  name: string;         // 학과명 (예: "컴퓨터공학과")
  college: string;      // 단과대학명 (예: "인공지능융합대학")
  collegeId?: string;   // 단과대학 ID (선택, 예: "college-1")
  field?: string;       // 계열명 (선택, 예: "IT계열") - 프론트에서 추가
  fieldId?: string;     // 계열 ID (선택, 예: "field-1") - 프론트에서 추가
};

export type Keyword = {
  id: string;
  name: string;
  description?: string; // ⚠️ 백엔드 미구현 - 프론트에서 추가
};

export type Grade = {
  id: string;
  name: string;
};

export type DepartmentsResponse = {
  departments: Department[];
};

export type KeywordsResponse = {
  keywords: Keyword[];
};

export type GradesResponse = {
  grades: Grade[];
};

/**
 * 학과 그룹핑 타입 (계열 → 학부 → 학과)
 */
export type GroupedCollege = {
  collegeName: string;
  collegeId: string;
  departments: Department[];
};

export type GroupedField = {
  fieldName: string;
  fieldId: string;
  colleges: Record<string, GroupedCollege>;
};
