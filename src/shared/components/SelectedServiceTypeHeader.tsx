import { GraduationCap, Sparkles } from 'lucide-react';

interface SelectedServiceTypeHeaderProps {
  type: 'academic' | 'doodream';
  title: string;
  description: string;
}

export default function SelectedServiceTypeHeader({
  type,
  title,
  description,
}: SelectedServiceTypeHeaderProps) {
  return (
    <div className="p-6 pb-4">
      <div className="flex items-center gap-2">
        {type === 'doodream' ? (
          <div className="rounded-lg bg-purple-100 p-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
        ) : (
          <div className="bg-primary/10 rounded-lg p-2">
            <GraduationCap className="text-primary h-6 w-6" />
          </div>
        )}
        <div>
          <h2 className="text-foreground mb-0.5 text-xl font-semibold">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
