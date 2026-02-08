import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Calendar, CheckCircle2, Copy, Download, Grid3x3, List, Calendar as CalendarIcon } from "lucide-react";
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

  const departments = [
    "Software",
    "Computer Engineering",
    "Design",
    "Business Administration",
    "Mechanical Engineering",
    "Architecture",
    "English Literature",
    "Economics"
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

  // 두드림 카테고리 5 (전공역량강화) 임시사용
  const url = "https://do.sejong.ac.kr/ko/module/eco/ical-signin/category/5";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadICS = () => {
    toast.success("ICS file downloaded!");
    // Mock download functionality
  };

  // webcal:// 프로토콜로 변환하여 시스템 캘린더 자동 실행
  const addToCalendar = () => {
    // HTTPS URL을 webcal:// 프로토콜로 변환-정규식 이용
    const webcalUrl = url.replace(/^https?:\/\//, 'webcal://');

    // iOS/Mac 감지
    const isAppleDevice = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);

    if (isAppleDevice) {
      // Apple 기기: webcal 프로토콜로 시스템 캘린더 자동 실행
      window.location.href = webcalUrl;
      toast.success("Opening Calendar app...");
    } else {
      // 다른 기기: 웹경유하여 추가예정 
    }
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
        <Card className="p-5 py-6 px-4 bg-white/50 backdrop-blur border-slate-200 shadow-lg">
          {/* 1. Filters - Efficient Layout */}
          <div className="space-y-3 mb-2">
            {/* Department & Year - Fixed items in one row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <Label className="text-slate-900 mb-2 block text-sm font-medium">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="bg-white border-slate-300 h-10">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year Selection */}
              <div>
                <Label className="text-slate-900 mb-2 block text-sm font-medium">Year Level (Multi-select)</Label>
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

            {/* Keywords - Flexible item with full width */}
            <div>
              <Label className="text-slate-900 mb-2 block text-sm font-medium">Interest Keywords (Multi-select)</Label>

              <div className="space-y-2">
                {/* 학사공지 키워드 */}
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 font-medium whitespace-nowrap">학사공지</div>
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

                {/* 두드림 키워드 */}
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 font-medium whitespace-nowrap">두드림</div>
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
          </div>

          {/* 2. Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!department}
            className="w-full bg-[#C3002F] hover:bg-[#A00025] text-white h-11 mb-3 font-medium"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Generate My Calendar Link
          </Button>

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

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            {/* Add to Calendar (webcal) */}
            <Button
              onClick={addToCalendar}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-semibold"
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              Add to My Calendar Now
            </Button>

            {/* Secondary: Copy & Download */}
            <div className="flex gap-3">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex-1 border-slate-300"
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

              <Button
                onClick={downloadICS}
                variant="outline"
                className="flex-1 border-slate-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download .ics
              </Button>
            </div>
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
