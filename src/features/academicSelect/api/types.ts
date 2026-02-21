/**
 * 학사공지 관련 타입 정의
 */

/**
 * 학사공지
 */
export type AcademicNotice = {
  noticeId: string; //"seed-academic-1"
  title: string; //"1학년 등록금 납부 안내"
  gradeId: string; // 학년 ID "1", "2", "3", "4"
  startAt: string; // ISO 8601 format "2026-02-19T09:00:00"
  endAt: string | null; // Nullable "2026-02-19T17:00:00"
};

export type AcademicNoticesResponse = {
  notices: AcademicNotice[]; // 실제 서버 응답: "notices"
};

/**
 * 두드림 공지
 */
export type DoDreamNotice = {
  noticeId: string; //"seed-dodream-1"
  title: string; // "학술제 대회 참가 신청"
  departmentName: string | null; // "컴퓨터공학과"
  applicationStartAt: string; // ISO 8601 format "2026-02-19T09:00:00"
  applicationEndAt: string | null; // Nullable
  operatingStartAt: string; // ISO 8601 format "2026-03-01T10:00:00"
  operatingEndAt: string | null; // Nullable
  keywordIds: string[]; // 키워드 ID 배열 ["k_1"]
  detailUrl?: string;
};

export type DoDreamNoticesResponse = {
  notices: DoDreamNotice[]; // 실제 서버 응답: "notices"
};