import { HelpCircle } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

export default function HowToInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">도움말</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>두구두구 사용 방법</DialogTitle>
          <DialogDescription className="space-y-3 pt-4">
            <p>
              <strong>
                1. 학사정보 또는 두드림 중 저장하고 싶은 항목을 선택해주세요.
              </strong>
              <br />
              캘린더에 추가하고 싶은 항목을 선택해주세요. (중복 선택 가능)
            </p>
            <p>
              <strong>2. 학년 및 전공 선택</strong>
              <br />
              현재 학년과 전공을 선택하여 관련된 학사일정을 받으세요.
            </p>
            <p>
              <strong>3. 두드림 관심사 선택</strong>
              <br />
              두드림에서 관심 있는 카테고리를 활성화하세요. 선택한 행사만
              동기화됩니다.
            </p>
            <p>
              <strong>4. 미리보기 및 구독</strong>
              <br />
              미리보기에서 추가될 행사를 확인하세요. 그 다음 "캘린더 구독하기"를
              클릭하여 자동 동기화하거나, .ics 파일을 다운로드하세요.
            </p>
            <p className="text-muted-foreground pt-2 text-sm">
              로그인이 필요 없으며, 설정은 기기에 저장됩니다.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
