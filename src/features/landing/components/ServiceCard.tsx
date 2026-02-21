import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

export interface ServiceCardProps {
  id: 'academic' | 'doodream';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  isSelected: boolean;
  onToggle: (serviceId: 'academic' | 'doodream') => void;
}

export default function ServiceCard({
  service,
}: {
  service: ServiceCardProps;
}) {
  return (
    <Card
      key={service.id}
      className={`relative cursor-pointer p-6 transition-all duration-200 hover:shadow-lg ${service.isSelected ? `${service.borderColor} border-2 shadow-md` : 'hover:border-primary/30 border'} `}
      onClick={() => service.onToggle(service.id)}
    >
      {service.isSelected && (
        <div className="absolute top-3 right-3">
          <div
            className={`${service.bgColor} ${service.textColor} rounded-full p-1`}
          >
            <Check className="h-5 w-5" />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div
          className={`${service.bgColor} ${service.textColor} flex h-14 w-14 items-center justify-center rounded-xl`}
        >
          <service.icon className="h-7 w-7" />
        </div>

        <div>
          <h3 className="text-foreground mb-1 text-xl font-semibold">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>
      </div>
    </Card>
  );
}
