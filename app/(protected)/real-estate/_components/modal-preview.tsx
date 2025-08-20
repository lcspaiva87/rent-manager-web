import {
  Bath,
  BedDouble,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Square,
  User,
} from 'lucide-react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { PropertyCard } from '@/types';
import { PaymentStatusLabel } from './@types/payment-status-label';
import { StatusLabel } from './@types/status-label';
import { PropertyStatus } from './property-status';

interface ModalPreviewProps {
  property: PropertyCard;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalPreview({ property, isOpen, onClose }: ModalPreviewProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>{property.title}</span>
            <PropertyStatus status={property.status} />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative h-64 w-full overflow-hidden rounded-xl">
              <Image
                src={property.image}
                alt={property.imageAlt}
                className="object-cover w-full h-full"
                fill
                priority
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="size-4" />
                  Detalhes da Propriedade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {property.address && (
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  {property.bedrooms && (
                    <div className="flex items-center gap-1">
                      <BedDouble className="size-4 text-muted-foreground" />
                      <span>{property.bedrooms} quartos</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="size-4 text-muted-foreground" />
                      <span>{property.bathrooms} wc</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-1">
                      <Square className="size-4 text-muted-foreground" />
                      <span>{property.area}m²</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Renda Mensal</span>
                  <span className="text-lg font-bold text-green-600">
                    {new Intl.NumberFormat('pt-PT', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(property.rent)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Status Pagamento</span>
                  <Badge
                    variant="outline"
                    className={
                      property.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : property.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : property.paymentStatus === 'overdue'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {PaymentStatusLabel[property.paymentStatus]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {property.tenant ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="size-4" />
                    Informações do Inquilino
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {property.tenant.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{property.tenant.name}</h3>
                      <p className="text-sm text-muted-foreground">Inquilino</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="size-4 text-muted-foreground" />
                      <span>{property.tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-4 text-muted-foreground" />
                      <span>{property.tenant.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span>Desde {property.tenant.startDate.toLocaleDateString('pt-PT')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <User className="size-12 mx-auto mb-2 opacity-50" />
                  <p>Propriedade vazia</p>
                  <p className="text-sm">Nenhum inquilino atualmente</p>
                </CardContent>
              </Card>
            )}
            {property.contract && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="size-4" />
                    Informações do Contrato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Início</p>
                      <p className="font-medium">
                        {property.contract.startDate.toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fim</p>
                      <p className="font-medium">
                        {property.contract.endDate.toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Caução</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('pt-PT', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(property.contract.deposit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Próximo Pagamento</span>
                    <span className="font-medium">
                      {property.contract.nextPaymentDate.toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <AlertDialogFooter>
          <Button onClick={onClose} variant="ghost-gray">
            Fechar
          </Button>
          <AlertDialogAction>Editar Propriedade</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
