import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Download, Calendar, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Event } from './EventCard';

interface EventSidebarProps {
  selectedEvents: Event[];
  onRemoveEvent: (id: string) => void;
  onExport: () => void;
}

export function EventSidebar({
  selectedEvents,
  onRemoveEvent,
  onExport,
}: EventSidebarProps) {
  const handleExport = () => {
    onExport();
    toast.success('Events exported to your custom ICS!');
  };

  return (
    <div className="sticky top-24">
      <Card className="border-border bg-card text-card-foreground p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#C3002F]" />
            <h3 className="text-foreground">Selected Events</h3>
          </div>
          <Badge className="bg-[#C3002F]/10 text-[#C3002F]">
            {selectedEvents.length}
          </Badge>
        </div>

        {selectedEvents.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mb-2 text-4xl">📅</div>
            <p className="text-muted-foreground text-sm">
              No events selected yet.
              <br />
              Click the + button on any event to add it!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 max-h-[400px] space-y-3 overflow-y-auto">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="group border-border bg-muted/40 hover:bg-muted/60 flex items-start gap-2 rounded-lg border p-3 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-foreground mb-1 line-clamp-2 text-sm">
                      {event.title}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => onRemoveEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={handleExport}
              className="w-full bg-[#C3002F] text-white hover:bg-[#A00025]"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Selected to My ICS
            </Button>

            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-muted-foreground text-center text-xs">
                Selected events will be merged into your personalized calendar
                link
              </p>
            </div>
          </>
        )}
      </Card>

      {/* Integration Link */}
      <Card className="mt-4 border-blue-200/70 bg-blue-50/50 p-4 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
        <p className="mb-2 text-sm">Looking for the Do-Dream Filter Tool?</p>
        <Button
          variant="link"
          className="h-auto p-0 text-blue-700 hover:text-blue-900 dark:text-blue-200 dark:hover:text-blue-100"
          onClick={() =>
            window.dispatchEvent(new CustomEvent('navigate-to-dashboard'))
          }
        >
          Set up automatic filters →
        </Button>
      </Card>
    </div>
  );
}
