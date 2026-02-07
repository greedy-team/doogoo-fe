import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { X, Plus, Calendar, Filter } from 'lucide-react';

interface FilterConfigurationProps {
  onGenerate: (config: FilterConfig) => void;
}

export interface FilterConfig {
  department: string;
  years: string[];
  keywords: string[];
}

export function FilterConfiguration({ onGenerate }: FilterConfigurationProps) {
  const [department, setDepartment] = useState('');
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const departments = [
    'Software',
    'Computer Engineering',
    'Design',
    'Business Administration',
    'Mechanical Engineering',
    'Architecture',
    'English Literature',
    'Economics',
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleGenerate = () => {
    onGenerate({ department, years: selectedYears, keywords });
  };

  // Mock events for live preview
  const mockEvents = [
    {
      title: 'AI Hackathon Registration',
      dept: 'Software',
      year: 'All',
      keyword: 'Hackathon',
    },
    {
      title: 'Scholarship Application Deadline',
      dept: 'All',
      year: 'All',
      keyword: 'Scholarship',
    },
    {
      title: 'Software Career Fair',
      dept: 'Software',
      year: '3rd Year',
      keyword: 'Career',
    },
    {
      title: 'Capstone Project Showcase',
      dept: 'Software',
      year: '4th Year',
      keyword: 'Project',
    },
    {
      title: 'Design Thinking Workshop',
      dept: 'Design',
      year: 'All',
      keyword: 'Workshop',
    },
  ];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesDept =
      !department || event.dept === department || event.dept === 'All';
    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((y) => event.year === y) ||
      event.year === 'All';
    const matchesKeyword =
      keywords.length === 0 ||
      keywords.some(
        (k) =>
          event.title.toLowerCase().includes(k.toLowerCase()) ||
          event.keyword.toLowerCase().includes(k.toLowerCase()),
      );
    return matchesDept && matchesYear && matchesKeyword;
  });

  return (
    <section id="filter" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#C3002F]/10 px-4 py-2 text-[#C3002F]">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Live Filter Configuration</span>
          </div>
          <h2 className="text-foreground mb-4 text-4xl">
            Configure Your Perfect Calendar
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Select your preferences and watch the live preview update in
            real-time
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card/80 p-8 shadow-lg backdrop-blur">
              <div className="space-y-8">
                {/* Department Selection */}
                <div>
                  <Label className="text-foreground mb-3 block">
                    Department
                  </Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="border-input bg-background">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Selection */}
                <div>
                  <Label className="text-foreground mb-3 block">
                    Year Level (Multi-select)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {years.map((year) => (
                      <Badge
                        key={year}
                        onClick={() => toggleYear(year)}
                        className={`cursor-pointer px-4 py-2 transition-all ${
                          selectedYears.includes(year)
                            ? 'bg-[#C3002F] text-white hover:bg-[#A00025]'
                            : 'border-input bg-background text-foreground hover:bg-accent border'
                        }`}
                      >
                        {year}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <Label className="text-foreground mb-3 block">
                    Interest Keywords
                  </Label>
                  <div className="mb-3 flex gap-2">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      placeholder="e.g., Scholarship, Hackathon, Career"
                      className="border-input bg-background"
                    />
                    <Button
                      onClick={addKeyword}
                      variant="outline"
                      size="icon"
                      className="border-input"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        className="flex items-center gap-1 bg-blue-500/10 px-3 py-1 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
                      >
                        #{keyword}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!department}
                  className="w-full bg-[#C3002F] py-6 text-white hover:bg-[#A00025]"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Generate My Calendar Link
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Preview Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border bg-card sticky top-24 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground">Live Preview</h3>
                <Badge variant="outline" className="text-xs">
                  {filteredEvents.length} events
                </Badge>
              </div>

              <div className="max-h-[500px] space-y-3 overflow-y-auto">
                {filteredEvents.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center text-sm">
                    Select filters to see matching events
                  </div>
                ) : (
                  filteredEvents.map((event, i) => (
                    <div
                      key={i}
                      className="border-border bg-muted/50 rounded-lg border p-3 transition-shadow hover:shadow-md"
                    >
                      <div className="text-foreground mb-1 text-sm">
                        {event.title}
                      </div>
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
