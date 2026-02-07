import { Button } from "./ui/button";
import { Calendar, CheckCircle2 } from "lucide-react";

export function Hero({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl mb-6 text-slate-900">
            Your School Schedule,<br />
            <span className="text-[#C3002F]">Without the Noise.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Filter Sejong "Do-Dream" events by department and interest.<br />
            One-time setup, automatic Google Calendar sync.
          </p>
          <Button 
            onClick={onCTAClick}
            size="lg"
            className="bg-[#C3002F] hover:bg-[#A00025] text-white px-8 py-6 text-lg"
          >
            Create Your Custom Link
          </Button>
        </div>

        {/* Split Screen Mockup */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          {/* Left: Messy List */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-sm text-slate-500">Before</span>
            </div>
            <div className="space-y-3 opacity-70">
              {[
                "전체공지 - 2024학년도 2학기 성적 처리 일정",
                "국제교류처 - 교환학생 설명회 (전체)",
                "소프트웨어학과 - AI 해커톤 참가자 모집",
                "영어영문학과 - 영어말하기대회 안내",
                "공과대학 - 시설 점검 공지 (전체)",
                "학생처 - 장학금 신청 안내 (전체)",
                "디자인학부 - 졸업전시회 일정 공지",
                "체육교육과 - 체육대회 참가 신청",
                "경영학부 - 취업 설명회 (전체)",
                "화학과 - 실험실 안전교육 일정",
                "음악학과 - 정기연주회 안내"
              ].map((text, i) => (
                <div key={i} className="text-sm text-slate-700 bg-slate-50 p-2 rounded">
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Clean Calendar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 relative">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-sm text-slate-500">After</span>
            </div>
            
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#C3002F]" />
                <span className="text-slate-900">My Calendar</span>
              </div>
            </div>

            {/* Filtered Events */}
            <div className="space-y-3">
              <div className="border-l-4 border-[#C3002F] bg-red-50 p-3 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-900">AI Hackathon</div>
                    <div className="text-xs text-slate-500 mt-1">Software Dept.</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#C3002F]" />
                </div>
              </div>
              
              <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-900">Scholarship Application</div>
                    <div className="text-xs text-slate-500 mt-1">All Students</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-3 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-900">Career Fair</div>
                    <div className="text-xs text-slate-500 mt-1">3rd-4th Year</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              Live Sync
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
