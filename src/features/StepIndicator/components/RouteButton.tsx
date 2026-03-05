import { Button } from '@/components/ui/button';

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function NextButton({ onClick, disabled = false }: NextButtonProps) {
  return (
    <Button
      size="lg"
      className="h-14 w-full rounded-2xl text-base font-semibold shadow-md"
      onClick={onClick}
      disabled={disabled}
    >
      다음 단계로
    </Button>
  );
}

export function BackButton({ onClick, disabled = false }: NextButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="hover:bg-accent/50 h-12 w-full border-2 font-semibold"
    >
      이전
    </Button>
  );
}

export function SubscribeButton({ onClick }: NextButtonProps) {
  return (
    <Button
      size="lg"
      className="h-14 w-full rounded-2xl text-base font-semibold shadow-md"
      onClick={onClick}
    >
      캘린더 구독하기
    </Button>
  );
}
