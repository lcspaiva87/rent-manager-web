'use client';

import { AlertCircle, CheckCircle, Circle, Grid2x2, List } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { PropertyCard as PropertyCardType } from '@/types';
import { CreateRealState } from './create-real-state';
import { ModalPreview } from './modal-preview';
import { PropertyCard } from './property-card';
import { SearchRealState } from './search-real-state';
import { UploadRealEstate } from './upload-real-estate';

interface RealEstateViewProps {
  initialProperties: PropertyCardType[];
}

export function RealEstateView({ initialProperties }: RealEstateViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'rented' | 'vacant' | 'overdue'>('all');
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
    [statusFilter, initialProperties, searchQuery]
  );

  const handlePropertyClick = (property: PropertyCardType) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setSearchQuery(e.currentTarget.value);
    }
  }, []);
  return (
    <main className="flex flex-col gap-10">
      <section
        data-testid="real-estate-search-input"
        className="flex items-center gap-2 justify-between w-full"
      >
        <SearchRealState onKeyDown={handleKeyDown} disabled={false} ref={inputRef} />
        <div className="flex items-center gap-2 ">
          <CreateRealState />
          <UploadRealEstate />
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
              aria-label="Filtrar por alugados"
              variant="ghost-gray"
              data-testid="status-filter-rented"
              onClick={() => setStatusFilter(statusFilter === 'rented' ? 'all' : 'rented')}
              className={statusFilter === 'rented' ? 'bg-green-50' : ''}
            >
              <CheckCircle className="size-4 text-green-500" />
              Alugados
            </Button>
            <Button
              aria-label="Filtrar por vazios"
              variant="ghost-gray"
              data-testid="status-filter-vacant"
              onClick={() => setStatusFilter(statusFilter === 'vacant' ? 'all' : 'vacant')}
              className={statusFilter === 'vacant' ? 'bg-gray-100' : ''}
            >
              <Circle className="size-4 text-gray-500" />
              Vazio
            </Button>
            <Button
              aria-label="Filtrar por atrazados"
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
            <Button variant="ghost-gray" aria-label="Visualizar em colunas">
              <Grid2x2 className="size-4" />
              Colunas
            </Button>
            <Button variant="ghost-gray" aria-label="Visualizar em tabela">
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
