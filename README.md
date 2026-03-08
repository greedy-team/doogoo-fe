```일단 임시로 작성해 봤습니다. 내용 검토 + 백앤드 문서 업데이트 + 이미지/gif추가필요```

<div align="center">

# 📅 Sejong D-Cal
### 세종대 맞춤형 두드림 캘린더 구독 서비스

세종대학교 **두드림** 비교과 공지와 **학사공지**를 학과·키워드·학년으로 필터링해<br>
나만의 `.ics` 구독 URL을 발급받아 구글·애플·아웃룩 캘린더에 자동 동기화하는 웹 서비스

<br>

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand_v5-433E38?style=flat-square)
![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=flat-square&logo=reactquery&logoColor=white)

</div>

---

## 💡 기획 배경

> **두드림**에는 수백 개의 공지가 올라오지만, 나와 무관한 정보가 섞여 정작 필요한 프로그램의 신청 마감을 놓치는 상황이 반복됩니다.

| 문제 | 설명 |
|------|------|
| 정보 과부하 | 관심 없는 공지와 섞여 가독성이 현저히 낮음 |
| 신청 타이밍 상실 | 찾아볼 때마다 이미 마감된 프로그램들 |
| 개인화 불가 | 학교 캘린더는 전체 공개 위주, 수동 등록은 번거로움 |

**목표:** 한 번의 필터 설정 → 내게 꼭 필요한 공지만 캘린더에서 자동 확인

---

## 🚀 사용자 흐름

```
① 서비스 선택   학사공지 또는 두드림 선택
       ↓
② 필터 설정     학과 / 학년 / 카테고리 / 키워드 선택
       ↓
③ 결과 미리보기  필터링된 일정을 월별 캘린더 또는 리스트 뷰로 확인
       ↓
④ 구독 URL 발급  고유한 .ics 주소 복사
       ↓
⑤ 캘린더 등록   구글 · 애플 · 아웃룩 앱에 URL로 추가
       ↓
⑥ 자동 동기화   이후 새 공지가 올라오면 캘린더에 자동 반영
```

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🎓 학사공지 필터링 | 학년(1~4학년, 대학원 등) 기준 학사공지 필터링 |
| 🌟 두드림 필터링 | 카테고리·학과·키워드 기준 두드림 공지 필터링 |
| 📆 캘린더 미리보기 | 필터 결과를 월별 캘린더 및 리스트 뷰로 확인 |
| 🔗 ICS URL 발급 | 필터 설정이 반영된 고유 `.ics` 구독 주소 생성 |
| 📱 구독 튜토리얼 | iOS · macOS · 구글 캘린더별 등록 방법 안내 |

<details>
<summary><b>두드림 카테고리 목록 (추가 예정)</b></summary>

| 카테고리 | 설명 |
|----------|------|
| 🏆 대회 및 학술제 | 경진대회, 공모전, 학술행사 |
| 💼 취창업 | 취업, 창업, 진로 관련 행사 |
| 🤝 봉사·사회참여 | 봉사활동, 사회공헌 프로그램 |
| 💬 상담 | 심리상담, 진로상담, 학업상담 |
| 🌏 글로벌 | 교환학생, 해외연수, 국제교류 |
| 🏫 캠퍼스 | 동아리, 축제, 캠퍼스 이벤트 |

</details>

---

## 🛠 기술 스택

**Frontend**

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand_v5-433E38?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white)

**Backend**

<!-- 백엔드 기술 스택 뱃지를 여기에 추가해주세요 -->

---

## 📁 프로젝트 구조

<details>
<summary><b>디렉토리 트리 펼치기</b></summary>

```
src/
├── pages/                         # 라우트 단위 페이지
│   ├── Landing.tsx                # 서비스 선택 (학사공지 / 두드림)
│   ├── AcademicNotice.tsx         # 학사공지 학년 필터 설정
│   ├── DooDreamNotice.tsx         # 두드림 카테고리 선택
│   ├── DooDreamCategoryDetail.tsx # 카테고리별 상세 키워드 설정
│   └── Result.tsx                 # 캘린더 미리보기 + ICS URL 발급
│
├── features/                      # 기능 단위 모듈
│   ├── StepIndicator/             # 단계 진행 표시 (1/2/3 스텝)
│   ├── academicNotice/            # 학사공지 학년 선택 UI
│   ├── dooDreamNotice/            # 두드림 카테고리/키워드 선택 UI
│   ├── landing/                   # 서비스 카드 선택 UI
│   └── result/                    # 캘린더 미리보기, ICS 발급, 구독 모달
│
├── shared/
│   ├── api/                       # API 클라이언트 및 호출 함수
│   │   ├── client.ts              # Axios 기본 클라이언트 (MSW/실서버 전환)
│   │   ├── noticesApi.ts          # 공지 목록 조회 API
│   │   ├── commonOptionsApi.ts    # 학과·키워드·학년 옵션 조회
│   │   └── types.ts               # 공통 타입 정의
│   ├── hooks/                     # 공용 커스텀 훅
│   │   ├── useNotices.ts          # 학사/두드림 공지 조회
│   │   ├── useCommonData.ts       # 필터 옵션 조회
│   │   └── useStepNavigation.ts   # 스텝 이동 로직
│   ├── stores/                    # Zustand 전역 상태
│   │   ├── useServiceStore.ts     # 선택된 서비스 (학사/두드림)
│   │   ├── useAcademicStore.ts    # 학사공지 필터 상태
│   │   ├── useDodreamStore.ts     # 두드림 필터 상태
│   │   └── useUIStore.ts          # UI 상태
│   └── utils/
│       └── noticeFilters.ts       # 공지 필터링 순수 함수
│
├── components/
│   ├── layout/                    # Navigation, Hero, Footer, HowToInfo
│   └── ui/                        # shadcn/ui 기본 컴포넌트
│
└── mocks/                         # MSW 핸들러 (개발용 목 데이터)
    ├── browser.ts
    └── handlers.ts
```

</details>
---

## 🔌 API

백엔드 서버: `https://www.sejongdoogoo-api.com`

| Method | Endpoint | 설명 |
|:------:|----------|------|
| `GET` | `/api/colleges` | 단과대·학과 목록 조회 |
| `GET` | `/api/keywords` | 두드림 키워드 목록 조회 |
| `GET` | `/api/grades` | 학년 목록 조회 |
| `GET` | `/api/academic/notices` | 학사공지 목록 조회 |
| `GET` | `/api/dodream/notices` | 두드림 공지 목록 조회 |
| `POST` | `/api/academic/ics` | 학사공지 ICS 구독 URL 발급 |
| `POST` | `/api/dodream/ics` | 두드림 ICS 구독 URL 발급 |

---

## 🗺 향후 계획

