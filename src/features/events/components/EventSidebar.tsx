import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Download, Calendar, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Event } from "./EventCard";

interface EventSidebarProps {
  selectedEvents: Event[];
  onRemoveEvent: (id: string) => void;
  onExport: () => void;
}

export function EventSidebar({ selectedEvents, onRemoveEvent, onExport }: EventSidebarProps) {
  const handleExport = () => {
    onExport();
    toast.success("Events exported to your custom ICS!");
  };

  return (
    <div className="sticky top-24">
      <Card className="p-6 bg-white border-slate-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C3002F]" />
            <h3 className="text-slate-900">Selected Events</h3>
          </div>
          <Badge className="bg-[#C3002F]/10 text-[#C3002F]">
            {selectedEvents.length}
          </Badge>
        </div>

        {selectedEvents.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📅</div>
            <p className="text-sm text-slate-500">
              No events selected yet.<br />
              Click the + button on any event to add it!
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 group hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-900 mb-1 line-clamp-2">
                      {event.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                    onClick={() => onRemoveEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={handleExport}
              className="w-full bg-[#C3002F] hover:bg-[#A00025] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Selected to My ICS
            </Button>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                Selected events will be merged into your personalized calendar link
              </p>
            </div>
          </>
        )}
      </Card>

      {/* Integration Link */}
      <Card className="mt-4 p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900 mb-2">
          Looking for the Do-Dream Filter Tool?
        </p>
        <Button
          variant="link"
          className="text-blue-700 hover:text-blue-900 p-0 h-auto"
          onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-dashboard'))}
        >
          Set up automatic filters →
        </Button>
      </Card>
    </div>
  );
}
