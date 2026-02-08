import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { Toaster } from 'sonner';

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Dashboard />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
