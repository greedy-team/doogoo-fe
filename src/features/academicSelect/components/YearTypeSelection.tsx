import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

export default function YearTypeSelection({
  yearFilterType,
  onYearFilterTypeChange,
}: {
  yearFilterType: 'my-year' | 'all';
  onYearFilterTypeChange: (type: 'my-year' | 'all') => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-foreground text-sm font-medium">수신 범위</div>
      <RadioGroup
        value={yearFilterType}
        onValueChange={(value) =>
          onYearFilterTypeChange(value as 'my-year' | 'all')
        }
      >
        <div className="space-y-2">
          <label
            htmlFor="my-year"
            className={`flex cursor-pointer items-start space-x-3 rounded-xl border-2 p-4 transition-colors ${
              yearFilterType === 'my-year'
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:bg-accent/50'
            } `}
          >
            <RadioGroupItem value="my-year" id="my-year" className="mt-0.5" />
            <div className="flex-1">
              <span className="block text-base font-medium">
                내 학년만
              </span>
              <p className="text-muted-foreground mt-1 text-sm">
                선택한 학년의 공지만 받습니다
              </p>
            </div>
          </label>

          <label
            htmlFor="all"
            className={`flex cursor-pointer items-start space-x-3 rounded-xl border-2 p-4 transition-colors ${
              yearFilterType === 'all'
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:bg-accent/50'
            } `}
          >
            <RadioGroupItem value="all" id="all" className="mt-0.5" />
            <div className="flex-1">
              <span className="block text-base font-medium">
                전체 학년
              </span>
              <p className="text-muted-foreground mt-1 text-sm">
                모든 학년의 공지를 받습니다
              </p>
            </div>
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
