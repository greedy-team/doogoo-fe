import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { X, Plus, Calendar, Filter } from "lucide-react";

interface FilterConfigurationProps {
  onGenerate: (config: FilterConfig) => void;
}

export interface FilterConfig {
  department: string;
  years: string[];
  keywords: string[];
}

export function FilterConfiguration({ onGenerate }: FilterConfigurationProps) {
  const [department, setDepartment] = useState("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

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

  const toggleYear = (year: string) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleGenerate = () => {
    onGenerate({ department, years: selectedYears, keywords });
  };

  // Mock events for live preview
  const mockEvents = [
    { title: "AI Hackathon Registration", dept: "Software", year: "All", keyword: "Hackathon" },
    { title: "Scholarship Application Deadline", dept: "All", year: "All", keyword: "Scholarship" },
    { title: "Software Career Fair", dept: "Software", year: "3rd Year", keyword: "Career" },
    { title: "Capstone Project Showcase", dept: "Software", year: "4th Year", keyword: "Project" },
    { title: "Design Thinking Workshop", dept: "Design", year: "All", keyword: "Workshop" }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesDept = !department || event.dept === department || event.dept === "All";
    const matchesYear = selectedYears.length === 0 || selectedYears.some(y => event.year === y) || event.year === "All";
    const matchesKeyword = keywords.length === 0 || keywords.some(k => 
      event.title.toLowerCase().includes(k.toLowerCase()) || event.keyword.toLowerCase().includes(k.toLowerCase())
    );
    return matchesDept && matchesYear && matchesKeyword;
  });

  return (
    <section id="filter" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C3002F]/10 text-[#C3002F] px-4 py-2 rounded-full mb-4">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Live Filter Configuration</span>
          </div>
          <h2 className="text-4xl text-slate-900 mb-4">Configure Your Perfect Calendar</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Select your preferences and watch the live preview update in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/50 backdrop-blur border-slate-200 shadow-lg">
              <div className="space-y-8">
                {/* Department Selection */}
                <div>
                  <Label className="text-slate-900 mb-3 block">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="bg-white border-slate-300">
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
                  <Label className="text-slate-900 mb-3 block">Year Level (Multi-select)</Label>
                  <div className="flex flex-wrap gap-2">
                    {years.map(year => (
                      <Badge
                        key={year}
                        onClick={() => toggleYear(year)}
                        className={`cursor-pointer px-4 py-2 transition-all ${
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

                {/* Keywords */}
                <div>
                  <Label className="text-slate-900 mb-3 block">Interest Keywords</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                      placeholder="e.g., Scholarship, Hackathon, Career"
                      className="bg-white border-slate-300"
                    />
                    <Button
                      onClick={addKeyword}
                      variant="outline"
                      size="icon"
                      className="border-slate-300"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map(keyword => (
                      <Badge
                        key={keyword}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 flex items-center gap-1"
                      >
                        #{keyword}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!department}
                  className="w-full bg-[#C3002F] hover:bg-[#A00025] text-white py-6"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Generate My Calendar Link
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Preview Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white border-slate-200 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900">Live Preview</h3>
                <Badge variant="outline" className="text-xs">
                  {filteredEvents.length} events
                </Badge>
              </div>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    Select filters to see matching events
                  </div>
                ) : (
                  filteredEvents.map((event, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="text-sm text-slate-900 mb-1">{event.title}</div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {event.dept}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.year}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
