import { Calendar, LayoutDashboard, Home, Sparkles } from "lucide-react";

interface DashboardNavigationProps {
  onViewChange: (view: 'landing' | 'dashboard' | 'events') => void;
  currentView: 'landing' | 'dashboard' | 'events';
}

export function DashboardNavigation({ onViewChange, currentView }: DashboardNavigationProps) {
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
            <button
              onClick={() => onViewChange('landing')}
              className={`flex items-center gap-2 transition-colors ${
                currentView === 'landing' 
                  ? 'text-[#C3002F]' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => onViewChange('events')}
              className={`flex items-center gap-2 transition-colors ${
                currentView === 'events' 
                  ? 'text-[#C3002F]' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Events
            </button>
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center gap-2 transition-colors ${
                currentView === 'dashboard' 
                  ? 'text-[#C3002F]' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}