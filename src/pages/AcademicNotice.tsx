import { Card } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

interface AcademicNoticeSelectorProps {
  selectedYear: number;
  yearFilterType: 'my-year' | 'all';
  onYearChange: (year: number) => void;
  onYearFilterTypeChange: (type: 'my-year' | 'all') => void;
}

export function AcademicNoticeSelector({
  selectedYear,
  yearFilterType,
  onYearChange,
  onYearFilterTypeChange,
}: AcademicNoticeSelectorProps) {
  const years = [
    { value: 1, label: '1학년' },
    { value: 2, label: '2학년' },
    { value: 3, label: '3학년' },
    { value: 4, label: '4학년' },
  ];

  return (
    <Card className="shadow-sm">
      {/* Mobile & Desktop: Always visible header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-2">
            <GraduationCap className="text-primary h-5 w-5" />
          </div>
          <div>
            <h2 className="text-foreground mb-0.5 text-xl font-semibold">
              학사공지
            </h2>
            <p className="text-muted-foreground text-sm">
              학사 일정 및 공지사항
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-6 pb-6">
        {/* Year Selection for "My Year" filter */}
        {yearFilterType === 'my-year' && (
          <div className="space-y-3">
            <Label className="text-foreground text-sm font-medium">
              학년 선택
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {years.map((year) => (
                <button
                  key={year.value}
                  onClick={() => onYearChange(year.value)}
                  className={`relative rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    selectedYear === year.value
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-accent text-foreground hover:bg-accent/80'
                  } `}
                  style={{ minHeight: '44px' }}
                >
                  {year.label}
                  {selectedYear === year.value && (
                    <CheckCircle2 className="absolute top-1 right-1 h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Type Selection */}
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-medium">
            수신 범위
          </Label>
          <RadioGroup
            value={yearFilterType}
            onValueChange={(value) =>
              onYearFilterTypeChange(value as 'my-year' | 'all')
            }
          >
            <div className="space-y-2">
              <div
                className={`flex cursor-pointer items-start space-x-3 rounded-xl border-2 p-4 transition-colors ${
                  yearFilterType === 'my-year'
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:bg-accent/50'
                } `}
                onClick={() => onYearFilterTypeChange('my-year')}
              >
                <RadioGroupItem
                  value="my-year"
                  id="my-year"
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="my-year"
                    className="cursor-pointer text-base font-medium"
                  >
                    내 학년만
                  </Label>
                  <p className="text-muted-foreground mt-1 text-sm">
                    선택한 학년의 공지만 받습니다
                  </p>
                </div>
              </div>

              <div
                className={`flex cursor-pointer items-start space-x-3 rounded-xl border-2 p-4 transition-colors ${
                  yearFilterType === 'all'
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:bg-accent/50'
                } `}
                onClick={() => onYearFilterTypeChange('all')}
              >
                <RadioGroupItem value="all" id="all" className="mt-0.5" />
                <div className="flex-1">
                  <Label
                    htmlFor="all"
                    className="cursor-pointer text-base font-medium"
                  >
                    전체 학년
                  </Label>
                  <p className="text-muted-foreground mt-1 text-sm">
                    모든 학년의 공지를 받습니다
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}
