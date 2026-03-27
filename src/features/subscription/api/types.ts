/**
 * ICS 링크 생성 관련 타입 정의
 */

/**
 * 학사공지 ICS 생성 요청
 */
export type AcademicIcsRequest = {
  selectedGradeIds: string[] | null; // 학년 ID 목록, null 시 백엔드에서 "전체"로 처리
};

/**
 * 두드림 ICS 생성 요청
 */
export type DoDreamIcsRequest = {
  selectedDepartmentId?: string | null; // null 시 백엔드에서 "전체"로 처리
  selectedMinorDepartmentId?: string;
  selectedKeywordId: string[];
};

/**
 * ICS 링크 생성 응답
 */
export type IcsResponse = {
  token: string; // ICS 접근 토큰 ""AbCdEf
  icsUrl: string; // ICS 구독 URL "https://api.example.com/cal/AbCdEf.ics"
  downloadUrl: string; // ICS 다운로드 URL  "https://api.example.com/cal/AbCdEf.ics?download=true"
};
