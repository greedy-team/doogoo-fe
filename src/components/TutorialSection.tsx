import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Smartphone, Monitor } from 'lucide-react';

export function TutorialSection() {
  return (
    <section id="tutorial" className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-4xl">
            How to Add to Your Calendar
          </h2>
          <p className="text-muted-foreground">
            Choose your calendar platform and follow the simple steps
          </p>
        </div>

        <Tabs defaultValue="google" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="google" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Google Calendar
            </TabsTrigger>
            <TabsTrigger value="apple" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Apple Calendar
            </TabsTrigger>
            <TabsTrigger value="outlook" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Outlook
            </TabsTrigger>
          </TabsList>

          {/* Google Calendar */}
          <TabsContent value="google">
            <Card className="border-border bg-card p-8">
              <div className="space-y-6">
                <StepCard
                  number={1}
                  title="Copy Your Custom URL"
                  description="Click the 'Copy URL' button from your generated link above"
                  platform="google"
                />
                <StepCard
                  number={2}
                  title="Open Google Calendar"
                  description="Go to calendar.google.com and click the '+' button next to 'Other calendars'"
                  platform="google"
                />
                <StepCard
                  number={3}
                  title="Select 'From URL'"
                  description="Choose 'From URL' option and paste your copied link"
                  platform="google"
                />
                <StepCard
                  number={4}
                  title="Done! ✨"
                  description="Your Sejong events will now appear in your Google Calendar and auto-sync"
                  platform="google"
                />
              </div>
            </Card>
          </TabsContent>

          {/* Apple Calendar */}
          <TabsContent value="apple">
            <Card className="border-border bg-card p-8">
              <div className="space-y-6">
                <StepCard
                  number={1}
                  title="Copy Your Custom URL"
                  description="Click the 'Copy URL' button from your generated link above"
                  platform="apple"
                />
                <StepCard
                  number={2}
                  title="Open Calendar App"
                  description="On iPhone/Mac, open the Calendar app and go to File → New Calendar Subscription"
                  platform="apple"
                />
                <StepCard
                  number={3}
                  title="Paste URL"
                  description="Paste your calendar URL and click 'Subscribe'"
                  platform="apple"
                />
                <StepCard
                  number={4}
                  title="Configure Auto-Refresh"
                  description="Set auto-refresh to 'Every hour' for the latest updates"
                  platform="apple"
                />
              </div>

              <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="flex gap-2">
                  <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="text-foreground mb-1 text-sm">
                      Mobile Tip
                    </div>
                    <div className="text-muted-foreground text-sm">
                      On iPhone, you can also add the subscription through
                      Settings → Calendar → Accounts → Add Account → Other → Add
                      Subscribed Calendar
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Outlook */}
          <TabsContent value="outlook">
            <Card className="border-border bg-card p-8">
              <div className="space-y-6">
                <StepCard
                  number={1}
                  title="Copy Your Custom URL"
                  description="Click the 'Copy URL' button from your generated link above"
                  platform="outlook"
                />
                <StepCard
                  number={2}
                  title="Open Outlook Calendar"
                  description="Go to outlook.com/calendar or open Outlook desktop app"
                  platform="outlook"
                />
                <StepCard
                  number={3}
                  title="Add Calendar from Internet"
                  description="Click 'Add calendar' → 'Subscribe from web' and paste your URL"
                  platform="outlook"
                />
                <StepCard
                  number={4}
                  title="Name & Import"
                  description="Give it a name like 'Sejong Events' and click Import"
                  platform="outlook"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  platform: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C3002F] text-white">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
