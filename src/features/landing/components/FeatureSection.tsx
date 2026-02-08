import { Card } from '../../../components/ui/card';
import { Filter, Bell, Settings, CheckCircle2 } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: Filter,
      title: '정보 과부하는 이제 그만',
      description: '내 학과, 학년, 관심사에 꼭 맞는 핵심 일정만 골라보세요.',
    },
    {
      icon: Bell,
      title: '중요한 기회, 놓치지 마세요',
      description:
        '장학금, 경시대회, 필수 학사일정 마감 전 자동 알림을 드립니다.',
    },
    {
      icon: Settings,
      title: '한 번 설정으로 끝',
      description:
        '최초 1회 등록으로 두드림과 학사일정이 실시간으로 동기화됩니다.',
    },
  ];

  return (
    <section className="from-background to-muted/40 bg-linear-to-b px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-4xl">
            세종대생이 이 서비스를 선택하는 이유
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            수백 개의 불필요한 공지사항을 일일이 확인하느라 시간을 낭비하지
            마세요.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C3002F]/10 transition-colors group-hover:bg-[#C3002F]">
                  <Icon className="h-7 w-7 text-[#C3002F] transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Bento Grid Additional Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Card className="border-0 bg-linear-to-br from-[#C3002F] to-[#A00025] p-6 text-white md:col-span-2">
            <CheckCircle2 className="mb-3 h-8 w-8 opacity-90" />
            <h4 className="mb-2">자동 동기화</h4>
            <p className="text-sm text-white/90">
              주기적으로 일정이 자동으로 업데이트됩니다. 수동으로 새로고침할
              필요가 없습니다.
            </p>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/10 p-6">
            <div className="mb-2 text-3xl">🎯</div>
            <h4 className="text-foreground mb-1">스마트 필터링</h4>
            <p className="text-muted-foreground text-sm">
              키워드 매칭을 통한 맞춤형 일정 추출
            </p>
          </Card>

          <Card className="border-green-500/20 bg-green-500/10 p-6">
            <div className="mb-2 text-3xl">🔒</div>
            <h4 className="text-foreground mb-1">안전한 데이터 관리</h4>
            <p className="text-muted-foreground text-sm">
              학번 기반의 안전한 맞춤형 서비스 제공
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
