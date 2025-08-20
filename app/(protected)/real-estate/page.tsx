'use client';

import { AlertCircle, CheckCircle, Circle, Grid2x2, List, Plus, Upload } from 'lucide-react';
import { useState } from 'react';
import lagoaDosIngleses from '@/assets/images/login-hero.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PropertyCard as PropertyCardType } from '@/types';
import { PropertyCard } from './_components';
import { ModalPreview } from './_components/modal-preview';

// Dados mockados para demonstração
const mockProperties: PropertyCardType[] = [
  {
    id: '1',
    title: 'Lagoa dos Ingleses',
    status: 'rented',
    rent: 1000,
    paymentStatus: 'no_payment',
    image: lagoaDosIngleses.src,
    imageAlt: 'Lagoa dos Ingleses',
    address: 'Rua da Lagoa dos Ingleses, 123, Florianópolis, SC',
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    tenant: {
      id: 't1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '+351 123 456 789',
      startDate: new Date('2023-01-15'),
      endDate: new Date('2024-01-15'),
    },
    contract: {
      id: 'c1',
      startDate: new Date('2023-01-15'),
      endDate: new Date('2024-01-15'),
      deposit: 2000,
      nextPaymentDate: new Date('2024-02-01'),
      dueDate: new Date('2024-01-05'),
    },
  },
  {
    id: '2',
    title: 'Apartamento Centro',
    status: 'vacant',
    rent: 750,
    paymentStatus: 'pending',
    image: lagoaDosIngleses.src,
    imageAlt: 'Apartamento Centro',
    address: 'Avenida Central, 456, Porto, Portugal',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
  },
  {
    id: '3',
    title: 'Casa Familiar',
    status: 'overdue',
    rent: 1200,
    paymentStatus: 'overdue',
    image: lagoaDosIngleses.src,
    imageAlt: 'Casa Familiar',
    address: 'Rua das Flores, 789, Lisboa, Portugal',
    bedrooms: 4,
    bathrooms: 3,
    area: 120,
    tenant: {
      id: 't3',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+351 987 654 321',
      startDate: new Date('2022-06-01'),
      endDate: new Date('2024-06-01'),
    },
    contract: {
      id: 'c3',
      startDate: new Date('2022-06-01'),
      endDate: new Date('2024-06-01'),
      deposit: 2400,
      nextPaymentDate: new Date('2024-01-01'),
      dueDate: new Date('2023-12-05'),
    },
  },
];

export default function RealEstate() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePropertyClick = (property: PropertyCardType) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <main className="flex flex-col gap-10">
      <section className="flex items-center gap-2 justify-between w-full">
        <Input className="p-3 w-1/2" placeholder="Procurar por morada, cidade..." />
        <div className="flex items-center gap-2 ">
          <Button variant="ghost">
            <Plus className="size-4" />
            Adicionar
          </Button>

          <Button>
            <Upload className="size-4" />
            Importar
          </Button>
        </div>
      </section>

      <section className="flex gap-6 justify-between w-full flex-col">
        <div className="flex items-center gap-2 justify-between w-full">
          <h1 className="text-2xl font-bold">Imóveis</h1>
          <p className="text-sm text-balck-opacity-80">Lista completa dos seus imóveis</p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl p-4 w-full border border-gray-200 justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost-gray">
              <CheckCircle className="size-4 text-green-500" />
              Alugados
            </Button>
            <Button variant="ghost-gray">
              <Circle className="size-4 text-gray-500" />
              Vazio
            </Button>
            <Button variant="ghost-gray">
              <AlertCircle className="size-4 text-red-500" />
              Atrazados
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost-gray">
              <Grid2x2 className="size-4" />
              Colunas
            </Button>
            <Button variant="ghost-gray">
              <List className="size-4" />
              Tabela
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {mockProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => handlePropertyClick(property)}
            />
          ))}
        </div>
      </section>

      {selectedProperty && (
        <ModalPreview property={selectedProperty} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </main>
  );
}
