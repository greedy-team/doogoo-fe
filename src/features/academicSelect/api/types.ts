/**
 * 학사공지 관련 타입 정의
 */

/**
 * 학사공지
 */
export type AcademicNotice = {
  grade: number; // 학년 (1~4)
  noticeId: string; //"ac_1"
  title: string; //"3학년 수강신청"
  startDate: string; // ISO 8601 format,"2026-02-11T10:00"
  endDate: string | null; // Nullable, "2026-02-11T16:00"
};

export type AcademicNoticesResponse = {
  academicNotices: AcademicNotice[];
};

/**
 * 두드림 공지
 */
export type DoDreamNotice = {
  noticeId: string; //"no_3396"
  title: string; // "2026학년도 1학기 해커톤"
  department: string | null; // Nullable "컴퓨터공학과
  applicationStartDate: string; // ISO 8601 format "2026-02-10T10:00"
  applicationEndDate: string | null; // Nullable 이하 동문
  operatingStartDate: string; // ISO 8601 format "2026-02-11T10:00"
  operatingEndDate: string | null; // Nullable
  keywords: string[]; // 키워드 ID 배열 ["k_1","k_2"]
  detailUrl?: string;
};

export type DoDreamNoticesResponse = {
  doDreamNotices: DoDreamNotice[];
};