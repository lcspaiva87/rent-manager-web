'use client';
import { useState } from 'react';
import { RegisterTenantDialog } from './register-tenant-dialog';
import type { Tenant } from './tenants-view';
import { TenantsView } from './tenants-view';

interface TenantsContainerProps {
  initialTenants: Tenant[];
}

export function TenantsContainer({ initialTenants }: TenantsContainerProps) {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const handleAdd = (t: Omit<Tenant, 'id'>) => {
    setTenants((prev) => [
      { ...t, id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1 },
      ...prev,
    ]);
  };
  const propertyOptions = Array.from(new Set(tenants.map((t) => t.property))).filter(Boolean);
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Inquilinos</h1>
          <p className="text-muted-foreground">Gerencie informações dos inquilinos</p>
        </div>
        <RegisterTenantDialog onSubmit={handleAdd} propertyOptions={propertyOptions} />
      </div>
      <TenantsView tenants={tenants} />
    </>
  );
}
