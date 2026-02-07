import type { Event } from "../../events/components/EventCard";
import { calculateDaysLeft } from "../utils/dateUtils";

// 원본 학사 일정 데이터
const academicCalendarData = [
  { "id": "2026-01-01", "summary": "2학기 기말고사 성적마감", "start": "2026-01-02T00:00:00Z", "end": "2026-01-03T23:59:59Z", "location": "Sejong University", "description": "2학기 기말고사 성적마감", "category": "성적/시험", "department": "전체", "attendees": 45 },
  { "id": "2026-01-02", "summary": "1학기 복학, 휴학 신청", "start": "2026-01-26T00:00:00Z", "end": "2026-02-01T23:59:59Z", "location": "Sejong University", "description": "1학기 복학, 휴학 신청", "category": "등록/휴복학", "department": "전체", "attendees": 82 },
  { "id": "2026-02-01", "summary": "1학기 수강신청 (4학년)", "start": "2026-02-10T00:00:00Z", "end": "2026-02-10T23:59:59Z", "location": "Sejong University", "description": "1학기 수강신청 (4학년)", "category": "수강신청", "department": "전체", "attendees": 67 },
  { "id": "2026-02-02", "summary": "1학기 수강신청 (3학년)", "start": "2026-02-11T00:00:00Z", "end": "2026-02-11T23:59:59Z", "location": "Sejong University", "description": "1학기 수강신청 (3학년)", "category": "수강신청", "department": "전체", "attendees": 54 },
  { "id": "2026-02-03", "summary": "1학기 수강신청 (1,2학년)", "start": "2026-02-12T00:00:00Z", "end": "2026-02-12T23:59:59Z", "location": "Sejong University", "description": "1학기 수강신청 (1,2학년)", "category": "수강신청", "department": "전체", "attendees": 91 },
  { "id": "2026-02-04", "summary": "1학기 수강신청 (전체)", "start": "2026-02-13T00:00:00Z", "end": "2026-02-13T23:59:59Z", "location": "Sejong University", "description": "1학기 수강신청 (전체)", "category": "수강신청", "department": "전체", "attendees": 33 },
  { "id": "2026-02-05", "summary": "제84회 학위수여식", "start": "2026-02-20T00:00:00Z", "end": "2026-02-20T23:59:59Z", "location": "Sejong University", "description": "제84회 학위수여식", "category": "학사일정", "department": "전체", "attendees": 78 },
  { "id": "2026-02-06", "summary": "1학기 등록 (학부)", "start": "2026-02-23T00:00:00Z", "end": "2026-02-26T23:59:59Z", "location": "Sejong University", "description": "1학기 등록 (학부)", "category": "등록/휴복학", "department": "전체", "attendees": 29 },
  { "id": "2026-02-07", "summary": "입학식", "start": "2026-02-23T00:00:00Z", "end": "2026-02-23T23:59:59Z", "location": "Sejong University", "description": "입학식", "category": "학사일정", "department": "전체", "attendees": 88 },
  { "id": "2026-03-01", "summary": "1학기 개강", "start": "2026-03-03T00:00:00Z", "end": "2026-03-03T23:59:59Z", "location": "Sejong University", "description": "1학기 개강", "category": "학사일정", "department": "전체", "attendees": 15 },
  { "id": "2026-03-02", "summary": "수강신청 과목 확인 및 변경", "start": "2026-03-04T00:00:00Z", "end": "2026-03-09T23:59:59Z", "location": "Sejong University", "description": "수강신청 과목 확인 및 변경", "category": "수강신청", "department": "전체", "attendees": 42 },
  { "id": "2026-04-01", "summary": "1학기 중간고사", "start": "2026-04-21T00:00:00Z", "end": "2026-04-27T23:59:59Z", "location": "Sejong University", "description": "1학기 중간고사", "category": "성적/시험", "department": "전체", "attendees": 66 },
  { "id": "2026-05-01", "summary": "창립 86주년 기념휴일", "start": "2026-05-01T00:00:00Z", "end": "2026-05-01T23:59:59Z", "location": "Sejong University", "description": "창립 86주년 기념휴일", "category": "공휴일", "department": "전체", "attendees": 10 },
  { "id": "2026-06-06", "summary": "하계방학 시작 및 계절학기 개강", "start": "2026-06-23T00:00:00Z", "end": "2026-06-23T23:59:59Z", "location": "Sejong University", "description": "하계방학 시작 및 계절학기 개강", "category": "학사일정", "department": "전체", "attendees": 37 },
  { "id": "2026-08-01", "summary": "2학기 수강신청", "start": "2026-08-14T00:00:00Z", "end": "2026-08-21T23:59:59Z", "location": "Sejong University", "description": "2학기 수강신청", "category": "수강신청", "department": "전체", "attendees": 95 },
  { "id": "2026-09-01", "summary": "2학기 개강", "start": "2026-09-01T00:00:00Z", "end": "2026-09-01T23:59:59Z", "location": "Sejong University", "description": "2학기 개강", "category": "학사일정", "department": "전체", "attendees": 21 },
  { "id": "2026-10-01", "summary": "2학기 중간고사", "start": "2026-10-20T00:00:00Z", "end": "2026-10-26T23:59:59Z", "location": "Sejong University", "description": "2학기 중간고사", "category": "성적/시험", "department": "전체", "attendees": 59 },
  { "id": "2026-12-06", "summary": "동계방학 시작 및 계절학기 개강", "start": "2026-12-22T00:00:00Z", "end": "2026-12-22T23:59:59Z", "location": "Sejong University", "description": "동계방학 시작 및 계절학기 개강", "category": "학사일정", "department": "전체", "attendees": 48 },
  { "id": "2027-02-06", "summary": "입학식", "start": "2027-02-22T00:00:00Z", "end": "2027-02-22T23:59:59Z", "location": "Sejong University", "description": "입학식", "category": "학사일정", "department": "전체", "attendees": 85 }
]; //학년필드가 의미가 있나..?

// 두드림 이벤트 데이터
//attendees은 임시로 넣은 데이터임
const doDreamEventsData = [
  {
    "id": "dd-2026-001-apply",
    "summary": "[신청] 동계 영화제작워크샵 : 초록제",
    "start": "2026-02-05T00:00:00Z",
    "end": "2026-02-12T23:59:59Z",
    "location": "영화예술학과",
    "description": "대상: 영화예술학과 / 신청 인원: 무제한",
    "category": "예체능/워크샵",
    "department": "영화예술학과",
    "attendees": 100
  },
  {
    "id": "dd-2026-001-run",
    "summary": "[운영] 동계 영화제작워크샵 : 초록제",
    "start": "2026-02-13T10:00:00Z",
    "end": "2026-02-13T18:00:00Z",
    "location": "영화예술학과",
    "description": "실제 워크샵 운영 시간입니다.",
    "category": "예체능/워크샵",
    "department": "영화예술학과",
    "attendees": 24
  },
  {
    "id": "dd-2026-002-apply",
    "summary": "[신청] 인융인의 재능봉사",
    "start": "2026-02-09T00:00:00Z",
    "end": "2026-02-25T23:59:59Z",
    "location": "인공지능융합대학",
    "description": "인공지능융합대학 소속 학생 재능기부 봉사활동 신청",
    "category": "봉사/인공지능",
    "department": "인공지능융합대학",
    "attendees": 40
  },
  {
    "id": "dd-2026-003-apply",
    "summary": "[신청] 제9회 학정포럼",
    "start": "2026-02-19T00:00:00Z",
    "end": "2026-03-05T23:59:59Z",
    "location": "학술정보원",
    "description": "선착순 70명 마감이므로 빠른 신청 권장",
    "category": "학술/포럼",
    "department": "학술정보원",
    "attendees": 70
  },
  {
    "id": "dd-2026-004-run",
    "summary": "[운영] 기초학력증진프로그램(1차) : 파이썬",
    "start": "2026-04-01T00:00:00Z",
    "end": "2026-06-28T23:59:59Z",
    "location": "교수학습개발센터",
    "description": "한 학기 동안 진행되는 장기 운영 프로그램입니다.",
    "category": "학습/IT",
    "department": "교수학습개발센터",
    "attendees": 55
  }
];

// 카테고리 매핑 함수
function mapCategory(originalCategory: string): Event["category"] {
  const categoryMap: Record<string, Event["category"]> = {
    "성적/시험": "Academic",
    "등록/휴복학": "Academic",
    "수강신청": "Academic",
    "학사일정": "Academic",
    "공휴일": "Social",
    "예체능/워크샵": "Workshop",
    "봉사/인공지능": "Social",
    "학술/포럼": "Academic",
    "학습/IT": "Workshop",
  };

  return categoryMap[originalCategory] || "Academic";
}

// 데이터 변환 함수
function transformToEvent(data: typeof academicCalendarData[0]): Event {
  return {
    id: data.id,
    title: data.summary,
    category: mapCategory(data.category),
    originalCategory: data.category, // 원본 카테고리 보존
    date: data.start.split('T')[0], // "2026-02-10"
    daysLeft: calculateDaysLeft(data.start),
    location: data.location,
    department: data.department === "전체" ? "All Departments" : data.department,
    isPopular: data.attendees > 70, // 참가자 70명 이상이면 인기
    attendees: data.attendees,
    description: data.description,
  };
}

// 변환된 이벤트 목록
export const mockEvents: Event[] = [
  ...academicCalendarData.map(transformToEvent),
  ...doDreamEventsData.map(transformToEvent),
];

// 최근 이벤트만 필터링 (과거 이벤트 제외)
export const upcomingEvents: Event[] = mockEvents.filter(
  event => event.daysLeft >= 0
);
