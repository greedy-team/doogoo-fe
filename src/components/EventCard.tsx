import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar, MapPin, Plus, Users, Check } from "lucide-react";
import { useState } from "react";

export interface Event {
  id: string;
  title: string;
  category: "Academic" | "Career" | "Social" | "Competition" | "Workshop";
  date: string;
  daysLeft: number;
  location: string;
  department: string;
  isPopular: boolean;
  attendees: number;
  description: string;
  image?: string;
}

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export function EventCard({ event, isSelected, onToggleSelect }: EventCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getCategoryColor = (category: Event["category"]) => {
    const colors = {
      Academic: "bg-red-500",
      Career: "bg-blue-500",
      Social: "bg-green-500",
      Competition: "bg-purple-500",
      Workshop: "bg-orange-500"
    };
    return colors[category];
  };

  const getCategoryBadgeColor = (category: Event["category"]) => {
    const colors = {
      Academic: "bg-red-50 text-red-700 border-red-200",
      Career: "bg-blue-50 text-blue-700 border-blue-200",
      Social: "bg-green-50 text-green-700 border-green-200",
      Competition: "bg-purple-50 text-purple-700 border-purple-200",
      Workshop: "bg-orange-50 text-orange-700 border-orange-200"
    };
    return colors[category];
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200 relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Category Badge */}
      <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs text-white ${getCategoryColor(event.category)}`}>
        {event.category}
      </div>

      {/* Popular Badge */}
      {event.isPopular && (
        <div className="absolute top-3 right-3 z-10 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Users className="w-3 h-3" />
          Popular
        </div>
      )}

      {/* Image or Gradient Background */}
      <div className={`h-40 ${getCategoryColor(event.category)} bg-gradient-to-br relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-lg line-clamp-2">{event.title}</h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Date Ribbon */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 bg-slate-100 rounded-lg p-3 text-center min-w-[60px]">
            <div className="text-xs text-slate-600 uppercase">
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
            </div>
            <div className="text-2xl text-slate-900">
              {new Date(event.date).getDate()}
            </div>
          </div>

          <div className="flex-1">
            <Badge variant="outline" className={getCategoryBadgeColor(event.category)}>
              {event.department}
            </Badge>
            
            {event.daysLeft > 0 && (
              <div className="text-sm text-[#C3002F] mt-2 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {event.daysLeft} days left to apply
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
          <MapPin className="w-4 h-4" />
          {event.location}
        </div>

        {/* Attendees */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Users className="w-4 h-4" />
          {event.attendees} students interested
        </div>

        {/* Quick Action Button */}
        <Button
          onClick={() => onToggleSelect(event.id)}
          className={`w-full transition-all ${
            isSelected
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-[#C3002F] hover:bg-[#A00025] text-white"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Calendar
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add to My Custom Calendar
            </>
          )}
        </Button>
      </div>

      {/* Hover Tooltip */}
      {showTooltip && (
        <div className="absolute inset-0 bg-slate-900/95 p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="text-white text-sm text-center">
            <p className="line-clamp-4">{event.description}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
