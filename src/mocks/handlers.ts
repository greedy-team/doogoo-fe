/**
 * MSW API Handlers
 *
 * 역할: 각 API 엔드포인트별로 Mock 데이터를 정의
 */
import { http, HttpResponse } from 'msw';
import majorsData from '@/mock/data/majors.json';

/**
 * Departments 데이터 변환 함수
 *
 * majors.json (flat 구조) → 3계층 구조 (계열/학부/학과)로 변환
 * ⚠️ 3계층 구조 전체가 아직 백엔드 미구현
 *
 * 입력: [{ college: "공과대학", majors: [...] }]
 * 출력: [{ id: "college-1", name: "공과대학", departments: [...] }]
 */
const transformDepartments = () => {
  const departments = [];
  let collegeId = 1;
  let deptId = 1;

  // 전체 옵션 추가
  departments.push({
    id: 'all',
    name: '전체',
    type: 'all',
  });

  majorsData.forEach((college) => {
    const collegeItem = {
      id: `college-${collegeId}`,
      name: college.college,
      type: 'college',
      departments: college.majors.map((major) => ({
        id: `dept-${deptId++}`,
        name: major.label,
        type: 'department',
      })),
    };
    departments.push(collegeItem);
    collegeId++;
  });

  return departments;
};

/**
 * API Handlers 배열
 *
 * 각 API 엔드포인트에 대한 Mock 응답 정의
 */
export const handlers = [
  /**
   * GET /api/grades - 학년 목록 조회
   */
  http.get('/api/grades', () => {
    return HttpResponse.json({
      grades: [
        { id: 'all', name: '전체' },
        { id: '1', name: '1학년' },
        { id: '2', name: '2학년' },
        { id: '3', name: '3학년' },
        { id: '4', name: '4학년' },
        { id: '4-5', name: '4~5학년' }, // ⚠️ 백엔드 미구현 (의학/수의학 전용)
      ],
    });
  }),

  /**
   * GET /api/departments - 학과 목록 조회
   *
   * ⚠️ 3계층 구조 (계열 → 학부 → 학과) 전체가 백엔드 미구현
   * - ID 네이밍: field-*, college-*, dept-*
   * - "all" 옵션 포함
   * - majors.json 데이터를 동적으로 변환
   */
  http.get('/api/departments', () => {
    return HttpResponse.json({
      departments: transformDepartments(), // ⚠️ 전체 구조가 백엔드 미구현
    });
  }),

  /**
   * GET /api/keywords - 키워드(카테고리) 목록 조회
   *
   * Categories.tsx에서 카드 UI로 표시됨
   *
   * 카테고리 종류:
   * - 대회 및 학술제, 취창업, 봉사·사회참여
   * - 상담, 글로벌, 캠퍼스
   */
  http.get('/api/keywords', () => {
    return HttpResponse.json({
      keywords: [
        {
          id: 'k_1',
          name: '대회 및 학술제',
          description: '경진대회, 공모전, 학술행사', // ⚠️ 백엔드 미구현
        },
        {
          id: 'k_2',
          name: '취창업',
          description: '취업, 창업, 진로 관련 행사' // ⚠️ 백엔드 미구현
        },
        {
          id: 'k_3',
          name: '봉사·사회참여',
          description: '봉사활동, 사회공헌 프로그램', // ⚠️ 백엔드 미구현
        },
        {
          id: 'k_4',
          name: '상담',
          description: '심리상담, 진로상담, 학업상담', // ⚠️ 백엔드 미구현
        },
        {
          id: 'k_5',
          name: '글로벌',
          description: '교환학생, 해외연수, 국제교류', // ⚠️ 백엔드 미구현
        },
        {
          id: 'k_6',
          name: '캠퍼스',
          description: '동아리, 축제, 캠퍼스 이벤트', // ⚠️ 백엔드 미구현
        },
      ],
    });
  }),

  /**
   * GET /api/academic/notices - 학사공지 목록 조회
   *
   * 사용처:
   * - AcademicPage에서 학년 선택 후 필터링
   * - CalendarPreview에서 미리보기
   */
  http.get('/api/academic/notices', () => {
    return HttpResponse.json({
      notices: [
        {
          noticeId: 'ac-1',
          title: '1학년 등록금 납부 안내',
          gradeId: '1',
          startAt: '2026-02-19T09:00:00',
          endAt: '2026-02-19T17:00:00',
          location: '학생회관 2층', // ⚠️ 백엔드 미구현
          description: '2026학년도 1학기 등록금 납부 안내입니다.', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-2',
          title: '1학년 신입생 OT',
          gradeId: '1',
          startAt: '2026-02-25T10:00:00',
          endAt: '2026-02-25T16:00:00',
          location: '광개토관 대강당', // ⚠️ 백엔드 미구현
          description: '2026학년도 신입생 오리엔테이션', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-3',
          title: '2학년 수강신청',
          gradeId: '2',
          startAt: '2026-02-20T10:00:00',
          endAt: '2026-02-20T18:00:00',
          location: '온라인', // ⚠️ 백엔드 미구현
          description: '2학년 수강신청 일정입니다.', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-4',
          title: '2학년 전공선택 상담주간',
          gradeId: '2',
          startAt: '2026-03-03T09:00:00',
          endAt: '2026-03-07T18:00:00',
          location: '각 학과 사무실', // ⚠️ 백엔드 미구현
          description: '전공 선택을 위한 1:1 상담 진행', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-5',
          title: '3학년 취업 특강',
          gradeId: '3',
          startAt: '2026-03-10T14:00:00',
          endAt: '2026-03-10T16:00:00',
          location: '학생회관 대강당', // ⚠️ 백엔드 미구현
          description: '이력서 작성 및 면접 준비 특강', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-6',
          title: '3학년 현장실습 설명회',
          gradeId: '3',
          startAt: '2026-03-15T15:00:00',
          endAt: '2026-03-15T17:00:00',
          location: '광개토관 B101', // ⚠️ 백엔드 미구현
          description: '여름방학 현장실습 프로그램 안내', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-7',
          title: '4학년 졸업논문 제출',
          gradeId: '4',
          startAt: '2026-05-01T00:00:00',
          endAt: '2026-05-31T23:59:00',
          location: '온라인 제출', // ⚠️ 백엔드 미구현
          description: '졸업논문 최종 제출 기간', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-8',
          title: '4학년 졸업앨범 촬영',
          gradeId: '4',
          startAt: '2026-04-01T10:00:00',
          endAt: '2026-04-05T17:00:00',
          location: '학생회관 1층', // ⚠️ 백엔드 미구현
          description: '졸업앨범 개인 및 단체 촬영', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-9',
          title: '4-5학년 의학계열 종합평가',
          gradeId: '4-5',
          startAt: '2026-04-20T09:00:00',
          endAt: '2026-04-20T18:00:00',
          location: '의학관 실습실', // ⚠️ 백엔드 미구현
          description: '의학/수의학 전공 종합 평가 시험', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-10',
          title: '전체 학년 대상 장학금 설명회',
          gradeId: 'all',
          startAt: '2026-02-21T14:00:00',
          endAt: '2026-02-21T16:00:00',
          location: '대양홀', // ⚠️ 백엔드 미구현
          description: '전체 학년 대상 장학금 설명회입니다.', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-11',
          title: '전체 학년 중간고사 기간',
          gradeId: 'all',
          startAt: '2026-04-13T09:00:00',
          endAt: '2026-04-19T18:00:00',
          location: '각 강의실', // ⚠️ 백엔드 미구현
          description: '2026-1학기 중간고사 기간', // ⚠️ 백엔드 미구현
        },
        {
          noticeId: 'ac-12',
          title: '전체 학년 기말고사 기간',
          gradeId: 'all',
          startAt: '2026-06-15T09:00:00',
          endAt: '2026-06-21T18:00:00',
          location: '각 강의실', // ⚠️ 백엔드 미구현
          description: '2026-1학기 기말고사 기간', // ⚠️ 백엔드 미구현
        },
      ],
    });
  }),

  /**
   * GET /api/dodream/notices - 두드림 공지 목록 조회
   *
   * 특징:
   * - departmentId + departmentName (학과 정보)
   * - keywordIds (카테고리 분류용)
   * - applicationStartAt/EndAt (신청 기간)
   * - operatingStartAt/EndAt (운영 기간)
   * - location, description (상세 정보)
   *
   * 사용처:
   * - DodreamPage에서 학과/키워드별 필터링
   * - Categories에서 키워드별 공지 그룹핑
   */
  http.get('/api/dodream/notices', () => {
    return HttpResponse.json({
      notices: [
        {
          noticeId: 'dd-1',
          title: 'AI 해커톤 대회',
          departmentId: 'dept-3',
          departmentName: '컴퓨터공학과',
          applicationStartAt: '2026-02-19T09:00:00',
          applicationEndAt: '2026-02-26T18:00:00',
          operatingStartAt: '2026-03-01T10:00:00',
          operatingEndAt: '2026-03-02T17:00:00',
          location: '대양AI센터 B101호', // ⚠️ 백엔드 미구현
          description: 'AI 해커톤 대회 참가 신청', // ⚠️ 백엔드 미구현
          keywordIds: ['k_1'],
          detailUrl: 'https://example.com/dodream/1',
        },
        {
          noticeId: 'dd-2',
          title: '스타트업 CEO 특강',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-02-21T09:00:00',
          applicationEndAt: '2026-02-28T18:00:00',
          operatingStartAt: '2026-02-22T14:00:00',
          operatingEndAt: '2026-02-22T16:00:00',
          location: '학생회관 대강당', // ⚠️ 백엔드 미구현
          description: '스타트업 창업 성공 사례 특강', // ⚠️ 백엔드 미구현
          keywordIds: ['k_2'],
          detailUrl: 'https://example.com/dodream/2',
        },
        {
          noticeId: 'dd-3',
          title: '경영학과 비즈니스 아이디어 공모전',
          departmentId: 'dept-5',
          departmentName: '경영학과',
          applicationStartAt: '2026-03-01T09:00:00',
          applicationEndAt: '2026-03-15T18:00:00',
          operatingStartAt: '2026-03-20T14:00:00',
          operatingEndAt: '2026-03-20T18:00:00',
          location: '경영관 대강당', // ⚠️ 백엔드 미구현
          description: '창의적인 비즈니스 모델 공모전', // ⚠️ 백엔드 미구현
          keywordIds: ['k_1', 'k_2'],
          detailUrl: 'https://example.com/dodream/3',
        },
        {
          noticeId: 'dd-4',
          title: '사회봉사 동아리 신규 모집',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-03-05T09:00:00',
          applicationEndAt: '2026-03-19T23:59:00',
          operatingStartAt: '2026-03-25T10:00:00',
          operatingEndAt: null,
          location: '학생회관 3층', // ⚠️ 백엔드 미구현
          description: '지역사회 봉사활동 동아리 신입 부원 모집', // ⚠️ 백엔드 미구현
          keywordIds: ['k_3', 'k_6'],
          detailUrl: 'https://example.com/dodream/4',
        },
        {
          noticeId: 'dd-5',
          title: '심리상담센터 집단상담 프로그램',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-03-10T09:00:00',
          applicationEndAt: '2026-03-20T18:00:00',
          operatingStartAt: '2026-03-24T14:00:00',
          operatingEndAt: '2026-04-28T16:00:00',
          location: '학생상담센터', // ⚠️ 백엔드 미구현
          description: '스트레스 관리 및 대인관계 향상 집단상담 (주 1회, 6주)', // ⚠️ 백엔드 미구현
          keywordIds: ['k_4'],
          detailUrl: 'https://example.com/dodream/5',
        },
        {
          noticeId: 'dd-6',
          title: '글로벌 교환학생 프로그램 설명회',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-03-15T09:00:00',
          applicationEndAt: '2026-04-10T18:00:00',
          operatingStartAt: '2026-03-18T15:00:00',
          operatingEndAt: '2026-03-18T17:00:00',
          location: '국제교류관 세미나실', // ⚠️ 백엔드 미구현
          description: '2026-2학기 교환학생 프로그램 안내', // ⚠️ 백엔드 미구현
          keywordIds: ['k_5'],
          detailUrl: 'https://example.com/dodream/6',
        },
        {
          noticeId: 'dd-7',
          title: '영어회화 스터디 그룹 모집',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-03-20T09:00:00',
          applicationEndAt: '2026-04-05T18:00:00',
          operatingStartAt: '2026-04-07T18:00:00',
          operatingEndAt: '2026-06-20T20:00:00',
          location: '언어교육원', // ⚠️ 백엔드 미구현
          description: '원어민과 함께하는 영어회화 스터디 (주 2회)', // ⚠️ 백엔드 미구현
          keywordIds: ['k_5', 'k_6'],
          detailUrl: 'https://example.com/dodream/7',
        },
        {
          noticeId: 'dd-8',
          title: '디자인학과 졸업작품 전시회',
          departmentId: 'dept-8',
          departmentName: '디자인학과',
          applicationStartAt: '2026-04-01T09:00:00',
          applicationEndAt: '2026-04-10T18:00:00',
          operatingStartAt: '2026-05-15T10:00:00',
          operatingEndAt: '2026-05-20T18:00:00',
          location: '예술관 전시실', // ⚠️ 백엔드 미구현
          description: '2026 디자인학과 졸업작품 전시회', // ⚠️ 백엔드 미구현
          keywordIds: ['k_1', 'k_6'],
          detailUrl: 'https://example.com/dodream/8',
        },
        {
          noticeId: 'dd-9',
          title: '취업 멘토링 프로그램',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-04-05T09:00:00',
          applicationEndAt: '2026-04-25T18:00:00',
          operatingStartAt: '2026-05-01T14:00:00',
          operatingEndAt: '2026-06-30T18:00:00',
          location: '취업지원센터', // ⚠️ 백엔드 미구현
          description: '졸업생 선배와 1:1 취업 멘토링 매칭 프로그램', // ⚠️ 백엔드 미구현
          keywordIds: ['k_2'],
          detailUrl: 'https://example.com/dodream/9',
        },
        {
          noticeId: 'dd-10',
          title: '캠퍼스 페스티벌 부스 운영팀 모집',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-04-10T09:00:00',
          applicationEndAt: '2026-04-30T23:59:00',
          operatingStartAt: '2026-05-20T10:00:00',
          operatingEndAt: '2026-05-22T22:00:00',
          location: '대운동장', // ⚠️ 백엔드 미구현
          description: '봄 축제 부스 운영 스태프 모집', // ⚠️ 백엔드 미구현
          keywordIds: ['k_6'],
          detailUrl: 'https://example.com/dodream/10',
        },
        {
          noticeId: 'dd-11',
          title: '물리학과 학술 세미나',
          departmentId: 'dept-12',
          departmentName: '물리학과',
          applicationStartAt: '2026-04-15T09:00:00',
          applicationEndAt: '2026-04-28T18:00:00',
          operatingStartAt: '2026-05-05T14:00:00',
          operatingEndAt: '2026-05-05T17:00:00',
          location: '자연과학관 세미나실', // ⚠️ 백엔드 미구현
          description: '양자역학 최신 연구 동향 세미나', // ⚠️ 백엔드 미구현
          keywordIds: ['k_1'],
          detailUrl: 'https://example.com/dodream/11',
        },
        {
          noticeId: 'dd-12',
          title: '해외 인턴십 프로그램',
          departmentId: 'all',
          departmentName: null,
          applicationStartAt: '2026-04-20T09:00:00',
          applicationEndAt: '2026-05-20T18:00:00',
          operatingStartAt: '2026-07-01T09:00:00',
          operatingEndAt: '2026-08-31T18:00:00',
          location: '해외 협력 기업', // ⚠️ 백엔드 미구현
          description: '여름방학 해외 기업 인턴십 (8주)', // ⚠️ 백엔드 미구현
          keywordIds: ['k_2', 'k_5'],
          detailUrl: 'https://example.com/dodream/12',
        },
      ],
    });
  }),

  /**
   * POST /api/academic/ics - 학사공지 ICS 파일 생성
   *
   * 요청 본문:
   * {
   *   selectedDepartmentId: string,  // 학과 ID (필수)
   *   selectedGradeId: number,       // 학년 (1~4, 필수)
   *   alarmEnabled: boolean,         // 알람 활성화 여부
   *   alarmMinutesBefore?: number    // 알람 시간 (분, 선택)
   * }
   *
   * 응답:
   * {
   *   token: string,        // ICS 파일 고유 토큰
   *   icsUrl: string,       // ICS 파일 URL
   *   downloadUrl: string   // 다운로드 URL
   * }
   */
  http.post('/api/academic/ics', async ({ request }) => {
    const body = await request.json();
    console.log('📝 Academic ICS 요청:', body);

    return HttpResponse.json({
      token: 'mock-academic-token',
      icsUrl: 'https://www.sejongdoogoo-api.com/cal/mock-academic-token.ics',
      downloadUrl:
        'https://www.sejongdoogoo-api.com/cal/mock-academic-token.ics?download=true',
    });
  }),

  /**
   * POST /api/dodream/ics - 두드림 ICS 파일 생성
   *
   * 요청 본문:
   * {
   *   selectedDepartmentId: string,        // 주전공 ID (필수)
   *   selectedMinorDepartmentId?: string,  // 부전공 ID (선택)
   *   selectedKeywordId: string[],         // 키워드 ID 배열 (필수)
   *   alarmEnabled: boolean,               // 알람 활성화 여부
   *   alarmMinutesBefore?: number          // 알람 시간 (분, 선택)
   * }
   *
   * 응답:
   * {
   *   token: string,        // ICS 파일 고유 토큰
   *   icsUrl: string,       // ICS 파일 URL
   *   downloadUrl: string   // 다운로드 URL
   * }
   */
  http.post('/api/dodream/ics', async ({ request }) => {
    const body = await request.json();
    console.log('📝 DoDream ICS 요청:', body);

    return HttpResponse.json({
      token: 'mock-dodream-token',
      icsUrl: 'https://www.sejongdoogoo-api.com/cal/mock-dodream-token.ics',
      downloadUrl:
        'https://www.sejongdoogoo-api.com/cal/mock-dodream-token.ics?download=true',
    });
  }),
];
