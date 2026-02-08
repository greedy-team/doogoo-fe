import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Separator } from '../../../components/ui/separator';
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
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';

export function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // User profile
  const [userProfile] = useState({
    name: '김서준',
    department: 'Software',
    year: 'Final Year',
    avatar: 'KS',
  });

  // Active filters
  const [activeKeywords, setActiveKeywords] = useState([
    'Software',
    'Year4',
    'Scholarship',
    'Hackathon',
    'Career',
    'Competition',
  ]);

  const [mutedKeywords, setMutedKeywords] = useState([
    'Mandatory',
    'Freshmen',
    'Attendance',
  ]);

  // Settings
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // Stats
  const [stats] = useState({
    filteredCount: 42,
    lastSynced: '5 mins ago',
  });

  // New keyword inputs
  const [newActiveKeyword, setNewActiveKeyword] = useState('');
  const [newMutedKeyword, setNewMutedKeyword] = useState('');

  // Upcoming events
  const upcomingEvents = [
    {
      title: 'AI Hackathon Registration Deadline',
      date: 'Feb 8',
      tag: 'Hackathon',
    },
    {
      title: 'Spring Semester Scholarship Application',
      date: 'Feb 10',
      tag: 'Scholarship',
    },
    { title: 'Software Career Fair', date: 'Feb 12', tag: 'Career' },
    { title: 'Capstone Project Showcase', date: 'Feb 14', tag: 'Software' },
  ];

  const calendarURL =
    'https://sejong-calendar.app/ics/ZGVwdD1Tb2Z0d2FyZSZ5ZWFycz0...';

  const addActiveKeyword = () => {
    if (
      newActiveKeyword.trim() &&
      !activeKeywords.includes(newActiveKeyword.trim())
    ) {
      setActiveKeywords([...activeKeywords, newActiveKeyword.trim()]);
      setNewActiveKeyword('');
    }
  };

  const addMutedKeyword = () => {
    if (
      newMutedKeyword.trim() &&
      !mutedKeywords.includes(newMutedKeyword.trim())
    ) {
      setMutedKeywords([...mutedKeywords, newMutedKeyword.trim()]);
      setNewMutedKeyword('');
    }
  };

  const removeActiveKeyword = (keyword: string) => {
    setActiveKeywords(activeKeywords.filter((k) => k !== keyword));
  };

  const removeMutedKeyword = (keyword: string) => {
    setMutedKeywords(mutedKeywords.filter((k) => k !== keyword));
  };

  const copyURL = () => {
    navigator.clipboard.writeText(calendarURL);
    toast.success('Calendar URL copied to clipboard!');
  };

  const handleSaveSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsEditing(false);
      toast.success('Filters updated and synced!');
    }, 1500);
  };

  const refreshMetadata = () => {
    toast.success('Calendar metadata refreshed!');
  };

  const downloadStatic = () => {
    toast.success('Static .ics file downloaded!');
  };

  return (
    <div className="from-background to-muted/40 min-h-screen bg-gradient-to-b py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header - User Context */}
        <div className="mb-8">
          <Card className="border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C3002F] text-white">
                  {userProfile.avatar}
                </div>
                <div>
                  <h2 className="text-foreground">{userProfile.name}</h2>
                  <p className="text-muted-foreground text-sm">
                    {userProfile.year} {userProfile.department} Student
                  </p>
                </div>
              </div>

              <Badge className="border-green-500/20 bg-green-500/10 px-4 py-2 text-green-700 hover:bg-green-500/20 dark:text-green-400">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                  Active Sync: On
                </div>
              </Badge>
            </div>
          </Card>
        </div>

        {/* Active Calendar Card */}
        <Card className="border-border from-card to-muted/40 mb-8 bg-gradient-to-br shadow-lg">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#C3002F]" />
                <h3 className="text-foreground">Active Filter Profile</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Edit3 className="mr-2 h-4 w-4" />
                {isEditing ? 'Cancel' : 'Edit Filters'}
              </Button>
            </div>

            {/* Current Active Tags */}
            <div className="mb-6">
              <Label className="text-muted-foreground mb-3 block text-sm">
                Active Keywords
              </Label>
              <div className="flex flex-wrap gap-2">
                {activeKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    className="flex items-center gap-1.5 bg-[#C3002F]/10 px-3 py-1.5 text-[#C3002F] hover:bg-[#C3002F]/20"
                  >
                    #{keyword}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-[#A00025]"
                        onClick={() => removeActiveKeyword(keyword)}
                      />
                    )}
                  </Badge>
                ))}

                {isEditing && (
                  <div className="flex items-center gap-2">
                    <Input
                      value={newActiveKeyword}
                      onChange={(e) => setNewActiveKeyword(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && addActiveKeyword()
                      }
                      placeholder="Add keyword"
                      className="border-input bg-background h-8 w-32 text-sm"
                    />
                    <Button
                      onClick={addActiveKeyword}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Muted Keywords (shown when editing) */}
            {isEditing && (
              <div className="border-border mb-6 border-b pb-6">
                <Label className="text-muted-foreground mb-3 block text-sm">
                  Muted Keywords (Exclusions)
                </Label>
                <div className="flex flex-wrap gap-2">
                  {mutedKeywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="border-input bg-muted/50 text-foreground flex items-center gap-1.5 px-3 py-1.5"
                    >
                      {keyword}
                      <X
                        className="hover:text-foreground h-3 w-3 cursor-pointer"
                        onClick={() => removeMutedKeyword(keyword)}
                      />
                    </Badge>
                  ))}

                  <div className="flex items-center gap-2">
                    <Input
                      value={newMutedKeyword}
                      onChange={(e) => setNewMutedKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addMutedKeyword()}
                      placeholder="Exclude keyword"
                      className="border-input bg-background h-8 w-32 text-sm"
                    />
                    <Button
                      onClick={addMutedKeyword}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  Events containing these keywords will be automatically
                  filtered out
                </p>
              </div>
            )}

            {/* Save & Sync Button (when editing) */}
            {isEditing && (
              <Button
                onClick={handleSaveSync}
                disabled={isSyncing}
                className="mb-6 w-full bg-[#C3002F] text-white hover:bg-[#A00025]"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Syncing to Cloud...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Save & Sync Filters
                  </>
                )}
              </Button>
            )}

            {/* Quick Actions */}
            <div className="border-border flex items-center justify-between border-t pt-4">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Last Synced: {stats.lastSynced}
              </div>
              <Button
                onClick={copyURL}
                variant="outline"
                size="sm"
                className="border-input"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Feed URL
              </Button>
            </div>
          </div>
        </Card>

        {/* Advanced Feed Settings */}
        <Card className="border-border bg-card mb-8 shadow-sm">
          <div className="p-6">
            <h3 className="text-foreground mb-6 flex items-center gap-2">
              <Shield className="text-muted-foreground h-5 w-5" />
              Advanced Settings
            </h3>

            <div className="space-y-6">
              {/* Notification Toggles */}
              <div>
                <Label className="text-muted-foreground mb-4 block text-sm">
                  Notifications
                </Label>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="text-muted-foreground h-5 w-5" />
                      <div>
                        <div className="text-foreground text-sm">
                          Email alerts for new matches
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Get notified when new events match your filters
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="text-muted-foreground h-5 w-5" />
                      <div>
                        <div className="text-foreground text-sm">
                          Push notifications for deadline changes
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Receive alerts when event dates are modified
                        </div>
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
                <Label className="text-muted-foreground mb-4 block text-sm">
                  Troubleshooting & Export
                </Label>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={refreshMetadata}
                    variant="outline"
                    size="sm"
                    className="border-input"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Metadata
                  </Button>

                  <Button
                    onClick={downloadStatic}
                    variant="outline"
                    size="sm"
                    className="border-input"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Static .ics
                  </Button>
                </div>

                <p className="text-muted-foreground mt-3 text-xs">
                  Use "Refresh" if events aren't syncing properly. Download a
                  one-time .ics file for offline use.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Analytics Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Next 7 Days Preview */}
          <Card className="border-border bg-card shadow-sm">
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#C3002F]" />
                <h3 className="text-foreground">Next 7 Days</h3>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div
                    key={i}
                    className="bg-muted/40 hover:bg-muted/60 flex items-start justify-between rounded-lg p-3 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="text-foreground mb-1 text-sm">
                        {event.title}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {event.date}
                        </Badge>
                        <Badge className="bg-[#C3002F]/10 text-xs text-[#C3002F]">
                          #{event.tag}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="link" className="mt-4 w-full p-0 text-[#C3002F]">
                View All Upcoming Events →
              </Button>
            </div>
          </Card>

          {/* Filtered Out Count */}
          <Card className="border-0 bg-gradient-to-br from-[#C3002F] to-[#A00025] text-white shadow-lg">
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                <h3>Impact This Month</h3>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-5xl">{stats.filteredCount}</div>
                <p className="text-white/90">irrelevant events filtered out</p>
              </div>

              <div className="border-t border-white/20 pt-4">
                <p className="text-sm text-white/90">
                  We've kept your calendar clean by hiding events that don't
                  match your interests.
                </p>
              </div>

              <div className="mt-4 rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="mb-1 text-xs text-white/80">
                  Filter Efficiency
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-white/20">
                    <div
                      className="h-2 rounded-full bg-white"
                      style={{ width: '87%' }}
                    ></div>
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
