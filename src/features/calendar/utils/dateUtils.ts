/**
 * 주어진 날짜까지 남은 일수를 계산합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 남은 일수 (음수면 과거, 0 이상이면 미래)
 */
export function calculateDaysLeft(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정

  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * 날짜가 과거인지 확인합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 과거면 true, 미래 또는 오늘이면 false
 */
export function isPastDate(dateString: string): boolean {
  return calculateDaysLeft(dateString) < 0;
}

/**
 * 날짜를 한국어 형식으로 포맷팅합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns "2026년 2월 10일" 형식
 */
export function formatKoreanDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}
