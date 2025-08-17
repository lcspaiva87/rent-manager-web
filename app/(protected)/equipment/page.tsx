import { type EquipmentItem, EquipmentSearch } from './_components/equipment-search';

export default async function EquipmentPage() {
  const equipments: EquipmentItem[] = [
    {
      id: '1',
      name: 'Notebook Dell XPS 13',
      type: 'Notebook',
      status: 'available',
      location: 'Escritório SP',
      tags: ['intel', '16gb', 'ssd'],
      lastMaintenance: '2025-07-10',
    },
    {
      id: '2',
      name: 'Switch Cisco 24p',
      type: 'Rede',
      status: 'in_use',
      location: 'Datacenter RJ',
      tags: ['cisco', 'rack'],
      lastMaintenance: '2025-06-20',
    },
    {
      id: '3',
      name: 'Impressora HP LaserJet',
      type: 'Impressora',
      status: 'maintenance',
      location: 'Escritório SP',
      tags: ['hp', 'laser'],
      lastMaintenance: '2025-08-01',
    },
    {
      id: '4',
      name: 'Servidor Dell R740',
      type: 'Servidor',
      status: 'in_use',
      location: 'Datacenter RJ',
      tags: ['dell', 'xeon'],
      lastMaintenance: '2025-07-28',
    },
    {
      id: '5',
      name: 'Scanner Epson GT',
      type: 'Scanner',
      status: 'retired',
      location: 'Arquivo',
      tags: ['epson'],
      lastMaintenance: '2025-05-11',
    },
    {
      id: '6',
      name: 'Notebook Lenovo T14',
      type: 'Notebook',
      status: 'in_use',
      location: 'Escritório SP',
      tags: ['lenovo', 'ryzen'],
      lastMaintenance: '2025-07-30',
    },
    {
      id: '7',
      name: 'Access Point Ubiquiti U6',
      type: 'Rede',
      status: 'available',
      location: 'Escritório SP',
      tags: ['wifi', 'u6'],
      lastMaintenance: '2025-08-05',
    },
    {
      id: '8',
      name: 'Nobreak APC 3000VA',
      type: 'Energia',
      status: 'maintenance',
      location: 'Datacenter RJ',
      tags: ['apc', 'ups'],
      lastMaintenance: '2025-08-02',
    },
    {
      id: '9',
      name: 'Servidor HP ProLiant',
      type: 'Servidor',
      status: 'available',
      location: 'Datacenter RJ',
      tags: ['hp', 'xeon'],
      lastMaintenance: '2025-07-22',
    },
    {
      id: '10',
      name: 'Notebook MacBook Pro 14"',
      type: 'Notebook',
      status: 'available',
      location: 'Diretoria',
      tags: ['apple', 'm3'],
      lastMaintenance: '2025-07-15',
    },
  ];

  const relatedProvider = (item: EquipmentItem) =>
    equipments.filter((e) => e.type === item.type && e.id !== item.id).slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Equipamentos</h1>
        <p className="text-muted-foreground">
          Localize rapidamente ativos por nome, tipo, localização ou tags.
        </p>
      </div>
      <EquipmentSearch data={equipments} relatedProvider={relatedProvider} />
    </div>
  );
}
