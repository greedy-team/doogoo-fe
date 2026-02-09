import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Calendar, MapPin, Plus, Users, Check } from 'lucide-react';
import { useState } from 'react';

export interface Event {
  id: string;
  title: string;
  category: 'Academic' | 'Career' | 'Social' | 'Competition' | 'Workshop';
  originalCategory?: string; // 원본 한글 카테고리
  date: string;
  daysLeft: number;
  location: string;
  department: string;
  isPopular?: boolean; // optional:나중에 필요하면 쓸예정
  attendees: number;
  description: string;
  image?: string;
}

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export function EventCard({
  event,
  isSelected,
  onToggleSelect,
}: EventCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getCategoryColor = (category: Event['category']) => {
    const colors = {
      Academic: 'bg-red-500',
      Career: 'bg-blue-500',
      Social: 'bg-green-500',
      Competition: 'bg-purple-500',
      Workshop: 'bg-orange-500',
    };
    return colors[category];
  };

  const getCategoryBadgeColor = (category: Event['category']) => {
    const colors = {
      Academic: 'bg-red-50 text-red-700 border-red-200',
      Career: 'bg-blue-50 text-blue-700 border-blue-200',
      Social: 'bg-green-50 text-green-700 border-green-200',
      Competition: 'bg-purple-50 text-purple-700 border-purple-200',
      Workshop: 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[category];
  };

  return (
    <Card
      className="group border-border bg-card text-card-foreground relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Category Badge */}
      <div
        className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs text-white ${getCategoryColor(event.category)}`}
      >
        {event.category}
      </div>

      {/* Popular Badge */}
      {event.isPopular && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-1 text-xs text-yellow-900">
          <Users className="h-3 w-3" />
          Popular
        </div>
      )}

      {/* Image or Gradient Background */}
      <div
        className={`h-40 ${getCategoryColor(event.category)} relative overflow-hidden bg-gradient-to-br`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute right-3 bottom-3 left-3">
          <h3 className="line-clamp-2 text-lg text-white">{event.title}</h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Date Ribbon */}
        <div className="mb-3 flex items-start gap-3">
          <div className="bg-muted min-w-[60px] flex-shrink-0 rounded-lg p-3 text-center">
            <div className="text-muted-foreground text-xs uppercase">
              {new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
              })}
            </div>
            <div className="text-foreground text-2xl">
              {new Date(event.date).getDate()}
            </div>
          </div>

          <div className="flex-1">
            <Badge
              variant="outline"
              className={getCategoryBadgeColor(event.category)}
            >
              {event.department}
            </Badge>

            {event.daysLeft > 0 && (
              <div className="mt-2 flex items-center gap-1 text-sm text-[#C3002F]">
                <Calendar className="h-4 w-4" />
                {event.daysLeft} days left to apply
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>

        {/* Attendees */}
        <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          {event.attendees} students interested
        </div>

        {/* Quick Action Button */}
        <Button
          onClick={() => onToggleSelect(event.id)}
          className={`w-full transition-all ${
            isSelected
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-[#C3002F] text-white hover:bg-[#A00025]'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Calendar
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add to My Custom Calendar
            </>
          )}
        </Button>
      </div>

      {/* Hover Tooltip */}
      {showTooltip && (
        <div className="bg-foreground/95 pointer-events-none absolute inset-0 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-background text-center text-sm">
            <p className="line-clamp-4">{event.description}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
