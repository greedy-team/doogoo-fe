import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Calendar, CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="from-background to-muted/40 bg-linear-to-b px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-6 flex flex-col space-y-4 text-4xl sm:text-6xl">
            <span>복잡한 공지사항은 빼고,</span>
            <span className="text-[#C3002F]">내 일정만 깔끔하게.</span>
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            학사일정부터 두드림 비교과까지, 나에게 필요한 정보만 필터링하세요.
            <br />한 번의 설정으로 캘린더와 실시간 자동 동기화.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#C3002F] px-8 py-6 text-lg text-white hover:bg-[#A00025]"
          >
            <Link to="/events">나만의 일정 만들기</Link>
          </Button>
        </div>

        {/* Split Screen Mockup */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Left: Messy List */}
          <div className="border-border bg-card rounded-2xl border p-6 shadow-lg">
            <div className="border-border mb-4 flex items-center gap-2 border-b pb-3">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground ml-2 text-sm">Before</span>
            </div>
            <div className="space-y-3 opacity-70">
              {[
                '전체공지 - 2024학년도 2학기 성적 처리 일정',
                '국제교류처 - 교환학생 설명회 (전체)',
                '소프트웨어학과 - AI 해커톤 참가자 모집',
                '영어영문학과 - 영어말하기대회 안내',
                '공과대학 - 시설 점검 공지 (전체)',
                '학생처 - 장학금 신청 안내 (전체)',
                '디자인학부 - 졸업전시회 일정 공지',
                '체육교육과 - 체육대회 참가 신청',
                '경영학부 - 취업 설명회 (전체)',
                '화학과 - 실험실 안전교육 일정',
                '음악학과 - 정기연주회 안내',
              ].map((text, i) => (
                <div
                  key={i}
                  className="bg-muted/50 text-foreground rounded p-2 text-sm"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Clean Calendar */}
          <div className="border-border bg-card relative rounded-2xl border p-6 shadow-lg">
            <div className="border-border mb-4 flex items-center gap-2 border-b pb-3">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground ml-2 text-sm">After</span>
            </div>

            {/* Calendar Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#C3002F]" />
                <span className="text-foreground">My Calendar</span>
              </div>
            </div>

            {/* Filtered Events */}
            <div className="space-y-3">
              <div className="rounded border-l-4 border-[#C3002F] bg-red-500/10 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-foreground text-sm">AI Hackathon</div>
                    <div className="text-muted-foreground mt-1 text-xs">
                      Software Dept.
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-[#C3002F]" />
                </div>
              </div>

              <div className="rounded border-l-4 border-blue-500 bg-blue-500/10 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-foreground text-sm">
                      Scholarship Application
                    </div>
                    <div className="text-muted-foreground mt-1 text-xs">
                      All Students
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              <div className="rounded border-l-4 border-purple-500 bg-purple-500/10 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-foreground text-sm">Career Fair</div>
                    <div className="text-muted-foreground mt-1 text-xs">
                      3rd-4th Year
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></div>
              Live Sync
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
