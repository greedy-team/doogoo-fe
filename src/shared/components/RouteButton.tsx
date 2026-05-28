import { Button } from '@/components/ui/button';

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

export function NextButton({
  onClick,
  disabled = false,
  text,
}: NextButtonProps) {
  return (
    <Button
      size="lg"
      className="h-14 w-full rounded-lg text-base font-semibold shadow-md"
      onClick={onClick}
      disabled={disabled}
    >
      {text || '다음 단계로'}
    </Button>
  );
}

export function BackButton({
  onClick,
  disabled = false,
  text,
}: NextButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="hover:bg-accent/50 h-12 w-full rounded-lg border font-semibold"
    >
      {text || '이전'}
    </Button>
  );
}

export function SubscribeButton({
  onClick,
  disabled = false,
}: NextButtonProps) {
  return (
    <Button
      size="lg"
      className="h-14 w-full rounded-lg text-base font-semibold shadow-md"
      onClick={onClick}
      disabled={disabled}
    >
      캘린더 구독하기
    </Button>
  );
}
