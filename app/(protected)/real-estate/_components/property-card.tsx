import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import type { PropertyCard as PropertyCardType } from '@/types';
import { PaymentStatusLabel } from './@types/payment-status-label';
import { PropertyStatus } from './property-status';

const paymentStatusColors = {
  no_payment: 'bg-gray-500 text-white',
  paid: 'bg-green-500 text-white',
  pending: 'bg-yellow-500 text-white',
  overdue: 'bg-red-500 text-white',
};

interface PropertyCardProps {
  property: PropertyCardType;
  onClick?: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <Card
      className="w-full flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="p-4 pb-0">
        <div className="relative w-full h-40">
          <Image
            src={property.image}
            alt={property.imageAlt}
            className="rounded-2xl w-full h-full object-cover"
            width={400}
            height={160}
            priority
          />
        </div>
      </div>

      <CardContent>
        <CardDescription className="flex gap-2 flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-base font-semibold text-foreground">{property.title}</h1>
            <PropertyStatus status={property.status} />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-xs font-light text-muted-foreground">Renda</span>
            <span className="text-xs text-foreground font-medium">
              {new Intl.NumberFormat('pt-PT', {
                style: 'currency',
                currency: 'EUR',
              }).format(property.rent)}
            </span>
          </div>

          <div className="flex justify-between text-sm items-center">
            <span className="text-xs font-light text-muted-foreground">Pagamento</span>
            <Badge
              variant="outline"
              className={`border-none rounded-full text-xs px-2 py-1 ${paymentStatusColors[property.paymentStatus]}`}
            >
              {PaymentStatusLabel[property.paymentStatus]}
            </Badge>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
