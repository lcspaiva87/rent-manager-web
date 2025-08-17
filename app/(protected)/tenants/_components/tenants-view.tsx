'use client';
import { addDays, differenceInCalendarDays, format, isWithinInterval, parse } from 'date-fns';
import {
  Calendar,
  Check,
  Copy,
  DollarSign,
  Edit,
  Eye,
  Mail,
  MapPin,
  Phone,
  Search,
  UserX,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  contractStart: string;
  contractEnd: string;
  rent: number;
  status: 'active' | 'inactive';
  paymentStatus: 'up_to_date' | 'pending' | 'late' | 'completed';
  lastPayment: string;
}

interface TenantsViewProps {
  tenants: Tenant[];
}

export function TenantsView({ tenants }: TenantsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [expiringOnly, setExpiringOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [preview, setPreview] = useState<Tenant | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const handleCopy = (value: string, key: string) => {
    if (!navigator?.clipboard) return;
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(key);
        setTimeout(() => setCopied((prev) => (prev === key ? null : prev)), 1500);
      })
      .catch(() => {});
  };

  const getPaymentStatusBadge = (status: Tenant['paymentStatus']) => {
    const variants = {
      up_to_date: 'default',
      pending: 'secondary',
      late: 'destructive',
      completed: 'outline',
    } as const;
    const labels = {
      up_to_date: 'Em dia',
      pending: 'Pendente',
      late: 'Atrasado',
      completed: 'Finalizado',
    } as const;
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getStatusBadge = (status: Tenant['status']) => {
    const variants = { active: 'default', inactive: 'outline' } as const;
    const labels = { active: 'Ativo', inactive: 'Inativo' } as const;
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const filteredTenants = useMemo(() => {
    const today = new Date();
    const in30Days = addDays(today, 30);
    return tenants.filter((t) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(term) ||
        t.email.toLowerCase().includes(term) ||
        t.property.toLowerCase().includes(term);
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const contractEndDate = parse(t.contractEnd, 'dd/MM/yyyy', new Date());
      const isExpiringSoon = isWithinInterval(contractEndDate, { start: today, end: in30Days });
      const matchesExpiring = !expiringOnly || isExpiringSoon;
      return matchesSearch && matchesStatus && matchesExpiring;
    });
  }, [tenants, searchTerm, statusFilter, expiringOnly]);

  const totalItems = filteredTenants.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedTenants = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTenants.slice(start, start + pageSize);
  }, [filteredTenants, page, pageSize]);

  // Resetar paginação quando filtros mudam.
  // biome-ignore lint/correctness/useExhaustiveDependencies: dependências usadas apenas para disparar reset
  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, expiringOnly]);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  data-testid="tenant-search"
                  placeholder="Buscar por nome, email ou propriedade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={statusFilter}
                onValueChange={(v: 'all' | 'active' | 'inactive') => setStatusFilter(v)}
              >
                <SelectTrigger className="w-[160px]" data-testid="status-filter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="expiring"
                  checked={expiringOnly}
                  onCheckedChange={(c) => setExpiringOnly(Boolean(c))}
                />
                <Label htmlFor="expiring" className="text-sm text-muted-foreground">
                  Contrato vence em 30 dias
                </Label>
              </div>
              <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                <SelectTrigger className="w-[160px]" data-testid="page-size">
                  <SelectValue placeholder="Itens por página" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 por página</SelectItem>
                  <SelectItem value="25">25 por página</SelectItem>
                  <SelectItem value="50">50 por página</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-4 py-2">Inquilino</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Telefone</th>
              <th className="px-4 py-2">Imóvel</th>
              <th className="px-4 py-2">Contrato</th>
              <th className="px-4 py-2">Aluguel</th>
              <th className="px-4 py-2">Pag.</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 w-[140px]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTenants.map((tenant) => (
              <tr
                key={tenant.id}
                data-testid="tenant-row"
                className="border-t hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(tenant.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className="font-medium whitespace-nowrap max-w-[140px] truncate"
                      title={tenant.name}
                    >
                      {tenant.name}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 max-w-[180px] truncate" title={tenant.email}>
                  {tenant.email}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{tenant.phone}</td>
                <td className="px-4 py-2 max-w-[160px] truncate" title={tenant.property}>
                  {tenant.property}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs">
                  {tenant.contractStart} - {tenant.contractEnd}
                </td>
                <td className="px-4 py-2 whitespace-nowrap font-semibold">
                  R$ {tenant.rent.toLocaleString()}
                </td>
                <td className="px-4 py-2">{getPaymentStatusBadge(tenant.paymentStatus)}</td>
                <td className="px-4 py-2">{getStatusBadge(tenant.status)}</td>
                <td className="px-4 py-2 align-top">
                  <div className="flex gap-1 min-w-[90px]" data-testid="actions-column">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start h-7 px-2"
                      aria-label={`Ver ${tenant.name}`}
                      onClick={() => setPreview(tenant)}
                      data-testid="preview-button"
                    >
                      <Eye size={14} className="mr-1" /> Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start h-7 px-2"
                      aria-label={`Editar ${tenant.name}`}
                    >
                      <Edit size={14} className="mr-1" /> Editar
                    </Button>
                    {tenant.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start h-7 px-2"
                        aria-label={`Desativar ${tenant.name}`}
                      >
                        <UserX size={14} className="mr-1" /> Desativar
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={!!preview}
        onOpenChange={(o) => {
          if (!o) setPreview(null);
        }}
      >
        <DialogContent className="max-w-3xl" data-testid="tenant-preview">
          {preview &&
            (() => {
              const start = parse(preview.contractStart, 'dd/MM/yyyy', new Date());
              const end = parse(preview.contractEnd, 'dd/MM/yyyy', new Date());
              const today = new Date();
              const totalDays = Math.max(1, differenceInCalendarDays(end, start));
              const elapsed = Math.min(
                totalDays,
                Math.max(0, differenceInCalendarDays(today, start))
              );
              const remaining = Math.max(0, differenceInCalendarDays(end, today));
              const progressPct = Math.min(100, Math.max(0, (elapsed / totalDays) * 100));
              const contractEndsSoon = remaining <= 30;
              const badgeSoonClass = contractEndsSoon
                ? 'text-amber-600 bg-amber-100 dark:bg-amber-300/20'
                : 'text-muted-foreground';
              return (
                <div className="space-y-6">
                  <DialogHeader>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground text-base">
                            {getInitials(preview.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <DialogTitle>{preview.name}</DialogTitle>
                          <p className="text-xs text-muted-foreground">ID #{preview.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {getStatusBadge(preview.status)}
                        {getPaymentStatusBadge(preview.paymentStatus)}
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-medium border ${badgeSoonClass}`}
                        >
                          {remaining}d restantes
                        </span>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-4 md:col-span-3">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-xs uppercase text-muted-foreground">Email</span>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-[160px]" title={preview.email}>
                              {preview.email}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              aria-label="Copiar email"
                              onClick={() => handleCopy(preview.email, 'email')}
                            >
                              {copied === 'email' ? <Check size={14} /> : <Copy size={14} />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs uppercase text-muted-foreground">Telefone</span>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{preview.phone}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              aria-label="Copiar telefone"
                              onClick={() => handleCopy(preview.phone, 'phone')}
                            >
                              {copied === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs uppercase text-muted-foreground">Imóvel</span>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-[180px]" title={preview.property}>
                              {preview.property}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              aria-label="Copiar imóvel"
                              onClick={() => handleCopy(preview.property, 'property')}
                            >
                              {copied === 'property' ? <Check size={14} /> : <Copy size={14} />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs uppercase text-muted-foreground">
                            Último Pagamento
                          </span>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{preview.lastPayment}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progresso do Contrato</span>
                          <span className="font-medium">{progressPct.toFixed(0)}%</span>
                        </div>
                        <div
                          className="h-2 rounded bg-muted overflow-hidden"
                          data-testid="contract-progress"
                        >
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{format(start, 'dd/MM/yyyy')}</span>
                          <span>{format(end, 'dd/MM/yyyy')}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4 mt-6">
                        <div className="p-3 rounded-md border bg-muted/40 flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-muted-foreground">
                            Contrato
                          </span>
                          <span className="text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {preview.contractStart} - {preview.contractEnd}
                          </span>
                        </div>
                        <div className="p-3 rounded-md border bg-muted/40 flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-muted-foreground">
                            Aluguel
                          </span>
                          <span className="text-xs flex items-center gap-1 font-medium">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            R$ {preview.rent.toLocaleString()}
                          </span>
                        </div>
                        <div className="p-3 rounded-md border bg-muted/40 flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-muted-foreground">
                            Dias Restantes
                          </span>
                          <span
                            className={`text-xs ${contractEndsSoon ? 'font-semibold text-amber-600' : 'font-medium'}`}
                          >
                            {remaining}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 flex  gap-2" data-testid="preview-actions">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full justify-center"
                          aria-label="Editar inquilino"
                        >
                          <Edit size={14} className="mr-1" />
                          Editar
                        </Button>
                        {preview.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-center"
                            aria-label="Desativar inquilino"
                          >
                            <UserX size={14} className="mr-1" />
                            Desativar
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-center"
                          onClick={() => setPreview(null)}
                        >
                          Fechar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
      {totalPages > 1 && (
        <Pagination className="mt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => {
              const num = i + 1;
              return (
                <PaginationItem key={num}>
                  <PaginationLink
                    href="#"
                    isActive={num === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(num);
                    }}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {tenants.filter((t) => t.status === 'active').length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">Inquilinos Ativos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {tenants.filter((t) => t.paymentStatus === 'up_to_date').length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">Em Dia</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">
                {tenants.filter((t) => t.paymentStatus === 'pending').length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">Pendentes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">
                {tenants.filter((t) => t.paymentStatus === 'late').length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">Atrasados</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
