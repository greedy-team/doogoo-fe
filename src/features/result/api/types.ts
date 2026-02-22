/**
 * ICS 링크 생성 관련 타입 정의
 */

/**
 * 학사공지 ICS 생성 요청
 */
export type AcademicIcsRequest = {
  selectedDepartmentId: string; // 필수 "dep_1"
  selectedGradeId: number; // 필수 (1~4)
  alarmEnabled: boolean; // 필수 "true"
  alarmMinutesBefore?: number; // 옵션 (0~10080분, 최대 1주일) "60"
};

/**
 * 두드림 ICS 생성 요청
 */
export type DoDreamIcsRequest = {
  selectedDepartmentId: string; // 필수 (주전공) "dep_1"
  selectedMinorDepartmentId?: string; // 옵션 (부전공) "dep_5"
  selectedKeywordId: string[]; // 필수 (키워드 ID 배열) ["k_1","k_2"]
  alarmEnabled: boolean; // 필수 "true"
  alarmMinutesBefore?: number; // 옵션 (0~10080분) "60"
};

/**
 * ICS 링크 생성 응답
 */
export type IcsResponse = {
  token: string; // ICS 접근 토큰 ""AbCdEf
  icsUrl: string; // ICS 구독 URL "https://api.example.com/cal/AbCdEf.ics"
  downloadUrl: string; // ICS 다운로드 URL  "https://api.example.com/cal/AbCdEf.ics?download=true"
};