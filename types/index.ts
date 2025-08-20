// Tipos de usuário
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'manager' | 'tenant' | 'owner';

// Tipos de propriedade
export interface Property {
  id: string;
  title: string;
  description: string;
  address: Address;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  rent: number;
  deposit: number;
  available: boolean;
  images: string[];
  amenities: string[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyType = 'apartment' | 'house' | 'studio' | 'commercial';

// Tipos de endereço
export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Tipos de contrato
export interface Contract {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  rent: number;
  deposit: number;
  status: ContractStatus;
  terms?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ContractStatus = 'active' | 'pending' | 'expired' | 'terminated';

// Tipos de pagamento
export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: PaymentStatus;
  type: PaymentType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type PaymentType = 'rent' | 'deposit' | 'fee' | 'utility';

// Tipos específicos para o card de propriedade
export interface PropertyCard {
  id: string;
  title: string;
  status: PropertyCardStatus;
  rent: number;
  paymentStatus: PropertyPaymentStatus;
  image: string;
  imageAlt: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  tenant?: TenantInfo;
  contract?: ContractInfo;
}

export interface TenantInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  startDate: Date;
  endDate: Date;
}

export interface ContractInfo {
  id: string;
  startDate: Date;
  endDate: Date;
  deposit: number;
  nextPaymentDate: Date;
  dueDate: Date;
}

export type PropertyCardStatus = 'rented' | 'vacant' | 'overdue';
export type PropertyPaymentStatus = 'no_payment' | 'paid' | 'pending' | 'overdue';

// Tipos de API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
