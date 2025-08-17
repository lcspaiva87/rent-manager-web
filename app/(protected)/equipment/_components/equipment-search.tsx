'use client';
import { ChevronDown, Filter, Grid as GridIcon, List as ListIcon, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'in_use' | 'maintenance' | 'retired';
  location: string;
  tags?: string[];
  lastMaintenance?: string;
}

interface EquipmentSearchProps {
  data: EquipmentItem[];
  onQueryChange?: (q: string) => void;
  relatedProvider?: (item: EquipmentItem) => EquipmentItem[];
}

const statusLabels: Record<EquipmentItem['status'], string> = {
  available: 'Disponível',
  in_use: 'Em Uso',
  maintenance: 'Manutenção',
  retired: 'Desativado',
};

const statusVariant: Record<
  EquipmentItem['status'],
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  available: 'default',
  in_use: 'secondary',
  maintenance: 'secondary',
  retired: 'outline',
};

export function EquipmentSearch({ data, onQueryChange, relatedProvider }: EquipmentSearchProps) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const types = useMemo(() => Array.from(new Set(data.map((d) => d.type))).sort(), [data]);
  const locations = useMemo(() => Array.from(new Set(data.map((d) => d.location))).sort(), [data]);

  useEffect(() => {
    const h = setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => clearTimeout(h);
  }, [query]);
  useEffect(() => {
    onQueryChange?.(debouncedQuery);
  }, [debouncedQuery, onQueryChange]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    return data.filter((item) => {
      const matchesText =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q));
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesLocation = locationFilter === 'all' || item.location === locationFilter;
      return matchesText && matchesType && matchesStatus && matchesLocation;
    });
  }, [data, debouncedQuery, typeFilter, statusFilter, locationFilter]);

  const suggestions = useMemo(() => {
    if (!query) return [] as string[];
    const lower = query.toLowerCase();
    const names = data.map((d) => d.name).filter((n) => n.toLowerCase().startsWith(lower));
    const tags = data.flatMap((d) => d.tags ?? []).filter((t) => t.toLowerCase().startsWith(lower));
    return Array.from(new Set([...names, ...tags])).slice(0, 8);
  }, [query, data]);

  const clearFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setLocationFilter('all');
    setQuery('');
    setShowAdvanced(false);
  };

  const noResults = filtered.length === 0;
  const handleSuggestionClick = (s: string) => {
    setQuery(s);
    setShowSuggestions(false);
  };
  const toggleView = () => setView((v) => (v === 'grid' ? 'list' : 'grid'));

  const related = useMemo(() => {
    if (filtered.length !== 1 || !relatedProvider) return [];
    return relatedProvider(filtered[0]);
  }, [filtered, relatedProvider]);

  const ResultCard = ({ item }: { item: EquipmentItem }) => (
    <Card key={item.id} className="relative group overflow-hidden" data-testid="equipment-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
            {item.name}
          </CardTitle>
          <Badge variant={statusVariant[item.status]}>{statusLabels[item.status]}</Badge>
        </div>
        <div className="text-xs text-muted-foreground flex flex-wrap gap-2 mt-2">
          <span>{item.type}</span>
          <span className="inline-flex items-center gap-1 before:content-['•'] before:text-xs before:text-muted-foreground before:mx-1">
            {item.location}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.slice(0, 4).map((t) => (
              <Badge key={t} variant="outline" className="text-[10px] font-normal">
                {t}
              </Badge>
            ))}
            {item.tags.length > 4 && (
              <Badge variant="secondary" className="text-[10px]">
                +{item.tags.length - 4}
              </Badge>
            )}
          </div>
        )}
        {item.lastMaintenance && (
          <p className="text-xs text-muted-foreground">Última manutenção: {item.lastMaintenance}</p>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 mt-3">
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
            Detalhes
          </Button>
          <Button size="sm" className="h-7 px-2 text-xs" variant="secondary">
            Ações
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex gap-2 items-stretch">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              data-testid="equipment-search"
              placeholder="Buscar equipamentos por nome, tipo, tag..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="pl-9"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute z-20 mt-1 w-full rounded-md border bg-popover shadow-sm animate-in fade-in-0 zoom-in-95"
                data-testid="suggestions"
              >
                <ul className="max-h-56 overflow-auto text-sm">
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSuggestionClick(s);
                        }}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleView}
            aria-label="Alternar visualização"
            data-testid="toggle-view"
          >
            {view === 'grid' ? <ListIcon className="h-4 w-4" /> : <GridIcon className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            variant={showAdvanced ? 'secondary' : 'outline'}
            onClick={() => setShowAdvanced((s) => !s)}
            data-testid="advanced-toggle"
          >
            <Filter className="h-4 w-4 mr-2" /> Filtros{' '}
            <ChevronDown
              className={cn('h-3 w-3 ml-1 transition-transform', showAdvanced && 'rotate-180')}
            />
          </Button>
          {(typeFilter !== 'all' ||
            statusFilter !== 'all' ||
            locationFilter !== 'all' ||
            debouncedQuery) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-muted-foreground"
              data-testid="clear-filters"
            >
              <X className="h-4 w-4 mr-1" /> Limpar
            </Button>
          )}
        </div>
        {showAdvanced && (
          <div
            className="mt-3 grid gap-4 rounded-md border p-4 bg-card animate-in slide-in-from-top-2"
            data-testid="advanced-panel"
          >
            <div className="grid gap-2 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {types.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {(
                      ['available', 'in_use', 'maintenance', 'retired'] as EquipmentItem['status'][]
                    ).map((s) => (
                      <SelectItem key={s} value={s}>
                        {statusLabels[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {locations.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="only-maintenance"
                  checked={statusFilter === 'maintenance'}
                  onCheckedChange={(c) => setStatusFilter(c ? 'maintenance' : 'all')}
                />
                <Label htmlFor="only-maintenance" className="text-sm">
                  Somente em manutenção
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="only-available"
                  checked={statusFilter === 'available'}
                  onCheckedChange={(c) => setStatusFilter(c ? 'available' : 'all')}
                />
                <Label htmlFor="only-available" className="text-sm">
                  Somente disponíveis
                </Label>
              </div>
            </div>
          </div>
        )}
      </div>
      {noResults && (
        <div className="rounded-md border p-10 text-center space-y-3" data-testid="empty-state">
          <p className="text-sm text-muted-foreground">Nenhum equipamento encontrado.</p>
          {suggestions.length === 0 && debouncedQuery && (
            <p className="text-xs text-muted-foreground">
              Tente refinar a busca ou remover filtros.
            </p>
          )}
          {suggestions.length > 0 && (
            <div className="text-xs">
              Sugestões:
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-[11px]"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {!noResults && (
        <div
          className={cn(
            'gap-4',
            view === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              : 'flex flex-col'
          )}
          data-testid="results-wrapper"
        >
          {filtered.map((item) =>
            view === 'grid' ? (
              <ResultCard key={item.id} item={item} />
            ) : (
              <div
                key={item.id}
                className="rounded-md border p-4 flex justify-between items-start gap-4 hover:bg-accent/30 transition-colors group"
                data-testid="equipment-row"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium leading-tight">{item.name}</span>
                    <Badge variant={statusVariant[item.status]} className="text-[10px]">
                      {statusLabels[item.status]}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                    <span>{item.type}</span>
                    <span className="before:content-['•'] before:mx-1" />
                    <span>{item.location}</span>
                    {item.tags?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded bg-muted px-1 py-px text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                    Detalhes
                  </Button>
                  <Button size="sm" className="h-7 px-2 text-xs" variant="secondary">
                    Ações
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {related.length > 0 && (
        <div className="space-y-2" data-testid="related-block">
          <h3 className="text-sm font-medium text-muted-foreground">Relacionados</h3>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ResultCard key={r.id} item={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
