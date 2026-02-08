import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Separator } from "../../../components/ui/separator";
import {
  CheckCircle2,
  Copy,
  Edit3,
  X,
  Plus,
  Calendar,
  RefreshCw,
  Download,
  Bell,
  Mail,
  TrendingDown,
  Clock,
  Shield
} from "lucide-react";
import { toast } from "sonner";

export function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // User profile
  const [userProfile] = useState({
    name: "김서준",
    department: "Software",
    year: "Final Year",
    avatar: "KS"
  });

  // Active filters
  const [activeKeywords, setActiveKeywords] = useState([
    "Software", "Year4", "Scholarship", "Hackathon", "Career", "Competition"
  ]);
  
  const [mutedKeywords, setMutedKeywords] = useState([
    "Mandatory", "Freshmen", "Attendance"
  ]);

  // Settings
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // Stats
  const [stats] = useState({
    filteredCount: 42,
    lastSynced: "5 mins ago"
  });

  // New keyword inputs
  const [newActiveKeyword, setNewActiveKeyword] = useState("");
  const [newMutedKeyword, setNewMutedKeyword] = useState("");

  // Upcoming events
  const upcomingEvents = [
    { title: "AI Hackathon Registration Deadline", date: "Feb 8", tag: "Hackathon" },
    { title: "Spring Semester Scholarship Application", date: "Feb 10", tag: "Scholarship" },
    { title: "Software Career Fair", date: "Feb 12", tag: "Career" },
    { title: "Capstone Project Showcase", date: "Feb 14", tag: "Software" }
  ];

  const calendarURL = "https://sejong-calendar.app/ics/ZGVwdD1Tb2Z0d2FyZSZ5ZWFycz0...";

  const addActiveKeyword = () => {
    if (newActiveKeyword.trim() && !activeKeywords.includes(newActiveKeyword.trim())) {
      setActiveKeywords([...activeKeywords, newActiveKeyword.trim()]);
      setNewActiveKeyword("");
    }
  };

  const addMutedKeyword = () => {
    if (newMutedKeyword.trim() && !mutedKeywords.includes(newMutedKeyword.trim())) {
      setMutedKeywords([...mutedKeywords, newMutedKeyword.trim()]);
      setNewMutedKeyword("");
    }
  };

  const removeActiveKeyword = (keyword: string) => {
    setActiveKeywords(activeKeywords.filter(k => k !== keyword));
  };

  const removeMutedKeyword = (keyword: string) => {
    setMutedKeywords(mutedKeywords.filter(k => k !== keyword));
  };

  const copyURL = () => {
    navigator.clipboard.writeText(calendarURL);
    toast.success("Calendar URL copied to clipboard!");
  };

  const handleSaveSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsEditing(false);
      toast.success("Filters updated and synced!");
    }, 1500);
  };

  const refreshMetadata = () => {
    toast.success("Calendar metadata refreshed!");
  };

  const downloadStatic = () => {
    toast.success("Static .ics file downloaded!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - User Context */}
        <div className="mb-8">
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C3002F] rounded-full flex items-center justify-center text-white">
                  {userProfile.avatar}
                </div>
                <div>
                  <h2 className="text-slate-900">{userProfile.name}</h2>
                  <p className="text-sm text-slate-600">
                    {userProfile.year} {userProfile.department} Student
                  </p>
                </div>
              </div>
              
              <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Active Sync: On
                </div>
              </Badge>
            </div>
          </Card>
        </div>

        {/* Active Calendar Card */}
        <Card className="mb-8 bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#C3002F]" />
                <h3 className="text-slate-900">Active Filter Profile</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="text-slate-600 hover:text-slate-900"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Filters"}
              </Button>
            </div>

            {/* Current Active Tags */}
            <div className="mb-6">
              <Label className="text-sm text-slate-600 mb-3 block">Active Keywords</Label>
              <div className="flex flex-wrap gap-2">
                {activeKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    className="bg-[#C3002F]/10 text-[#C3002F] hover:bg-[#C3002F]/20 px-3 py-1.5 flex items-center gap-1.5"
                  >
                    #{keyword}
                    {isEditing && (
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-[#A00025]"
                        onClick={() => removeActiveKeyword(keyword)}
                      />
                    )}
                  </Badge>
                ))}
                
                {isEditing && (
                  <div className="flex gap-2 items-center">
                    <Input
                      value={newActiveKeyword}
                      onChange={(e) => setNewActiveKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addActiveKeyword()}
                      placeholder="Add keyword"
                      className="w-32 h-8 text-sm bg-white border-slate-300"
                    />
                    <Button
                      onClick={addActiveKeyword}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Muted Keywords (shown when editing) */}
            {isEditing && (
              <div className="mb-6 pb-6 border-b border-slate-200">
                <Label className="text-sm text-slate-600 mb-3 block">Muted Keywords (Exclusions)</Label>
                <div className="flex flex-wrap gap-2">
                  {mutedKeywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="bg-slate-100 text-slate-700 border-slate-300 px-3 py-1.5 flex items-center gap-1.5"
                    >
                      {keyword}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-slate-900"
                        onClick={() => removeMutedKeyword(keyword)}
                      />
                    </Badge>
                  ))}
                  
                  <div className="flex gap-2 items-center">
                    <Input
                      value={newMutedKeyword}
                      onChange={(e) => setNewMutedKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addMutedKeyword()}
                      placeholder="Exclude keyword"
                      className="w-32 h-8 text-sm bg-white border-slate-300"
                    />
                    <Button
                      onClick={addMutedKeyword}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Events containing these keywords will be automatically filtered out
                </p>
              </div>
            )}

            {/* Save & Sync Button (when editing) */}
            {isEditing && (
              <Button
                onClick={handleSaveSync}
                disabled={isSyncing}
                className="w-full bg-[#C3002F] hover:bg-[#A00025] text-white mb-6"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Syncing to Cloud...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Save & Sync Filters
                  </>
                )}
              </Button>
            )}

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                Last Synced: {stats.lastSynced}
              </div>
              <Button
                onClick={copyURL}
                variant="outline"
                size="sm"
                className="border-slate-300"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Feed URL
              </Button>
            </div>
          </div>
        </Card>

        {/* Advanced Feed Settings */}
        <Card className="mb-8 bg-white border-slate-200 shadow-sm">
          <div className="p-6">
            <h3 className="text-slate-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-600" />
              Advanced Settings
            </h3>

            <div className="space-y-6">
              {/* Notification Toggles */}
              <div>
                <Label className="text-sm text-slate-600 mb-4 block">Notifications</Label>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <div>
                        <div className="text-sm text-slate-900">Email alerts for new matches</div>
                        <div className="text-xs text-slate-500">Get notified when new events match your filters</div>
                      </div>
                    </div>
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-slate-400" />
                      <div>
                        <div className="text-sm text-slate-900">Push notifications for deadline changes</div>
                        <div className="text-xs text-slate-500">Receive alerts when event dates are modified</div>
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Export Options */}
              <div>
                <Label className="text-sm text-slate-600 mb-4 block">Troubleshooting & Export</Label>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={refreshMetadata}
                    variant="outline"
                    size="sm"
                    className="border-slate-300"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Metadata
                  </Button>
                  
                  <Button
                    onClick={downloadStatic}
                    variant="outline"
                    size="sm"
                    className="border-slate-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Static .ics
                  </Button>
                </div>
                
                <p className="text-xs text-slate-500 mt-3">
                  Use "Refresh" if events aren't syncing properly. Download a one-time .ics file for offline use.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Analytics Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Next 7 Days Preview */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#C3002F]" />
                <h3 className="text-slate-900">Next 7 Days</h3>
              </div>
              
              <div className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">{event.title}</div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {event.date}
                        </Badge>
                        <Badge className="text-xs bg-[#C3002F]/10 text-[#C3002F]">
                          #{event.tag}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="link" className="w-full mt-4 text-[#C3002F] p-0">
                View All Upcoming Events →
              </Button>
            </div>
          </Card>

          {/* Filtered Out Count */}
          <Card className="bg-gradient-to-br from-[#C3002F] to-[#A00025] text-white border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5" />
                <h3>Impact This Month</h3>
              </div>
              
              <div className="mb-4">
                <div className="text-5xl mb-2">{stats.filteredCount}</div>
                <p className="text-white/90">irrelevant events filtered out</p>
              </div>
              
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm text-white/90">
                  We've kept your calendar clean by hiding events that don't match your interests.
                </p>
              </div>
              
              <div className="mt-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-xs text-white/80 mb-1">Filter Efficiency</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '87%' }}></div>
                  </div>
                  <div className="text-sm">87%</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
