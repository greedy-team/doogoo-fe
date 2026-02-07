import { Card } from './ui/card';
import { Filter, Bell, Settings, CheckCircle2 } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: Filter,
      title: 'No More Information Overload',
      description:
        'See only the events that matter to your department, year, and interests',
    },
    {
      icon: Bell,
      title: 'Never Miss a Deadline',
      description:
        'Get automatic notifications for scholarships, competitions, and important dates',
    },
    {
      icon: Settings,
      title: 'Set and Forget',
      description:
        'One-time setup keeps your calendar synced automatically with Do-Dream',
    },
  ];

  return (
    <section className="from-background to-muted/40 bg-gradient-to-b px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-4xl">
            Why Students Love This Service
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Stop scrolling through hundreds of irrelevant announcements
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
          <Card className="border-0 bg-gradient-to-br from-[#C3002F] to-[#A00025] p-6 text-white md:col-span-2">
            <CheckCircle2 className="mb-3 h-8 w-8 opacity-90" />
            <h4 className="mb-2">Real-time Sync</h4>
            <p className="text-sm text-white/90">
              Events update automatically every hour. No manual refresh needed.
            </p>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/10 p-6">
            <div className="mb-2 text-3xl">🎯</div>
            <h4 className="text-foreground mb-1">Smart Filtering</h4>
            <p className="text-muted-foreground text-sm">
              AI-powered keyword matching
            </p>
          </Card>

          <Card className="border-green-500/20 bg-green-500/10 p-6">
            <div className="mb-2 text-3xl">🔒</div>
            <h4 className="text-foreground mb-1">Privacy First</h4>
            <p className="text-muted-foreground text-sm">No login required</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
