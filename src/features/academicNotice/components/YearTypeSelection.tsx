import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function YearTypeSelection({
  yearFilterType,
  onYearFilterTypeChange,
}: {
  yearFilterType: 'my-year' | 'all';
  onYearFilterTypeChange: (type: 'my-year' | 'all') => void;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">수신 범위</Label>
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
            <RadioGroupItem value="my-year" id="my-year" className="mt-0.5" />
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
  );
}
