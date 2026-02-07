import { Calendar, LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  const handleDashboardClick = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-dashboard'));
  };

  const handleEventsClick = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-events'));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C3002F] rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900">Sejong Calendar Filter</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">
              About
            </a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">
              FAQ
            </a>
            <Button
              onClick={handleEventsClick}
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Browse Events
            </Button>
            <Button
              onClick={handleDashboardClick}
              variant="outline"
              size="sm"
              className="border-[#C3002F] text-[#C3002F] hover:bg-[#C3002F] hover:text-white"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}