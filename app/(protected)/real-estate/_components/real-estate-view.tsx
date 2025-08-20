'use client';

import { AlertCircle, CheckCircle, Circle, Grid2x2, List, Plus, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PropertyCard as PropertyCardType } from '@/types';
import { ModalPreview } from './modal-preview';
import { PropertyCard } from './property-card';

interface RealEstateViewProps {
  initialProperties: PropertyCardType[];
}

export function RealEstateView({ initialProperties }: RealEstateViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'rented' | 'vacant' | 'overdue'>('all');

  const filteredProperties = useMemo(
    () =>
      initialProperties.filter((p) => {
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        const q = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          (p.address ? p.address.toLowerCase().includes(q) : false);
        return matchesStatus && matchesQuery;
      }),
    [searchQuery, statusFilter, initialProperties]
  );

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
        <Input
          className="p-3 w-1/2"
          placeholder="Procurar por morada, cidade..."
          data-testid="real-estate-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
            <Button
              variant="ghost-gray"
              data-testid="status-filter-rented"
              onClick={() => setStatusFilter(statusFilter === 'rented' ? 'all' : 'rented')}
              className={statusFilter === 'rented' ? 'bg-green-50' : ''}
            >
              <CheckCircle className="size-4 text-green-500" />
              Alugados
            </Button>
            <Button
              variant="ghost-gray"
              data-testid="status-filter-vacant"
              onClick={() => setStatusFilter(statusFilter === 'vacant' ? 'all' : 'vacant')}
              className={statusFilter === 'vacant' ? 'bg-gray-100' : ''}
            >
              <Circle className="size-4 text-gray-500" />
              Vazio
            </Button>
            <Button
              variant="ghost-gray"
              data-testid="status-filter-overdue"
              onClick={() => setStatusFilter(statusFilter === 'overdue' ? 'all' : 'overdue')}
              className={statusFilter === 'overdue' ? 'bg-red-50' : ''}
            >
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
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => handlePropertyClick(property)}
            />
          ))}
          {filteredProperties.length === 0 && (
            <div
              className="col-span-full text-center text-sm text-muted-foreground"
              data-testid="empty-state"
            >
              Nenhuma propriedade encontrada
            </div>
          )}
        </div>
      </section>

      {selectedProperty && (
        <ModalPreview property={selectedProperty} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </main>
  );
}
