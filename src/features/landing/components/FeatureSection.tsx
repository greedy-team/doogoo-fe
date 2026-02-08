import { Card } from "../../../components/ui/card";
import { Filter, Bell, Settings, CheckCircle2 } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: Filter,
      title: "No More Information Overload",
      description: "See only the events that matter to your department, year, and interests"
    },
    {
      icon: Bell,
      title: "Never Miss a Deadline",
      description: "Get automatic notifications for scholarships, competitions, and important dates"
    },
    {
      icon: Settings,
      title: "Set and Forget",
      description: "One-time setup keeps your calendar synced automatically with Do-Dream"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-slate-900 mb-4">Why Students Love This Service</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stop scrolling through hundreds of irrelevant announcements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-white hover:shadow-xl transition-all border-slate-200 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#C3002F]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#C3002F] transition-colors">
                  <Icon className="w-7 h-7 text-[#C3002F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Bento Grid Additional Features */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="md:col-span-2 p-6 bg-gradient-to-br from-[#C3002F] to-[#A00025] text-white border-0">
            <CheckCircle2 className="w-8 h-8 mb-3 opacity-90" />
            <h4 className="mb-2">Real-time Sync</h4>
            <p className="text-white/90 text-sm">
              Events update automatically every hour. No manual refresh needed.
            </p>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="text-slate-900 mb-1">Smart Filtering</h4>
            <p className="text-slate-600 text-sm">
              AI-powered keyword matching
            </p>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="text-slate-900 mb-1">Privacy First</h4>
            <p className="text-slate-600 text-sm">
              No login required
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
