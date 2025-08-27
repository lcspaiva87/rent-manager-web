import lagoaDosIngleses from '@/assets/images/login-hero.jpg';
import type { PropertyCard as PropertyCardType } from '@/types';
import { RealEstateView } from './_components/real-estate-view';

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

export default async function RealEstate() {
  // Futuramente podemos buscar dados do banco/serviço aqui
  const properties: PropertyCardType[] = mockProperties;
  return <RealEstateView initialProperties={properties} />;
}
