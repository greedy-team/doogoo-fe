import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Calendar, CheckCircle2, Copy, Grid3x3, List, Calendar as CalendarIcon, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { EventCard } from "../../events/components/EventCard";
import { upcomingEvents } from "../data/mockEvents";

export interface FilterConfig {
  department: string;
  years: string[];
  keywords: string[];
}

export function CalendarFilter() {
  // Filter states
  const [department, setDepartment] = useState("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  // View mode state
  const [viewMode, setViewMode] = useState<"grid" | "list" | "calendar">("grid");
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);

  // Modal state
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState<FilterConfig | null>(null);
  const [copied, setCopied] = useState(false);


  const departmentsByCollege = [
    {
      college: "인문과학대학",
      departments: [
        "국어국문학과",
        "국제학부 영어데이터융합전공",
        "국제학부 국제일본학전공",
        "국제학부 중국통상학전공",
        "역사학과",
        "교육학과",
        "글로벌인재학부 한국언어문화전공",
        "글로벌인재학부 국제통상전공",
        "글로벌인재학부 국제협력전공"
      ]
    },
    {
      college: "사회과학대학",
      departments: [
        "행정학과",
        "미디어커뮤니케이션학과",
        "법학과"
      ]
    },
    {
      college: "경영경제대학",
      departments: [
        "경영학부",
        "경제학과"
      ]
    },
    {
      college: "호텔관광대학",
      departments: [
        "호텔관광외식경영학부 호텔관광경영학전공",
        "호텔관광외식경영학부 외식경영학전공",
        "호텔외식관광프랜차이즈경영학과",
        "조리서비스경영학과"
      ]
    },
    {
      college: "자연과학대학",
      departments: [
        "수학통계학과",
        "물리천문학과",
        "화학과"
      ]
    },
    {
      college: "생명과학대학",
      departments: [
        "생명시스템학부 식품생명공학전공",
        "생명시스템학부 바이오융합공학전공",
        "생명시스템학부 바이오산업자원공학전공",
        "스마트생명산업융합학과"
      ]
    },
    {
      college: "인공지능융합대학",
      departments: [
        "AI융합전자공학과",
        "반도체시스템공학과",
        "컴퓨터공학과",
        "정보보호학과",
        "양자지능정보학과",
        "창의소프트학부 디자인이노베이션전공",
        "창의소프트학부 만화애니메이션텍전공",
        "사이버국방학과",
        "국방AI로봇융합공학과",
        "인공지능데이터사이언스학과",
        "AI로봇학과",
        "지능정보융합학과",
        "콘텐츠소프트웨어학과"
      ]
    },
    {
      college: "공과대학",
      departments: [
        "건축공학과",
        "건축학과",
        "건설환경공학과",
        "환경융합공학과",
        "에너지자원공학과",
        "기계공학과",
        "우주항공시스템공학부 우주항공공학전공",
        "우주항공시스템공학부 항공시스템공학전공",
        "우주항공시스템공학부 지능형드론융합전공",
        "나노신소재공학과",
        "양자원자력공학과",
        "국방AI융합시스템공학과"
      ]
    },
    {
      college: "예체능대학",
      departments: [
        "회화과",
        "패션디자인학과",
        "음악과",
        "체육학과",
        "무용과",
        "영화예술학과"
      ]
    },
    {
      college: "대양휴머니티칼리지",
      departments: [
        "자유전공학부"
      ]
    }
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  // 학사공지 키워드
  const academicKeywords = [
    "수강신청",
    "성적/시험",
    "등록/휴복학",
    "학사일정",
    "공휴일"
  ];

  // 두드림 키워드
  const doDreamKeywords = [
    "예체능/워크샵",
    "봉사/인공지능",
    "학술/포럼",
    "학습/IT"
  ];

  const toggleYear = (year: string) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const toggleKeyword = (keyword: string) => {
    setKeywords(prev =>
      prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]
    );
  };

  const handleGenerate = () => {
    const config = { department, years: selectedYears, keywords };
    setGeneratedConfig(config);
    setShowOutputModal(true);
  };

  // 테스트용 공개 ICS URL (미국 공휴일 - OfficeHolidays.com)
  // - 세종대 ics는 ical-signin속성으로 인하여 외부 캘린더가 구독이 불가능하여 대체 ics사용

  const url = "https://www.officeholidays.com/ics/usa";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // iOS/Mac Calendar (webcal)
  const addToAppleCalendar = () => {
    const webcalUrl = url.replace(/^https?:\/\//, 'webcal://');
    //webcal 형식으로 대체하여 ios가 자동으로 반응하도록 함
    window.location.href = webcalUrl;
    toast.success("Opening Calendar app...");
  };

  // Google Calendar (웹 경유) - 자동 구독 시도
  const addToGoogleCalendar = () => {
    // webcal 프로토콜로 변환
    const webcalUrl = url.replace(/^https?:\/\//, 'webcal://');
    const googleUrl = `https://www.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`;
    //참조-encodeURIComponent은 특수문자 인코딩을 위한 함수이다
    window.open(googleUrl, '_blank');
    toast.info("Opening Google Calendar...");
  };

  // Outlook Calendar (webcal 프로토콜로 데스크톱 앱 직접 열기)
  const addToOutlookCalendar = () => {
    // webcal 프로토콜 사용 - Outlook 데스크톱 앱이 설치되어 있으면 자동으로 구독 모달 표시, outLook은 웹 경유 막힘
    // =>최종적으로 그냥 os기본 캘린더를 사용하는 방식이아 ios와 같은코드,, 개선및 결정필요
    const webcalUrl = url.replace(/^https?:\/\//, 'webcal://');
    window.location.href = webcalUrl;
    toast.info("Opening Outlook Calendar app...");
  };

  // .ics 파일 다운로드
  const downloadICSFile = () => {
    // 실제 다운로드 구현 (나중에) 근데 적용해도 일회용임,, 유저가 직접 추가해야함
    window.open(url, '_blank');
    toast.success("Downloading .ics file...");
  };

  const toggleEventSelection = (id: string) => {
    setSelectedEventIds(prev =>
      prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
    );
  };

  // 키워드 매칭 로직 - 원본 카테고리와 직접 비교
  const matchesKeyword = (event: typeof upcomingEvents[0], keyword: string): boolean => {
    return event.originalCategory === keyword;
  };

  // 실제 이벤트 데이터 사용
  const filteredEvents = upcomingEvents.filter(event => {
    const matchesDept = !department || event.department === department || event.department === "All Departments";
    const matchesKeywords = keywords.length === 0 || keywords.some(k => matchesKeyword(event, k));
    return matchesDept && matchesKeywords;
  });

  return (
    <section id="filter" className="py-2 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <Card className="p-4 bg-white/50 backdrop-blur border-slate-200 shadow-lg">
          {/* 1. Filters - Clean Layout */}
          <div className="space-y-3 mb-3">
            {/* Department & Year - First row with spacing */}
            <div className="flex items-start gap-8">
              {/* Department */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-slate-900 text-xs font-medium">Department</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Badge
                      className={`cursor-pointer px-3 py-1.5 text-xs transition-all inline-flex items-center gap-2 ${
                        department
                          ? "bg-[#C3002F] text-white hover:bg-[#A00025]"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {department || "학과 선택"}
                      <ChevronsUpDown className="h-3 w-3" />
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent className="w-[800px] p-4" align="start">
                    <div className="max-h-96 overflow-y-auto space-y-4">
                      {departmentsByCollege.map(({ college, departments: depts }) => (
                        <div key={college}>
                          <div className="text-xs font-semibold text-slate-600 mb-2 sticky top-0 bg-white py-1">
                            {college}
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {depts.map(dept => (
                              <Badge
                                key={dept}
                                onClick={() => setDepartment(dept)}
                                className={`cursor-pointer px-3 py-2 text-xs transition-all justify-center text-center whitespace-normal leading-tight min-h-[2rem] ${
                                  department === dept
                                    ? "bg-[#C3002F] text-white hover:bg-[#A00025]"
                                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                                }`}
                              >
                                {dept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Year Selection */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-slate-900 text-xs font-medium">Year Level</Label>
                <div className="flex flex-wrap gap-2">
                  {years.map(year => (
                    <Badge
                      key={year}
                      onClick={() => toggleYear(year)}
                      className={`cursor-pointer px-3 py-1.5 text-xs transition-all ${
                        selectedYears.includes(year)
                          ? "bg-[#C3002F] text-white hover:bg-[#A00025]"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {year}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Keywords - Second row, full width */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-900 text-xs font-medium">Keywords</Label>
              <div className="flex flex-wrap gap-3 items-center">
                {/* 학사공지 키워드 */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">학사공지</span>
                  <div className="flex flex-wrap gap-2">
                    {academicKeywords.map(keyword => (
                      <Badge
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`cursor-pointer px-3 py-1.5 text-xs transition-all ${
                          keywords.includes(keyword)
                            ? "bg-[#C3002F] text-white hover:bg-[#A00025]"
                            : "bg-white text-slate-700 border border-red-200 hover:bg-red-50"
                        }`}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="w-px h-6 bg-slate-300" />

                {/* 두드림 키워드 */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">두드림</span>
                  <div className="flex flex-wrap gap-2">
                    {doDreamKeywords.map(keyword => (
                      <Badge
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`cursor-pointer px-3 py-1.5 text-xs transition-all ${
                          keywords.includes(keyword)
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-white text-slate-700 border border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button - Third row */}
            <Button
              onClick={handleGenerate}
              disabled={!department}
              className="w-full bg-[#C3002F] hover:bg-[#A00025] text-white h-10 font-medium text-sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Generate My Calendar Link
            </Button>
          </div>

          {/* 3. Event Preview with View Toggle */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-900 font-medium">Preview</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {filteredEvents.length} events
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`h-8 w-8 p-0 ${viewMode === "grid" ? "bg-[#C3002F] hover:bg-[#A00025]" : ""}`}
                    title="Grid View"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-[#C3002F] hover:bg-[#A00025]" : ""}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className={`h-8 w-8 p-0 ${viewMode === "calendar" ? "bg-[#C3002F] hover:bg-[#A00025]" : ""}`}
                    title="Calendar View"
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              /* Grid View - EventCard */
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-slate-500 text-sm">
                    Select filters to see matching events
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isSelected={selectedEventIds.includes(event.id)}
                      onToggleSelect={toggleEventSelection}
                    />
                  ))
                )}
              </div>
            ) : viewMode === "list" ? (
              /* List View - Compact Cards */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-[600px] overflow-y-auto pr-2">
                {filteredEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-slate-500 text-sm">
                    Select filters to see matching events
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => toggleEventSelection(event.id)}
                      className={`p-3 bg-white border rounded-lg hover:shadow-md transition-all cursor-pointer ${
                        selectedEventIds.includes(event.id)
                          ? "border-green-500 bg-green-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-sm text-slate-900 mb-2 line-clamp-2 font-medium">
                        {event.title}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {event.department}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      {selectedEventIds.includes(event.id) && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="w-3 h-3" />
                          Added
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* Calendar View - Coming Soon */
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <h4 className="text-lg font-medium text-slate-900 mb-2">Calendar View</h4>
                <p className="text-slate-600 text-sm">
                  Coming soon! Calendar view will be available in the next update.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* 4. Output Modal */}
      <Dialog open={showOutputModal} onOpenChange={setShowOutputModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Your Calendar Link is Ready!</DialogTitle>
                <DialogDescription>
                  Add this URL to your calendar app for automatic syncing
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Configuration Summary */}
          {generatedConfig && (
            <div className="mb-4 p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-2">Your Configuration:</div>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium text-slate-900">Department:</span> {generatedConfig.department}</div>
                <div><span className="font-medium text-slate-900">Years:</span> {generatedConfig.years.join(", ") || "All"}</div>
                <div><span className="font-medium text-slate-900">Keywords:</span> {generatedConfig.keywords.join(", ") || "None"}</div>
              </div>
            </div>
          )}

          {/* Calendar Selection */}
          <div className="mb-4">
            <Label className="text-slate-900 mb-3 block text-sm font-medium">
              어떤 캘린더에 추가하시겠습니까?
            </Label>

            {/* Calendar Buttons Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* iOS/Mac Calendar */}
              <Button
                onClick={addToAppleCalendar}
                variant="outline"
                className="h-auto py-3 flex-col items-start hover:bg-slate-50"
              >
                <div className="text-lg mb-1">📱</div>
                <div className="text-sm font-semibold">iOS/Mac</div>
                <div className="text-xs text-slate-500">Apple Calendar</div>
              </Button>

              {/* Google Calendar */}
              <Button
                onClick={addToGoogleCalendar}
                variant="outline"
                className="h-auto py-3 flex-col items-start hover:bg-slate-50"
              >
                <div className="text-lg mb-1">🌐</div>
                <div className="text-sm font-semibold">Google</div>
                <div className="text-xs text-slate-500">All devices</div>
              </Button>

              {/* Outlook Calendar */}
              <Button
                onClick={addToOutlookCalendar}
                variant="outline"
                className="h-auto py-3 flex-col items-start hover:bg-slate-50"
              >
                <div className="text-lg mb-1">📧</div>
                <div className="text-sm font-semibold">Outlook</div>
                <div className="text-xs text-slate-500">Microsoft</div>
              </Button>

              {/* Download .ics */}
              <Button
                onClick={downloadICSFile}
                variant="outline"
                className="h-auto py-3 flex-col items-start hover:bg-slate-50"
              >
                <div className="text-lg mb-1">💾</div>
                <div className="text-sm font-semibold">Download</div>
                <div className="text-xs text-slate-500">.ics file</div>
              </Button>
            </div>
          </div>

          {/* Secondary: Copy URL */}
          <div className="mb-4">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full border-slate-300"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL
                </>
              )}
            </Button>
          </div>

          {/* Status Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Connected to Sejong Do-Dream: Syncing Live
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
