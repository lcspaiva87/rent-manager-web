import { type Tenant, TenantsContainer } from './_components';

export default function TenantsPage() {
  const tenants: Tenant[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-1234',
      property: 'Rua das Flores, 123 - Centro',
      contractStart: '01/01/2023',
      contractEnd: '31/12/2024',
      rent: 2500,
      status: 'active',
      paymentStatus: 'up_to_date',
      lastPayment: '05/01/2024',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 99999-5678',
      property: 'Av. Principal, 456 - Jardins',
      contractStart: '15/06/2023',
      contractEnd: '14/06/2025',
      rent: 3200,
      status: 'active',
      paymentStatus: 'pending',
      lastPayment: '05/12/2023',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@empresa.com',
      phone: '(11) 99999-9012',
      property: 'Rua Comercial, 789 - Centro',
      contractStart: '01/03/2023',
      contractEnd: '28/02/2024',
      rent: 1800,
      status: 'active',
      paymentStatus: 'late',
      lastPayment: '28/12/2023',
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@email.com',
      phone: '(11) 99999-3456',
      property: 'Rua Tranquila, 321 - Vila Nova',
      contractStart: '10/09/2022',
      contractEnd: '09/09/2023',
      rent: 2100,
      status: 'inactive',
      paymentStatus: 'completed',
      lastPayment: '02/01/2024',
    },
  ];

  return (
    <div className="space-y-6">
      <TenantsContainer initialTenants={tenants} />
    </div>
  );
}
