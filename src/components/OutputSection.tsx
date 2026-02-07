import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, Copy, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { FilterConfig } from "./FilterConfiguration";

interface OutputSectionProps {
  config: FilterConfig;
}

export function OutputSection({ config }: OutputSectionProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate a mock ICS URL
  const generateURL = () => {
    const params = new URLSearchParams({
      dept: config.department,
      years: config.years.join(","),
      keywords: config.keywords.join(",")
    });
    return `https://sejong-calendar.app/ics/${btoa(params.toString())}`;
  };

  const url = generateURL();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadICS = () => {
    toast.success("ICS file downloaded!");
    // Mock download functionality
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-white border-2 border-green-500/20 shadow-xl">
          {/* Success Header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl text-slate-900">Your Calendar Link is Ready!</h3>
              <p className="text-slate-600">Add this URL to your calendar app for automatic syncing</p>
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600 mb-2">Your Configuration:</div>
            <div className="space-y-1 text-sm">
              <div><span className="text-slate-900">Department:</span> {config.department}</div>
              <div><span className="text-slate-900">Years:</span> {config.years.join(", ") || "All"}</div>
              <div><span className="text-slate-900">Keywords:</span> {config.keywords.join(", ") || "None"}</div>
            </div>
          </div>

          {/* URL Display */}
          <div className="mb-6">
            <Label className="text-slate-900 mb-2 block text-sm">Your Custom Calendar URL</Label>
            <div className="relative">
              <div className="font-mono text-sm bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto whitespace-nowrap">
                {url}
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  Live
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={copyToClipboard}
              className="flex-1 bg-[#C3002F] hover:bg-[#A00025] text-white"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL
                </>
              )}
            </Button>
            
            <Button
              onClick={downloadICS}
              variant="outline"
              className="flex-1 border-slate-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download .ics File
            </Button>
          </div>

          {/* Quick Link */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <a
              href="#tutorial"
              className="text-[#C3002F] hover:underline inline-flex items-center gap-1 text-sm"
            >
              How to add this to your calendar
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          {/* Browse Events Link */}
          <div className="mt-4 text-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-events'))}
              className="text-blue-600 hover:underline inline-flex items-center gap-1 text-sm"
            >
              Want to add specific events? Browse our event catalog
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </Card>

        {/* Status Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Connected to Sejong Do-Dream: Syncing Live
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}