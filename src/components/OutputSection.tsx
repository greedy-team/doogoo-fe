import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Copy, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { FilterConfig } from './FilterConfiguration';

interface OutputSectionProps {
  config: FilterConfig;
}

export function OutputSection({ config }: OutputSectionProps) {
  const [copied, setCopied] = useState(false);

  // Generate a mock ICS URL
  const generateURL = () => {
    const params = new URLSearchParams({
      dept: config.department,
      years: config.years.join(','),
      keywords: config.keywords.join(','),
    });
    return `https://sejong-calendar.app/ics/${btoa(params.toString())}`;
  };

  const url = generateURL();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadICS = () => {
    toast.success('ICS file downloaded!');
    // Mock download functionality
  };

  return (
    <section className="from-background to-muted/40 bg-gradient-to-b px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-card border-2 border-green-500/20 p-8 shadow-xl">
          {/* Success Header */}
          <div className="border-border mb-6 flex items-center gap-3 border-b pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-foreground text-2xl">
                Your Calendar Link is Ready!
              </h3>
              <p className="text-muted-foreground">
                Add this URL to your calendar app for automatic syncing
              </p>
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="bg-muted/40 mb-6 rounded-lg p-4">
            <div className="text-muted-foreground mb-2 text-sm">
              Your Configuration:
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-foreground">Department:</span>{' '}
                {config.department}
              </div>
              <div>
                <span className="text-foreground">Years:</span>{' '}
                {config.years.join(', ') || 'All'}
              </div>
              <div>
                <span className="text-foreground">Keywords:</span>{' '}
                {config.keywords.join(', ') || 'None'}
              </div>
            </div>
          </div>

          {/* URL Display */}
          <div className="mb-6">
            <Label className="text-foreground mb-2 block text-sm">
              Your Custom Calendar URL
            </Label>
            <div className="relative">
              <div className="bg-muted text-foreground overflow-x-auto rounded-lg p-4 font-mono text-sm whitespace-nowrap">
                {url}
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <div className="flex items-center gap-1 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></div>
                  Live
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={copyToClipboard}
              className="flex-1 bg-[#C3002F] text-white hover:bg-[#A00025]"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
                </>
              )}
            </Button>

            <Button
              onClick={downloadICS}
              variant="outline"
              className="border-input flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download .ics File
            </Button>
          </div>

          {/* Quick Link */}
          <div className="border-border mt-6 border-t pt-6 text-center">
            <a
              href="#tutorial"
              className="inline-flex items-center gap-1 text-sm text-[#C3002F] hover:underline"
            >
              How to add this to your calendar
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Browse Events Link */}
          <div className="mt-4 text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Want to add specific events? Browse our event catalog
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </Card>

        {/* Status Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            Connected to Sejong Do-Dream: Syncing Live
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}
