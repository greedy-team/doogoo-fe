import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { EventCard, type Event } from "./EventCard";
import { EventSidebar } from "./EventSidebar";
import { Search, Grid3x3, Calendar as CalendarIcon, Sparkles } from "lucide-react";

export function EventBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "calendar">("grid");
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);

  const categories = [
    "All",
    "Academic Calendar",
    "Student Council Events",
    "Club Recruitment",
    "Department Seminars",
    "External Competitions"
  ];

  const mockEvents: Event[] = [
    {
      id: "1",
      title: "AI & Machine Learning Hackathon 2026",
      category: "Competition",
      date: "2026-02-15",
      daysLeft: 9,
      location: "Sejong University Innovation Hall",
      department: "Software Engineering",
      isPopular: true,
      attendees: 142,
      description: "Join us for a 48-hour coding challenge focused on AI and ML solutions. Teams of 3-4 students will compete for prizes and internship opportunities."
    },
    {
      id: "2",
      title: "Spring Semester Scholarship Application",
      category: "Academic",
      date: "2026-02-10",
      daysLeft: 4,
      location: "Online Application",
      department: "Student Affairs",
      isPopular: true,
      attendees: 324,
      description: "Apply for merit-based and need-based scholarships for Spring 2026. Various categories available including academic excellence and community service."
    },
    {
      id: "3",
      title: "Career Fair: Tech Companies Recruiting",
      category: "Career",
      date: "2026-02-12",
      daysLeft: 6,
      location: "Dayang Hall Auditorium",
      department: "Career Center",
      isPopular: true,
      attendees: 256,
      description: "Meet recruiters from top tech companies including Samsung, Naver, Kakao, and international startups. Bring your resume and portfolio."
    },
    {
      id: "4",
      title: "Photography Club Spring Recruitment",
      category: "Social",
      date: "2026-02-14",
      daysLeft: 8,
      location: "Student Union Building",
      department: "Student Clubs",
      isPopular: false,
      attendees: 48,
      description: "Join the Sejong Photography Club! Learn photography techniques, participate in photo walks, and showcase your work in our annual exhibition."
    },
    {
      id: "5",
      title: "Design Thinking Workshop Series",
      category: "Workshop",
      date: "2026-02-18",
      daysLeft: 12,
      location: "Innovation Center Room 301",
      department: "Design Department",
      isPopular: false,
      attendees: 67,
      description: "A 4-week workshop series covering design thinking methodology, user research, prototyping, and usability testing. Open to all majors."
    },
    {
      id: "6",
      title: "International Student Exchange Info Session",
      category: "Academic",
      date: "2026-02-11",
      daysLeft: 5,
      location: "Global Lounge",
      department: "International Office",
      isPopular: true,
      attendees: 189,
      description: "Learn about exchange programs with partner universities in USA, Europe, and Asia. Q&A with current exchange students."
    },
    {
      id: "7",
      title: "Startup Pitch Competition Finals",
      category: "Competition",
      date: "2026-02-20",
      daysLeft: 14,
      location: "Innovation Hall Main Stage",
      department: "Entrepreneurship Center",
      isPopular: false,
      attendees: 93,
      description: "Watch student startups pitch their ideas to venture capitalists and industry experts. First prize: 10 million won seed funding."
    },
    {
      id: "8",
      title: "Korean Culture Festival",
      category: "Social",
      date: "2026-02-16",
      daysLeft: 10,
      location: "University Plaza",
      department: "Student Council",
      isPopular: true,
      attendees: 412,
      description: "Experience traditional Korean culture with performances, food stalls, games, and workshops. Free admission for all students."
    },
    {
      id: "9",
      title: "Graduate School Application Seminar",
      category: "Academic",
      date: "2026-02-13",
      daysLeft: 7,
      location: "Library Seminar Room 2",
      department: "Academic Affairs",
      isPopular: false,
      attendees: 78,
      description: "Guidance on applying to graduate programs in Korea and abroad. Topics include SOP writing, recommendation letters, and funding opportunities."
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || 
                           (activeCategory === "Academic Calendar" && event.category === "Academic") ||
                           (activeCategory === "Student Council Events" && event.category === "Social") ||
                           (activeCategory === "Club Recruitment" && event.department.includes("Club")) ||
                           (activeCategory === "Department Seminars" && event.category === "Workshop") ||
                           (activeCategory === "External Competitions" && event.category === "Competition");
    return matchesSearch && matchesCategory;
  });

  const selectedEvents = mockEvents.filter(event => selectedEventIds.includes(event.id));

  const toggleEventSelection = (id: string) => {
    setSelectedEventIds(prev =>
      prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
    );
  };

  const removeEvent = (id: string) => {
    setSelectedEventIds(prev => prev.filter(eventId => eventId !== id));
  };

  const handleExport = () => {
    // Export logic handled in EventSidebar
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#C3002F]" />
            <h1 className="text-4xl text-slate-900">Discover Events</h1>
          </div>
          <p className="text-slate-600 mb-6">
            Browse and cherry-pick specific events to add to your personalized calendar
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for hackathons, festivals, or seminars..."
              className="pl-12 h-14 text-lg bg-white border-slate-300 shadow-sm"
            />
          </div>

          {/* Category Pills + View Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map((category) => (
                <Badge
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer px-4 py-2 transition-all ${
                    activeCategory === category
                      ? "bg-[#C3002F] text-white hover:bg-[#A00025]"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-[#C3002F] hover:bg-[#A00025]" : ""}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className={viewMode === "calendar" ? "bg-[#C3002F] hover:bg-[#A00025]" : ""}
              >
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Cards Grid */}
          <div className="lg:col-span-2">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-4">🎓</div>
                <h3 className="text-2xl text-slate-900 mb-2">No events found</h3>
                <p className="text-slate-600">
                  Try adjusting your search or category filters
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isSelected={selectedEventIds.includes(event.id)}
                    onToggleSelect={toggleEventSelection}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <EventSidebar
              selectedEvents={selectedEvents}
              onRemoveEvent={removeEvent}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
